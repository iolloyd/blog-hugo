---
layout: post
title: "PostgreSQL Will Do, or, You Don't Need Kafka"
date: 2025-01-27
categories: [architecture, postgresql, messaging]
tags: [postgresql, kafka, event-streaming, message-queue, architecture]
excerpt: "Before you spin up a three-node Kafka cluster, consider this: PostgreSQL can handle most pub-sub use cases perfectly well. And you've probably already got it running."
author: Lloyd Moore 
---

# You Don't Need Kafka (PostgreSQL Will Do Just Fine)

Every few months, someone on your team suggests adding Kafka. "We need real-time event streaming," they say. "We need to decouple our services." 

Before you spin up a three-node Kafka cluster, consider this: PostgreSQL can handle most pub-sub use cases perfectly well. And you've probably already got it running.

## The Situation

Here's what typically happens. Your application grows. Different parts need to know when things happen. The order service needs to tell the inventory service about new orders. The user service needs to notify the email service about registrations.

The textbook answer? Message queue. Event streaming. Kafka.

But Kafka brings complexity. Zookeeper (or KRaft). Partitions. Consumer groups. Offset management. Suddenly you're debugging why messages are stuck, why rebalancing is taking forever, or why your disk filled up with log segments.

Meanwhile, PostgreSQL sits there, quietly handling your data with ACID guarantees, battle-tested replication, and tooling your team already knows.

## Why PostgreSQL Works

PostgreSQL has everything you need for messaging:

- **Durability**: Write-ahead logging ensures messages survive crashes
- **Ordering**: SERIAL columns give you strict ordering
- **Transactions**: Publish events atomically with other database changes
- **Queries**: Find any message by time, type, or content
- **Concurrency**: SKIP LOCKED enables parallel consumers without coordination

Here's the thing: most applications don't need millions of messages per second. They need hundreds or thousands. PostgreSQL handles that whilst yawning.

## The Basic Pattern

Create a simple events table:

```sql
CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    event_type TEXT NOT NULL,
    payload JSONB NOT NULL,
    processed_at TIMESTAMPTZ,
    consumer_id TEXT
);

CREATE INDEX idx_unprocessed ON events(id) 
WHERE processed_at IS NULL;
```

Publishing events becomes trivial:

```sql
INSERT INTO events (event_type, payload) 
VALUES ('order.created', '{"order_id": 123, "total": 45.99}');
```

Consuming uses PostgreSQL's row-level locking:

```sql
UPDATE events 
SET processed_at = NOW(), consumer_id = 'inventory-service'
WHERE id IN (
    SELECT id FROM events 
    WHERE processed_at IS NULL 
    AND event_type = 'order.created'
    ORDER BY id 
    LIMIT 10
    FOR UPDATE SKIP LOCKED
)
RETURNING *;
```

That FOR UPDATE SKIP LOCKED is magic. 
Multiple consumers can pull events concurrently without coordination. No consumer groups. No rebalancing. Just works.

## Advanced Patterns

Real-time notifications? Use LISTEN/NOTIFY:
```sql
-- Publisher
NOTIFY new_event, 'order.created';

-- Consumer
LISTEN new_event;
```
Multiple consumer groups? Add a consumer_group column:
```sql
CREATE TABLE event_consumers (
    event_id BIGINT,
    consumer_group TEXT,
    processed_at TIMESTAMPTZ,
    PRIMARY KEY (event_id, consumer_group)
);
```

Event replay? It's just a SELECT:

```sql
SELECT * FROM events 
WHERE created_at > '2024-01-01' 
AND event_type = 'order.created'
ORDER BY id;
```

Retention policies? Partition by month:

```sql
CREATE TABLE events_2024_03 PARTITION OF events
FOR VALUES FROM ('2024-03-01') TO ('2024-04-01');
```

## When You Actually Need Kafka

Sometimes you do need Kafka:

Throughput: Millions of events per second
Multiple datacenters: Built-in geo-replication
Stream processing: Complex windowing and joins
Long retention: Keeping months of high-volume data
Existing ecosystem: Your team already runs Kafka

But these are exceptional cases. Most applications process thousands of events per second at peak. They need reliability more than raw throughput.

## The Implementation Path


Start simple:

Create the events table
Publish events alongside your transactions
Write a consumer loop with SKIP LOCKED
Monitor with normal PostgreSQL tools

When you need more:

Add LISTEN/NOTIFY for lower latency
Partition old events to archive tables
Create materialized views for analytics
Add read replicas for consumer scaling

## The Real Win

The biggest advantage isn't technical. It's operational. Your team knows PostgreSQL. If not, it is much easier to learn, deploy and maintain. Your monitoring covers PostgreSQL. Your backups include PostgreSQL. When something goes wrong at 3am, you're debugging familiar SQL, not deciphering consumer group rebalancing.

You write.. 

```sql
SELECT * FROM events WHERE processed_at IS NULL. 
```

Not.. 

```bash
kafka-consumer-groups --describe --group my-consumer --bootstrap-server localhost:9092.
```

## Making the Choice

Next time someone suggests Kafka, ask these questions:

How many events per second? (Really?)
Do we need multi-datacentre replication?
Are we doing complex stream processing?
Can we tolerate 100ms latency?

If you're answering "thousands", "no", "no", and "yes" - congratulations. You don't need Kafka.
You need PostgreSQL. 

This isn't anti-Kafka. Kafka's brilliant for the problems it solves. But those problems are rarer than we think. Most of us are building CRUD apps with some events on the side. PostgreSQL handles that beautifully.

