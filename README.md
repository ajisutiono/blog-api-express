# blog-api-express

Blog API is an Express.js project that implements a RESTful API with the following features:

🔐 Authentication & Authorization with JWT

🧪 Test-Driven Development (TDD) using Postman

📩 Message Broker with RabbitMQ

⚡ Caching with Redis

👥 Collaboration on Blog Posts (owners can grant edit access to other users, with restrictions)





🚀 Main Features

1. Authentication & Authorization
	* User registration and login with JWT
	* Middleware to verify tokens
	* Role-based access for owners and collaborators

2. Post Management
	* Full CRUD operations for blog posts
	* Only the post owner can delete a post
	* Owners can grant collaboration access:
		* Collaborators can edit the post
		* Collaborators cannot delete the post

3. Collaboration
		* Owners can add users as collaborators
		* Collaborators can update posts
		* Collaboration events are published to RabbitMQ

4. Redis Caching
		* Cache responses for getAllPosts and getPostById
		* Cache invalidation when posts are updated or deleted

5. RabbitMQ Integration
		* Events (e.g., post updates or collaboration actions) are published to RabbitMQ
		* Consumers can process events for logging or integration with other services

6. TDD with Postman
		* Postman collection included for all endpoints
		* Automated testing using Postman



🛠️ Tech Stack

Runtime: Node.js + Express.js

Database: PostgreSQL / MySQL (choose based on setup)

Authentication: JWT

Caching: Redis

Message Broker: RabbitMQ

Testing: Postman + Newman

Optional: Docker (for Redis & RabbitMQ services)



📂 Project Structure

blog/
├── src/
│   ├── config/        # JWT, DB, Redis, RabbitMQ, auth token configuration
│   ├── controllers/   # Controller logic to client
│   ├── exceptions/    # error handling
│   ├── middlewares/   # Authentication & authorization, validation, token manager middleware
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── utils/         # Helper functions
│   ├── validators/    # rules validations
│   ├── app.js/        # Express app entry point
│   └── server.js      # Set server Express
├── test               # Collection and Environment postman
├── package.json
└── README.md


⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/blog.git
   cd blog
2. Install dependencies:
    ```bash
    npm install

3. Copy the environment file:
    ```bash
    cp .env.example .env

4. Example .env configuration:
    ```bash
    PORT=3000
    DATABASE_URL=postgres://user:password@localhost:5432/blog
    JWT_SECRET=your_secret_key
    REDIS_HOST=127.0.0.1
    REDIS_PORT=6379
    RABBITMQ_URL=amqp://localhost

5. Start Redis & RabbitMQ (via Docker):
    ```bash
    docker-compose up -d

6. Start the development server:
    ```bash
    npm run start
    
  or
    
    npm run start:dev



📡 API Endpoints
Auth

POST /authentications → Register accessToken and refreshToken JWT

PUT /authentications → Edit expired accessToken with refreshToken

DELETE /authentication → Delete all tokens

Posts

POST /posts → Create a new post (requires authentication)

GET /posts → Get all posts (cached with Redis)

GET /posts/:id → Get post details (cached with Redis)

PUT /posts/:id → Update a post (owner or collaborator)

DELETE /posts/:id → Delete a post (owner only)

Collaboration

POST /posts/:id/collaborations → Add a collaborator

GET /posts/:id/collaborations → Get collaborators list


🧪 Testing

Import the Postman Collection and Environment from the tests/ folder.



📬 RabbitMQ Example

When a post is updated, an event is published to RabbitMQ:

{
  "event": "POST_UPDATED",
  "postId": "post-123",
  "updatedBy": "user-456",
  "timestamp": "2025-09-14T12:00:00Z"
}


A consumer can read this event for logging or further processing.


⚡ Redis Example

GET /posts → Check Redis cache (posts:all).

GET /posts/:id → Check Redis cache (posts:{id}).

If not cached, fetch from DB and store in Redis.

PUT /posts/:id or DELETE /posts/:id → Invalidate related cache.

