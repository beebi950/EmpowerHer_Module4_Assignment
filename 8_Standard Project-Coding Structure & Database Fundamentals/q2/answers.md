1. Why is db.json not suitable as a database for real projects?

Using db.json as a database is not suitable for real-world applications because it is only a file, not a true database system.

Limitations of File-Based Storage

It reads & writes the entire file every time → slow performance

There is no concurrency → if multiple users write at the same time, the file becomes corrupted

No indexing → searching becomes slow as the data grows

No automatic backup or recovery

Can't handle large datasets

Not secure

No data integrity or validation

Performance, Scalability & Reliability Issues

Performance: As the file size grows beyond a few MBs, read/write operations become extremely slow.

Scalability: Cannot handle many users, large data, or high traffic.

Reliability: If the server crashes during a write, the entire file can get corrupted.

### ---------------------------------------------------------------------------------------------------------------------

2. What are the ideal characteristics of a real database system?

A good database is more than just "data storage". It must provide:

1. Performance

Fast read/write operations

Optimized queries

Indexing for large datasets

2. Concurrency

Supports multiple users at the same time

Prevents race conditions and data corruption

3. Reliability

Consistent performance even under heavy load

Provides backups and recovery options

4. Data Integrity

Enforces rules (constraints)

Ensures accurate and consistent data

5. Scalability

Should grow with the project

Horizontal/vertical scaling

6. Fault Tolerance

Works even if hardware fails

Provides durability and replication

### ---------------------------------------------------------------------------------------------------------------------

3. Types of Databases & Their Use Cases

## A. Relational Databases (SQL)

Examples:

MySQL

PostgreSQL

Oracle

SQL Server

Features

Structured data

Tables with rows & columns

Supports relationships using primary/foreign keys

Strong ACID properties

Use Cases

Banking systems

E-commerce platforms

Inventory management

ERP systems

Any system where data consistency is critical

## B. Non-Relational Databases (NoSQL)

Examples:

MongoDB

Cassandra

Redis

DynamoDB

Features

Flexible schema

Handles unstructured and semi-structured data

High scalability

Great for distributed systems

Use Cases

Real-time chat apps

Social media feeds

Big data applications

IoT applications

Caching and sessions