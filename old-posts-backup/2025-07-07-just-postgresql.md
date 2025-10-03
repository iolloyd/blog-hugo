---
layout: tactical-briefing
title: "PostgreSQL Will Do, or, You Don't Need Kafka"
date: 2025-01-12
categories: [architecture, postgresql, messaging]
tags: [postgresql, kafka, event-streaming, message-queue, architecture]
description: "Before you spin up a three-node Kafka cluster, consider this: PostgreSQL can handle most pub-sub use cases perfectly well. And you've probably already got it running."
metrics:
  - "90% of use cases covered by PostgreSQL pub/sub"
  - "Zero additional infrastructure overhead"
  - "ACID transactions with event streaming"
  - "50k+ messages/second throughput capability"
---


Every few months, someone on your team suggests adding Kafka. "We need real-time event streaming," they say. "We need to decouple our services."

Stop. Before you spin up a three-node Kafka cluster, consider PostgreSQL. It can handle most pub-sub use cases perfectly well. You've probably already got it running.

## The Problem

Your application grows. Different parts need to know when things happen. The order service needs to tell the inventory service about new orders. The user service needs to notify the email service about registrations.

The textbook answer is simple: message queue, event streaming, Kafka.

But Kafka brings complexity. You need Zookeeper or KRaft. You need partitions, consumer groups, offset management. Suddenly you're debugging stuck messages. You're waiting for rebalancing to finish. Your disk fills up with log segments.

Meanwhile, PostgreSQL sits quietly handling your data. It provides ACID guarantees, battle-tested replication, and tooling your team already knows.

## Why PostgreSQL Works for Messaging

PostgreSQL has everything you need for messaging:

- **Durability**: Write-ahead logging ensures messages survive crashes
- **Ordering**: SERIAL columns give you strict ordering
- **Transactions**: Publish events atomically with other database changes
- **Queries**: Find any message by time, type, or content
- **Concurrency**: SKIP LOCKED enables parallel consumers without coordination

Most applications don't need millions of messages per second. They need hundreds or thousands. PostgreSQL handles that easily.

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

Publishing events is trivial:

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

The FOR UPDATE SKIP LOCKED clause is magic. Multiple consumers can pull events concurrently without coordination. No consumer groups, no rebalancing. It just works.

## Advanced Patterns

Need real-time notifications? Use LISTEN/NOTIFY:
```sql
-- Publisher
NOTIFY new_event, 'order.created';

-- Consumer
LISTEN new_event;
```

Need multiple consumer groups? Add a consumer_group column:
```sql
CREATE TABLE event_consumers (
    event_id BIGINT,
    consumer_group TEXT,
    processed_at TIMESTAMPTZ,
    PRIMARY KEY (event_id, consumer_group)
);
```

Need event replay? Use a simple SELECT:

```sql
SELECT * FROM events 
WHERE created_at > '2024-01-01' 
AND event_type = 'order.created'
ORDER BY id;
```

Need retention policies? Partition by month:

```sql
CREATE TABLE events_2024_03 PARTITION OF events
FOR VALUES FROM ('2024-03-01') TO ('2024-04-01');
```

## When You Actually Need Kafka

You do need Kafka in these cases:

- **Throughput**: Millions of events per second
- **Multiple datacentres**: Built-in geo-replication
- **Stream processing**: Complex windowing and joins
- **Long retention**: Keeping months of high-volume data
- **Existing ecosystem**: Your team already runs Kafka

These are exceptional cases. Most applications process thousands of events per second at peak. They need reliability more than raw throughput.

## The Implementation Path

Start simple:

1. Create the events table
2. Publish events alongside your transactions
3. Write a consumer loop with SKIP LOCKED
4. Monitor with normal PostgreSQL tools

When you need more:

1. Add LISTEN/NOTIFY for lower latency
2. Partition old events to archive tables
3. Create materialized views for analytics
4. Add read replicas for consumer scaling

## The Real Win

The biggest advantage isn't technical. It's operational. Your team knows PostgreSQL. It's easier to learn, deploy and maintain than Kafka. Your monitoring covers PostgreSQL. Your backups include PostgreSQL.

When something goes wrong at 3am, you debug familiar SQL. You don't decipher consumer group rebalancing.

You write:

```sql
SELECT * FROM events WHERE processed_at IS NULL. 
```

Not:

```bash
kafka-consumer-groups --describe --group my-consumer --bootstrap-server localhost:9092.
```

## Making the Choice

Next time someone suggests Kafka, ask these questions:

- How many events per second? (Really?)
- Do we need multi-datacentre replication?
- Are we doing complex stream processing?
- Can we tolerate 100ms latency?

If you answer "thousands", "no", "no", and "yes" - you don't need Kafka. You need PostgreSQL.

This isn't anti-Kafka. Kafka's brilliant for the problems it solves. But those problems are rarer than we think. Most of us build CRUD apps with some events on the side. PostgreSQL handles that beautifully.

