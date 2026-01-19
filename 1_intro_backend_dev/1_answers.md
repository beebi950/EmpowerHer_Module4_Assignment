# Web Application Fundamentals

---

## Q1. Role of Frontend (FE)

The Frontend (FE) is the part of a web application that users directly see and interact with in their browser. It focuses on presentation, interaction, and communication with the backend.

### User Interface
The frontend is responsible for designing and displaying the user interface. This includes layouts, buttons, forms, text, images, and overall visual styling using HTML, CSS, and UI frameworks.

### User Interaction
Frontend handles user actions such as clicks, form submissions, scrolling, and keyboard inputs. JavaScript is used to validate input, show messages, update content dynamically, and provide a smooth user experience without reloading the page.

### Communication with Backend
The frontend sends requests to the backend using APIs (HTTP/HTTPS). It receives data in formats like JSON and displays it to the user. For example, fetching user details, submitting login data, or loading product lists.

---

## Q2. Role of Backend (BE)

The Backend (BE) is the part of a web application that works behind the scenes. It manages data, logic, and security.

### Server-Side Processing
The backend processes client requests, executes application logic, and sends appropriate responses. It handles operations such as calculations, validations, and decision-making.

### Database Handling
Backend connects to databases to store, retrieve, update, and delete data. It ensures data consistency and manages relationships between different data entities.

### Security and Authentication
Backend ensures application security by handling authentication and authorization. It verifies user identity, manages sessions or tokens, encrypts sensitive data, and protects against unauthorized access.

---

## Q3. Business Logic

Business Logic refers to the rules and conditions that define how a business operates within a software application. It controls how data is processed based on real-world requirements.

### Examples of Business Logic

1. **E-commerce Discount System**  
   Applying a 10% discount only if the cart value exceeds a certain amount.

2. **Banking Application**  
   Allowing money transfer only if the account balance is sufficient and the daily limit is not exceeded.

3. **Job Portal**  
   Showing job recommendations based on user skills, experience, and location.

Business logic ensures the application behaves according to business rules rather than just technical operations.

---

## Q4. Client–Server Model

The Client–Server Model is a communication structure where tasks are divided between service providers (servers) and service requesters (clients).

### Client
The client is usually a web browser or mobile app used by the end user. It sends requests to the server and displays the response.

### Server
The server is a system that processes requests, runs backend logic, interacts with databases, and sends responses back to the client.

### Communication
Communication happens over the internet using protocols like HTTP or HTTPS. The client sends a request, the server processes it, and sends back a response.

---

## Q5. Three-Tier Architecture

Three-Tier Architecture divides a web application into three separate layers for better organization and scalability.

### Presentation Layer
This is the frontend layer. It handles the user interface and user interactions.

### Application (Business) Layer
This layer contains the business logic. It processes requests, applies rules, and controls data flow between frontend and database.

### Data Layer
This layer manages data storage. It includes databases and data access logic.

### Why This Architecture Is Used
- Improves scalability
- Easier maintenance
- Better security
- Clear separation of responsibilities

---

## Q6. JavaScript as a Backend Language

JavaScript is widely used as a backend language due to its efficiency and flexibility.

### Performance
JavaScript runs on non-blocking, event-driven architecture (Node.js), which makes it fast and suitable for real-time applications.

### Ecosystem
JavaScript has a large ecosystem with millions of packages available through npm, making development faster and easier.

### Popular Backend Frameworks
- Node.js
- Express.js
- NestJS
- Fastify

