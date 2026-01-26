# Schema Design Fundamentals – Theory

## 1. What Schema Design Is and What a Database Schema Represents
Schema design is the structured process of defining how data will be stored, organized, and related within a relational database.  
A **database schema** represents the blueprint of the database. It includes:
- Tables
- Columns and their data types
- Relationships (foreign keys)
- Constraints (primary keys, uniqueness, default values)
- Rules that ensure how data is stored and accessed

In simple terms, the database schema is the architecture or plan that describes how information is structured.

---

## 2. Why Schema Design Is Required Before Writing Backend Code
Schema design must be completed before writing backend logic because:
- The backend interacts with the database through the schema.
- API inputs, validations, and business logic depend on the structure of tables.
- A clear schema avoids rework, code breaking, and inconsistencies when the application grows.
- Backend developers need a stable and predictable data model to build reliable endpoints.

Without proper schema design, the backend lacks a foundation, leading to errors, complications, and performance issues.

---

## 3. Impact of Poor Schema Design on Data Consistency, Maintenance, and Scalability
A poorly designed schema leads to multiple long-term problems:

### Data Consistency Issues
- Incorrect relationships may allow invalid or orphan records.
- Missing constraints can lead to duplicate or incomplete data.
- Updates and deletes may cause inconsistency across related tables.

### Maintenance Problems
- Developers must write complex logic to compensate for improper relationships.
- High risk of bugs because the database does not enforce rules.
- Harder to understand and extend the system.

### Scalability Limitations
- Incorrect indexing or data types slow down queries.
- Redundant data increases storage and complicates updates.
- Growing data volume amplifies design flaws and degrades performance.

Good schema design ensures the database remains reliable, predictable, and efficient as the system grows.

---

## 4. What Validations Are in Schema Design and Why Databases Enforce Them
Schema validations are rules applied at the database level to ensure only correct, complete, and meaningful data enters the system.

Common validations include:

| Validation | Purpose |
|-----------|----------|
| **NOT NULL** | Ensures a column always has a value. Prevents missing essential data. |
| **UNIQUE** | Ensures no duplicate values exist (e.g., email, phone number). |
| **DEFAULT** | Automatically assigns a value if none is provided. |
| **PRIMARY KEY** | Uniquely identifies each record. |
| **FOREIGN KEY** | Enforces a valid relationship between tables. |

Databases enforce validations because it:
- Prevents application errors from corrupting data.
- Ensures integrity even if backend code fails.
- Maintains consistency across the entire system.

---

## 5. Difference Between a Database Schema and a Database Table
A **database schema** is the complete structural design of the database—its blueprint.  
A **database table** is a single component inside the schema that stores rows of data for one particular entity.

Example:  
Schema = Entire school database  
Tables = students, teachers, classes, attendance, exams

The schema defines how these tables connect and follow rules.

---

## 6. Why a Table Should Represent Only One Entity
A relational table must follow the principle of **Single Entity Representation**.

For example:
- A `users` table should store only user information.
- An `orders` table should store only order-specific details.

Reasons:
- It avoids mixing unrelated data.
- It maintains normalization and reduces redundancy.
- It improves query performance.
- It allows each table to have clear, maintainable structure.
- Prevents anomalies during insert, update, and delete operations.

---

## 7. Why Redundant or Derived Data Should Be Avoided in Table Design
Redundant or calculated data should not be stored because it creates inconsistency.

Examples:
- Storing both `price` and `total_price` (derived from price × quantity)
- Storing a user's age instead of date_of_birth (age changes daily)

Problems caused:
- Multiple copies of the same information become inconsistent.
- Updates must be applied in multiple places.
- Increased storage cost.
- Makes maintenance complex and error-prone.

Instead, derived values should be computed at query time or application level.

---

## 8. Importance of Choosing Correct Data Types
Choosing appropriate data types is critical for:

### Accuracy
- Storing a phone number as INTEGER may remove leading zeros.
- Using TEXT for numeric values prevents numeric operations.

### Performance
- Smaller data types reduce memory usage and speed up queries.
- Correct types allow indexing and sorting to work efficiently.

### Validation
- Using the right data type prevents invalid values (e.g., storing dates in DATE type ensures proper formatting).

### Storage Optimization
- Efficient data types reduce disk usage and improve scaling.

Correct data types ensure the database remains optimized, secure, and capable of handling large amounts of data reliably.

---

## Conclusion
Schema design is the foundation of any relational database system. A well-planned schema ensures accuracy, consistency, performance, and scalability. It allows the backend to operate reliably and keeps the system maintainable as it grows. By following principles such as normalization, valid data types, proper constraints, and entity separation, developers create databases that are both robust and future-proof.