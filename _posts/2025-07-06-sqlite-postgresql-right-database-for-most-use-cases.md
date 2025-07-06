---
layout: post
title: "SQLite and PostgreSQL: The Right Database for 99% of Use Cases"
date: 2025-07-06
categories: [architecture, databases, engineering]
description: "Why SQLite and PostgreSQL cover almost all database needs, and when you actually need something else."
---

> "The best tool for the job is the one you already know how to use properly." - Ancient Engineering Wisdom

In the world of software engineering, we're often tempted by the latest database technologies. NoSQL, NewSQL, graph databases, time-series databases – the options seem endless. But here's a reality check: **for 99% of applications, you only need SQLite or PostgreSQL**.

## The Power Duo: SQLite and PostgreSQL

### SQLite: The Embedded Powerhouse

SQLite isn't just a "toy database" – it's the most deployed database engine in the world, running on billions of devices. Here's when it shines:

**Perfect for:**
- Mobile applications
- Desktop software
- Embedded systems
- Development and testing
- Small to medium web applications (yes, really!)
- Static site generators with dynamic features
- Edge computing scenarios

**Key strengths:**
- Zero configuration
- Serverless architecture
- Single file storage
- ACID compliant
- Incredibly fast for read-heavy workloads
- Can handle databases up to 281TB

**Real-world example:**
```sql
-- SQLite handles complex queries just fine
WITH monthly_revenue AS (
  SELECT 
    DATE(created_at, 'start of month') as month,
    SUM(amount) as revenue
  FROM transactions
  WHERE status = 'completed'
  GROUP BY DATE(created_at, 'start of month')
)
SELECT 
  month,
  revenue,
  SUM(revenue) OVER (ORDER BY month) as cumulative_revenue
FROM monthly_revenue;
```

### PostgreSQL: The Enterprise Workhorse

When you need a full-featured database server, PostgreSQL is your answer. It's not just a database – it's a data platform.

**Perfect for:**
- Web applications at any scale
- Multi-tenant SaaS applications
- Financial systems
- Analytics workloads
- Geospatial applications
- Full-text search requirements
- JSON document storage (yes, it does that too!)

**Key strengths:**
- Advanced indexing (B-tree, Hash, GIN, GiST, BRIN)
- Sophisticated query planner
- Extensibility through custom functions and types
- Row-level security
- Partitioning for large datasets
- Built-in replication
- JSONB for flexible schemas

**Real-world example:**
```sql
-- PostgreSQL's advanced features in action
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  attributes JSONB,
  location GEOGRAPHY(POINT),
  search_vector TSVECTOR
);

-- Partial index for performance
CREATE INDEX idx_active_products ON products(name) 
WHERE attributes->>'status' = 'active';

-- Full-text search
UPDATE products 
SET search_vector = to_tsvector('english', name || ' ' || attributes);

-- Geospatial query with JSON filtering
SELECT name, attributes
FROM products
WHERE ST_DWithin(location, ST_MakePoint(-73.935242, 40.730610)::geography, 1000)
  AND attributes @> '{"category": "electronics"}'
  AND search_vector @@ plainto_tsquery('wireless headphones');
```

## The 99% Rule: When These Two Are Enough

Most applications fall into these categories where SQLite or PostgreSQL excel:

### 1. **Content Management Systems**
- SQLite for single-user or small team blogs
- PostgreSQL for multi-tenant CMS platforms

### 2. **E-commerce Platforms**
- SQLite for product catalogs in mobile apps
- PostgreSQL for full e-commerce sites with transactions

### 3. **SaaS Applications**
- PostgreSQL's row-level security and schemas perfect for multi-tenancy
- JSONB columns handle varying customer requirements

### 4. **Analytics Dashboards**
- SQLite for embedded analytics in applications
- PostgreSQL with TimescaleDB extension for time-series data

### 5. **Mobile and Desktop Apps**
- SQLite as the local database
- PostgreSQL as the backend API database

## The 1%: When You Actually Need Something Else

Here are the **rare but valid** cases where specialized databases make sense:

### 1. **True Graph Traversal at Scale**
**When to switch:** Social networks with billions of users needing real-time friend-of-friend queries
**Alternative:** Neo4j, Amazon Neptune
**But first try:** PostgreSQL with recursive CTEs or the Apache AGE extension

### 2. **Extreme Write Throughput (>1M writes/second)**
**When to switch:** IoT platforms ingesting massive sensor data
**Alternative:** Cassandra, ScyllaDB
**But first try:** PostgreSQL with partitioning and write-optimized configuration

### 3. **Global Multi-Master Requirements**
**When to switch:** Applications needing active-active writes across continents
**Alternative:** CockroachDB, YugabyteDB
**But first try:** PostgreSQL with logical replication and conflict resolution

### 4. **Specialized Time-Series Workloads**
**When to switch:** Monitoring systems with specific retention policies and downsampling
**Alternative:** InfluxDB, Prometheus
**But first try:** PostgreSQL with TimescaleDB extension

### 5. **Document Store with Complex Aggregations**
**When to switch:** When your entire data model is hierarchical documents needing MapReduce
**Alternative:** MongoDB
**But first try:** PostgreSQL with JSONB and generated columns

## Decision Framework

Before reaching for a specialized database, ask yourself:

1. **Have I actually hit a limitation?** Don't optimize prematurely
2. **Can PostgreSQL extensions solve this?** (PostGIS, TimescaleDB, pg_partman, etc.)
3. **Is the complexity worth it?** Every additional database adds operational overhead
4. **Have I properly tuned my current database?** Often performance issues are configuration, not technology

## Best Practices for the 99%

### Start with SQLite When:
- Building prototypes or MVPs
- Creating desktop or mobile applications
- Need embedded data storage
- Working on single-user applications

### Migrate to PostgreSQL When:
- Multiple users need concurrent access
- You need advanced features (full-text search, GIS, etc.)
- Scaling beyond a single machine
- Requiring strict data integrity across complex transactions

### Configuration Tips:

**SQLite optimization:**
```sql
PRAGMA journal_mode = WAL;  -- Better concurrency
PRAGMA synchronous = NORMAL;  -- Faster writes, still safe
PRAGMA cache_size = -64000;  -- 64MB cache
PRAGMA temp_store = MEMORY;  -- Temp tables in RAM
```

**PostgreSQL optimization:**
```sql
-- In postgresql.conf
shared_buffers = 25% of RAM
effective_cache_size = 75% of RAM
maintenance_work_mem = 256MB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
```

## The Hidden Costs of Database Proliferation

Every additional database technology in your stack means:
- Another system to monitor and backup
- Additional expertise required on your team
- More complex deployment pipelines
- Increased attack surface
- Higher operational costs
- More difficult debugging and troubleshooting

**Stick with boring technology that works.**

## Conclusion

The database landscape is vast, but you don't need to explore every corner of it. SQLite and PostgreSQL have evolved over decades to handle an incredible variety of use cases. They're battle-tested, well-documented, and have massive communities.

Before you add that trendy new database to your architecture, ask yourself: "Can PostgreSQL do this?" The answer is almost always yes. And if you're building something smaller, SQLite might surprise you with its capabilities.

Remember: **boring technology choices let you focus on building interesting products.**

---

*What's your experience with database selection? Have you found cases where SQLite or PostgreSQL wasn't enough?*

*Originally shared on [LinkedIn](https://linkedin.com/in/moorelloyd)*