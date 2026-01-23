Database Relationships in an E-Commerce Application

1. Definition of a Database Relationship

A database relationship defines how two or more tables in a relational database are logically connected.
The relationship is formed using primary keys (PK) and foreign keys (FK), allowing structured, efficient, and meaningful data retrieval.

Relationships help avoid data duplication, maintain data integrity, and enable complex queries across multiple tables.

2. Types of Database Relationships

There are three main types of database relationships:

One-to-One (1:1)

One-to-Many (1:N)

Many-to-Many (M:N)


3. One-to-One Relationship (1:1)
Definition

One record in table A is linked to exactly one record in table B, and vice-versa.

E-commerce Example

Users and User Profiles
Every user has exactly one profile, and every profile belongs to only one user.

Table: users

Table: user_profiles

Diagram
users (PK user_id) ─────── 1:1 ─────── user_profiles (FK user_id)

SQL Structure
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE user_profiles (
    profile_id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(user_id),
    address TEXT,
    phone TEXT
);

4. One-to-Many Relationship (1:N)
Definition

One record in table A can be linked to multiple records in table B,
but records in table B can only belong to one record in table A.

E-commerce Example

Customers and Orders
A single customer can place many orders, but each order belongs to only one customer.

Table: customers

Table: orders

Diagram
customers (PK customer_id) ──── 1 : N ──── orders (FK customer_id)

SQL Structure
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(customer_id),
    order_total NUMERIC
);

5. Many-to-Many Relationship (M:N)
Definition

Records in table A can be related to multiple records in table B,
and records in table B can also relate to multiple records in table A.

E-commerce Example

Products and Orders

A single order contains multiple products.

A product can appear in many different orders.

To model this, a junction (bridge) table is needed.

Table: products

Table: orders

Table: order_items (junction table)

Diagram
products (PK product_id) ──┐
                           │ M:N through order_items
orders (PK order_id) ─────┘


SQL Structure
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name TEXT,
    price NUMERIC
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER,
    order_date TIMESTAMP
);

CREATE TABLE order_items (
    order_id INTEGER REFERENCES orders(order_id),
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER,
    PRIMARY KEY (order_id, product_id)
);