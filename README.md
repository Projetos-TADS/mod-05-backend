# Movie API 🎬

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000.svg)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)

A RESTful API for movie management with JWT authentication and admin controls. Provides endpoints for user authentication, movie catalog management, actor/director associations, and favorite system.

## 📚 API Documentation

Full interactive documentation available via Swagger UI:  
[http://localhost:3000/docs](http://localhost:3000/docs)

## ✨ Features

- **JWT Authentication**
- **User Management**
  - Admin-controlled user creation
  - Role-based access control
  - User profile updates
- **Movie Catalog**
  - Full CRUD operations for movies
  - Actor/director associations
  - Paginated search with title filtering
  - Rating system (0-5 stars)
- **Favorites System**
  - Add/remove movies to favorites
  - List user's favorite movies
- **Professionals Management**
  - Complete CRUD for actors and directors
  - Movie association history

## 🛠 Built With

- **Backend**
  - Node.js
  - Express
  - TypeScript
  - MySQL
  - Swagger (API Documentation)
  - JWT (Authentication)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- MySQL

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/movie-api.git
cd movie-api
```

2. Install dependencies:

```bash
npm install
```

3. Create .env file:

```bash
PORT=application_run_port
DATABASE_URL=mysql://<username>:<password>@<host>:<port>/<database>

SECRET_KEY=jwt_secret_key
EXPIRES_IN=jwt_expires_in
```

4. Run the application:

```bash
npm run dev
```

The API will be available at http://localhost:3000 and documentation at http://localhost:3000/docs.

📋 Endpoints Overview
Authentication
POST /login - User authentication

Users
POST /users - Create new user (Admin only)

GET /users - List all users (Admin only)

GET /users/{userId} - Get user details

PATCH /users/{userId} - Update user

DELETE /users/{userId} - Delete user

Movies
GET /movies - List movies (paginated)

POST /movies - Create movie (Admin only)

GET /movies/{movieId} - Get movie details

PATCH /movies/{movieId} - Update movie (Admin only)

DELETE /movies/{movieId} - Delete movie (Admin only)

Favorites
POST /favorites/{userId} - Add to favorites

GET /favorites/all/{userId} - List user favorites

DELETE /favorites/{favoriteMovieId} - Remove from favorites

Actors/Directors
Full CRUD operations for managing professionals

🔒 Authentication
The API uses JWT for authentication. To access protected endpoints:

1. Obtain token from POST /login

2. Include token in request headers:

```bash
Authorization: Bearer <your_token>
```

💡 Example Requests
Login

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "your_password"}'
```

Get Movies

```bash
curl -X GET http://localhost:3000/movies \
  -H "Authorization: Bearer <your_token>"
```

Add Favorite

```bash
curl -X POST http://localhost:3000/favorites/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{"movieId": "054e014f-6549-4284-9325-e0a8ba35c0d2"}'
```

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add some amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

Built with ❤️ by Amanda Dolci Figueiredo and Vinicius Garcia
