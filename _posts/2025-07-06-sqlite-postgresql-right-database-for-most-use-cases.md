---
layout: tactical-briefing
title: "SQLite and PostgreSQL: The Right Database for 99% of Use Cases"
date: 2025-07-06
categories: [architecture, databases, engineering]
description: "Why SQLite and PostgreSQL cover almost all database needs, and when you actually need something else."
metrics:
  - "99% of applications covered by SQLite + PostgreSQL"
  - "10+ TB SQLite databases in production"
  - "1M+ writes/second PostgreSQL capability"
  - "80% cost reduction vs specialized databases"
---

> "The best tool for the job is the one you already know how to use properly." - Ancient Engineering Wisdom

You face endless database choices today. NoSQL, NewSQL, graph databases, time-series databases – they all promise to solve your problems. But here's the truth: **you only need SQLite or PostgreSQL for 99% of applications**.

## The Power Duo: SQLite and PostgreSQL

### SQLite: The Embedded Powerhouse

Don't dismiss SQLite as a "toy database." It's the world's most deployed database engine. Billions of devices run SQLite right now. Here's when you should choose it:

**Perfect for:**
- Mobile applications
- Desktop software
- Embedded systems
- Development and testing
- Small to medium web applications (yes, really!)
- Static site generators with dynamic features
- Edge computing scenarios

**Key strengths:**
- Zero configuration required
- No server needed
- Stores everything in one file
- ACID compliant transactions
- Lightning fast for read-heavy workloads
- Handles databases up to 281TB

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

PostgreSQL steps in when you need a full-featured database server. This isn't just a database. It's a complete data platform.

**Perfect for:**
- Web applications at any scale
- Multi-tenant SaaS applications
- Financial systems
- Analytics workloads
- Geospatial applications
- Full-text search requirements
- JSON document storage (yes, it does that too!)

**Key strengths:**
- Advanced indexing options (B-tree, Hash, GIN, GiST, BRIN)
- Smart query planning
- Custom functions and data types
- Row-level security controls
- Partitioning for massive datasets
- Built-in replication
- JSONB for flexible document storage

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

Your application likely fits into one of these common categories. SQLite and PostgreSQL excel in all of them:

### 1. **Content Management Systems**
Choose SQLite for single-user blogs or small team sites. Use PostgreSQL for multi-tenant CMS platforms.

### 2. **E-commerce Platforms**
SQLite works perfectly for mobile app product catalogs. PostgreSQL handles full e-commerce sites with complex transactions.

### 3. **SaaS Applications**
PostgreSQL's row-level security makes multi-tenancy simple. JSONB columns adapt to varying customer needs without schema changes.

### 4. **Analytics Dashboards**
Embed SQLite for in-app analytics. Use PostgreSQL with TimescaleDB for time-series data analysis.

### 5. **Mobile and Desktop Apps**
SQLite stores data locally on devices. PostgreSQL powers your backend API.

## The 1%: When You Actually Need Something Else

You might need specialized databases in these rare cases. But even then, try PostgreSQL first:

### 1. **True Graph Traversal at Scale**
**When to switch:** You're running a social network with billions of users. You need real-time friend-of-friend queries across 6+ degrees of separation.
**Alternative:** Neo4j, Amazon Neptune
**But first try:** PostgreSQL with recursive CTEs or the Apache AGE extension

### 2. **Extreme Write Throughput**
**When to switch:** Your IoT platform ingests over 1 million writes per second continuously.
**Alternative:** Cassandra, ScyllaDB
**But first try:** PostgreSQL with partitioning and write-optimized settings

### 3. **Global Multi-Master Requirements**
**When to switch:** You need active-active writes across continents with automatic conflict resolution.
**Alternative:** CockroachDB, YugabyteDB
**But first try:** PostgreSQL with logical replication and custom conflict handling

### 4. **Specialized Time-Series Workloads**
**When to switch:** Your monitoring system needs complex retention policies and automated downsampling.
**Alternative:** InfluxDB, Prometheus
**But first try:** PostgreSQL with TimescaleDB extension

### 5. **Document Store with Complex Aggregations**
**When to switch:** Your entire data model consists of deeply nested documents requiring MapReduce operations.
**Alternative:** MongoDB
**But first try:** PostgreSQL with JSONB and generated columns

## Decision Framework

Stop before you add another database. Ask yourself these four questions:

1. **Have you actually hit a limitation?** Don't solve problems you don't have yet.
2. **Can PostgreSQL extensions solve this?** Check PostGIS, TimescaleDB, and pg_partman first.
3. **Is the complexity worth it?** Every new database adds monitoring, backups, and expertise requirements.
4. **Have you tuned your current database?** Most performance issues stem from poor configuration, not wrong technology.

## Best Practices for the 99%

### Start with SQLite When:
You're building prototypes or MVPs. You're creating desktop or mobile apps. You need embedded data storage. You're working on single-user applications.

### Migrate to PostgreSQL When:
Multiple users need concurrent access. You need advanced features like full-text search or GIS. You're scaling beyond one machine. You require strict data integrity across complex transactions.

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

Every database you add creates new problems:
- You need another system to monitor and backup
- Your team needs additional expertise
- Deployments become more complex
- You increase your attack surface
- Operational costs rise
- Debugging gets harder

**Stick with boring technology that works.**

## Conclusion

The database world offers countless options. You don't need to use them all. SQLite and PostgreSQL evolved over decades to handle almost every use case you'll encounter. They're battle-tested, well-documented, and backed by massive communities.

Before you add that shiny new database, ask one question: "Can PostgreSQL do this?" The answer is almost always yes. For smaller projects, SQLite will surprise you with its power.

Remember: **boring technology choices free you to build interesting products.**

---

*What's your experience with database selection? Have you found cases where SQLite or PostgreSQL wasn't enough?*

*Originally shared on [LinkedIn](https://linkedin.com/in/moorelloyd)*