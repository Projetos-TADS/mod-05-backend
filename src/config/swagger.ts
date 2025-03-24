import swaggerJSDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Movie API",
      version: "1.0.0",
      description:
        "API for managing movies with JWT authentication and admin control. Includes endpoints for authentication, movie management, and CRUD operations.",
      contact: {
        name: "Amanda Dolci Figueiredo and Vinicius Garcia",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development Server",
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "Endpoints related to user authentication, including login.",
      },
      {
        name: "Users",
        description: "Endpoints for user management.",
      },
      {
        name: "Movies",
        description: "Endpoints for movie management.",
      },
      {
        name: "Actors",
        description: "Endpoints for actor management",
      },
      {
        name: "Directors",
        description: "Endpoints for director management",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "Security scheme for JWT authentication. The token must be included in the 'Authorization' header as 'Bearer [token]'.",
        },
      },
      schemas: {
        Movie: {
          type: "object",
          properties: {
            movieId: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
              description: "Unique movie ID generated in UUID format.",
              readOnly: true,
            },
            title: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              example: "The Matrix",
              description: "Movie title.",
            },
            description: {
              type: "string",
              minLength: 1,
              maxLength: 1000,
              example: "A hacker discovers a simulated reality",
              description: "Detailed movie description.",
            },
            releaseYear: {
              type: "integer",
              minimum: 1888,
              maximum: new Date().getFullYear(),
              example: 1999,
              description: "Movie release year.",
            },
            duration: {
              type: "integer",
              minimum: 1,
              example: 136,
              description: "Movie duration in minutes.",
            },
            rating: {
              type: "number",
              format: "float",
              minimum: 0,
              maximum: 5.0,
              example: 4.7,
              description: "Movie rating on a scale from 0 to 5.",
            },
            urlImage: {
              type: "string",
              format: "uri",
              maxLength: 255,
              example: "https://example.com/matrix.jpg",
              description: "URL of the movie cover image.",
            },
          },
          required: ["title", "description", "releaseYear", "duration", "rating", "urlImage"],
        },
        MovieCreate: {
          type: "object",
          properties: {
            title: { $ref: "#/components/schemas/Movie/properties/title" },
            description: { $ref: "#/components/schemas/Movie/properties/description" },
            releaseYear: { $ref: "#/components/schemas/Movie/properties/releaseYear" },
            duration: { $ref: "#/components/schemas/Movie/properties/duration" },
            rating: { $ref: "#/components/schemas/Movie/properties/rating" },
            urlImage: { $ref: "#/components/schemas/Movie/properties/urlImage" },
          },
          required: ["title", "description", "releaseYear", "duration", "rating", "urlImage"],
          description: "Schema for creating a new movie. All fields are required.",
        },
        MovieUpdate: {
          type: "object",
          properties: {
            title: { $ref: "#/components/schemas/Movie/properties/title" },
            description: { $ref: "#/components/schemas/Movie/properties/description" },
            releaseYear: { $ref: "#/components/schemas/Movie/properties/releaseYear" },
            duration: { $ref: "#/components/schemas/Movie/properties/duration" },
            rating: { $ref: "#/components/schemas/Movie/properties/rating" },
            urlImage: { $ref: "#/components/schemas/Movie/properties/urlImage" },
          },
          anyOf: [
            { required: ["title"] },
            { required: ["description"] },
            { required: ["releaseYear"] },
            { required: ["duration"] },
            { required: ["rating"] },
            { required: ["urlImage"] },
          ],
          description:
            "Schema for updating an existing movie. At least one field must be provided.",
        },
        MovieComplete: {
          allOf: [
            { $ref: "#/components/schemas/Movie" },
            {
              type: "object",
              properties: {
                actors: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Actor" },
                  description: "List of actors in the movie.",
                },
                directors: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Director" },
                  description: "List of movie directors.",
                },
              },
            },
          ],
          description: "Complete movie schema including basic information, actors, and directors.",
        },
        Login: {
          type: "object",
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "user@example.com",
              description: "User's email address.",
            },
            password: {
              type: "string",
              format: "password",
              example: "SecurePassword123",
              description: "User's password.",
            },
          },
          required: ["email", "password"],
          description: "Login schema. Requires email and password.",
        },
        UserCreate: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "John Smith",
              description: "User's full name",
              minLength: 1,
              maxLength: 100,
            },
            email: {
              type: "string",
              format: "email",
              example: "user@example.com",
              description: "User's email (must be unique)",
            },
            password: {
              type: "string",
              format: "password",
              example: "SecurePassword123",
              description: "User's password (minimum 6 characters)",
              minLength: 6,
            },
            cpf: {
              type: "string",
              example: "58785455008",
              description: "User's CPF (numbers only, 11 digits)",
              pattern: "^[0-9]{11}$",
            },
          },
          required: ["name", "email", "password", "cpf"],
          description: "Schema for creating a new user",
        },
        UserUpdate: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "John Smith Junior",
              description: "User's new name",
              minLength: 1,
              maxLength: 100,
            },
            password: {
              type: "string",
              format: "password",
              example: "NewSecurePassword123",
              description: "User's new password",
              minLength: 8,
            },
          },
          anyOf: [{ required: ["name"] }, { required: ["email"] }, { required: ["password"] }],
          description: "Schema for updating a user. At least one field must be provided.",
        },
        UserRead: {
          type: "array",
          items: {
            $ref: "#/components/schemas/User",
          },
          description: "List of registered users",
        },
        User: {
          type: "object",
          properties: {
            userId: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
              description: "User's unique ID",
              readOnly: true,
            },
            name: {
              type: "string",
              example: "John Smith",
              description: "User's full name",
            },
            email: {
              type: "string",
              format: "email",
              example: "user@example.com",
              description: "User's email address",
            },
            cpf: {
              type: "string",
              example: "58785455008",
              description: "User's CPF (numbers only)",
            },
            admin: {
              type: "boolean",
              example: false,
              description: "Indicates whether the user has administrator privileges",
            },
          },
        },
        SessionReturn: {
          type: "object",
          properties: {
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              description: "JWT token generated for authentication",
            },
            user: {
              $ref: "#/components/schemas/User",
              description: "Authenticated user information",
            },
          },
          description:
            "Login session response schema containing the JWT token and user information",
        },
        Actor: {
          type: "object",
          properties: {
            actorId: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            name: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              example: "Keanu Reeves",
            },
            birthDate: {
              type: "string",
              format: "date",
              example: "1964-09-02",
            },
            nationality: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              example: "Canadian",
            },
          },
        },
        ActorCreate: {
          type: "object",
          properties: {
            name: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              example: "Keanu Reeves",
            },
            birthDate: {
              type: "string",
              format: "date",
              example: "1964-09-02",
            },
            nationality: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              example: "Canadian",
            },
          },
          required: ["name", "birthDate", "nationality"],
        },
        ActorUpdate: {
          type: "object",
          properties: {
            name: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              example: "Keanu Reeves",
            },
            birthDate: {
              type: "string",
              format: "date",
              example: "1964-09-02",
            },
            nationality: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              example: "Canadian",
            },
          },
          anyOf: [
            { required: ["name"] },
            { required: ["birthDate"] },
            { required: ["nationality"] },
          ],
        },
        ActorRead: {
          type: "array",
          items: {
            $ref: "#/components/schemas/Actor",
          },
        },
        ActorReturn: {
          $ref: "#/components/schemas/Actor",
        },
        Director: {
          type: "object",
          properties: {
            directorId: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            name: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              example: "Keanu Reeves",
            },
            birthDate: {
              type: "string",
              format: "date",
              example: "1964-09-02",
            },
            nationality: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              example: "Canadian",
            },
          },
        },
        DirectorCreate: {
          type: "object",
          properties: {
            name: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              example: "Keanu Reeves",
            },
            birthDate: {
              type: "string",
              format: "date",
              example: "1964-09-02",
            },
            nationality: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              example: "Canadian",
            },
          },
          required: ["name", "birthDate", "nationality"],
        },
        DirectorUpdate: {
          type: "object",
          properties: {
            name: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              example: "Keanu Reeves",
            },
            birthDate: {
              type: "string",
              format: "date",
              example: "1964-09-02",
            },
            nationality: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              example: "Canadian",
            },
          },
          anyOf: [
            { required: ["name"] },
            { required: ["birthDate"] },
            { required: ["nationality"] },
          ],
        },
        DirectorRead: {
          type: "array",
          items: {
            $ref: "#/components/schemas/Director",
          },
        },
        DirectorReturn: {
          $ref: "#/components/schemas/Director",
        },
      },
      responses: {
        Unauthorized: {
          description:
            "Missing or invalid access token. Please verify the token is present in the 'Authorization' header and is valid.",
          content: {
            "application/json": {
              example: {
                message: "Missing or invalid access token",
              },
            },
          },
        },
        Forbidden: {
          description:
            "Access denied (insufficient privileges). The user is not authorized to access this resource.",
          content: {
            "application/json": {
              example: {
                message: "Access denied, insufficient privileges",
              },
            },
          },
        },
        NotFound: {
          description: "Resource not found. The requested resource does not exist.",
          content: {
            "application/json": {
              example: {
                message: "Resource not found",
              },
            },
          },
        },
        InvalidCredentials: {
          description: "Invalid credentials. Incorrect email or password.",
          content: {
            "application/json": {
              example: {
                message: "Invalid credentials",
              },
            },
          },
        },
        ServerError: {
          description: "Internal server error",
          content: {
            "application/json": {
              example: {
                message: "Internal server error",
              },
            },
          },
        },
        BadRequest: {
          description: "Invalid request",
          content: {
            "application/json": {
              example: {
                message: "Invalid request",
              },
            },
          },
        },
      },
      parameters: {
        PageParam: {
          name: "page",
          in: "query",
          description: "Page number for data display. Pagination starts at 0.",
          schema: {
            type: "integer",
            minimum: 0,
            default: 0,
          },
        },
        PerPageParam: {
          name: "perPage",
          in: "query",
          description: "Number of items per page. Useful for controlling response size.",
          schema: {
            type: "integer",
            minimum: 1,
            maximum: 100,
            default: 5,
          },
        },
        TitleParam: {
          name: "title",
          in: "query",
          description: "Filter movies by title (case-insensitive partial search)",
          schema: {
            type: "string",
            example: "matrix",
          },
        },
        MovieIdParam: {
          name: "movieId",
          in: "path",
          required: true,
          description: "ID of the movie to be queried, updated or deleted.",
          schema: {
            type: "string",
            format: "uuid",
          },
        },
        UserIdParam: {
          name: "userId",
          in: "path",
          required: true,
          description: "Unique user ID in UUID format",
          schema: {
            type: "string",
            format: "uuid",
            example: "550e8400-e29b-41d4-a716-446655440000",
          },
        },
        ActorIdParam: {
          name: "actorId",
          in: "path",
          required: true,
          description: "Unique actor ID in UUID format",
          schema: {
            type: "string",
            format: "uuid",
            example: "550e8400-e29b-41d4-a716-446655440000",
          },
        },
        DirectorIdParam: {
          name: "directorId",
          in: "path",
          required: true,
          description: "Unique director ID in UUID format",
          schema: {
            type: "string",
            format: "uuid",
            example: "550e8400-e29b-41d4-a716-446655440000",
          },
        },
      },
    },
    paths: {
      "/login": {
        post: {
          summary: "User authentication",
          description:
            "Performs login and returns a JWT token. Use the returned token in the 'Authorization' header to access protected endpoints.",
          tags: ["Auth"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Login" },
              },
            },
          },
          responses: {
            200: {
              description: "Login successful",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/SessionReturn" },
                  examples: {
                    success: {
                      value: {
                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        user: {
                          userId: "550e8400-e29b-41d4-a716-446655440000",
                          name: "John Smith",
                          email: "user@example.com",
                          admin: false,
                        },
                      },
                    },
                  },
                },
              },
            },
            401: { $ref: "#/components/responses/InvalidCredentials" },
          },
        },
      },
      "/users": {
        get: {
          summary: "List all users",
          description: "Returns a list of all registered users (requires admin)",
          tags: ["Users"],
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "List of users",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/UserRead" },
                },
              },
            },
          },
        },
        post: {
          summary: "Create new user",
          description: "Creates a new user in the system (requires admin)",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserCreate" },
              },
            },
          },
          responses: {
            201: {
              description: "User created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                  examples: {
                    default: {
                      value: {
                        userId: "550e8400-e29b-41d4-a716-446655440000",
                        name: "John Smith",
                        email: "user@example.com",
                        cpf: "58785455008",
                        admin: false,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/users/{userId}": {
        get: {
          summary: "Get user by ID",
          description: "Retrieves complete details of a specific user by their ID (requires admin)",
          tags: ["Users"],
          security: [{ bearerAuth: [] }],
          parameters: [{ $ref: "#/components/parameters/UserIdParam" }],
          responses: {
            200: {
              description: "User details",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                  examples: {
                    default: {
                      value: {
                        userId: "550e8400-e29b-41d4-a716-446655440000",
                        name: "John Smith",
                        email: "user@example.com",
                        cpf: "58785455008",
                        admin: false,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        patch: {
          summary: "Update user",
          description: "Updates data of an existing user (requires admin)",
          tags: ["Users"],
          security: [{ bearerAuth: [] }],
          parameters: [{ $ref: "#/components/parameters/UserIdParam" }],
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UserUpdate" },
              },
            },
          },
          responses: {
            200: {
              description: "User updated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
            403: { $ref: "#/components/responses/Forbidden" },
            404: { $ref: "#/components/responses/NotFound" },
          },
        },
        delete: {
          summary: "Delete user",
          description: "Permanently removes a user from the system (requires admin)",
          tags: ["Users"],
          security: [{ bearerAuth: [] }],
          parameters: [{ $ref: "#/components/parameters/UserIdParam" }],
          responses: {
            204: {
              description: "User deleted successfully",
            },
            403: { $ref: "#/components/responses/Forbidden" },
            404: { $ref: "#/components/responses/NotFound" },
          },
        },
      },
      "/movies": {
        get: {
          summary: "List movies",
          description:
            "Paginated list of movies with title filtering. Allows viewing movies with pagination and filtering.",
          tags: ["Movies"],
          security: [{ bearerAuth: [] }],
          parameters: [
            { $ref: "#/components/parameters/PageParam" },
            { $ref: "#/components/parameters/PerPageParam" },
            { $ref: "#/components/parameters/TitleParam" },
          ],
          responses: {
            200: {
              description: "List of movies",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/MovieComplete" },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create movie",
          description:
            "Creates a new movie (requires admin privileges). Only users with admin role can create new movies.",
          tags: ["Movies"],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MovieCreate" },
              },
            },
          },
          responses: {
            201: { description: "Movie created successfully" },
          },
        },
      },
      "/movies/{movieId}": {
        get: {
          summary: "Get movie details",
          description: "Returns complete details of a specific movie.",
          tags: ["Movies"],
          security: [{ bearerAuth: [] }],
          parameters: [{ $ref: "#/components/parameters/MovieIdParam" }],
          responses: {
            200: {
              description: "Movie details",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/MovieComplete" },
                  example: {
                    movieId: "550e8400-e29b-41d4-a716-446655440000",
                    title: "The Matrix",
                    description: "A hacker discovers a simulated reality",
                    releaseYear: 1999,
                    duration: 136,
                    rating: 4.7,
                    urlImage: "https://example.com/matrix.jpg",
                    actors: [
                      {
                        actorId: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
                        name: "Keanu Reeves",
                        birthDate: "1964-09-02",
                        nationality: "Canadian",
                      },
                    ],
                    directors: [
                      {
                        directorId: "f1e2d3c4-b5a6-9870-4321-fedcba098765",
                        name: "Lana Wachowski",
                        birthDate: "1965-06-21",
                        nationality: "American",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        patch: {
          summary: "Update movie",
          description:
            "Updates movie data (requires admin). Only users with admin role can update movies.",
          tags: ["Movies"],
          security: [{ bearerAuth: [] }],
          parameters: [{ $ref: "#/components/parameters/MovieIdParam" }],
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MovieUpdate" },
              },
            },
          },
          responses: {
            200: { description: "Movie updated" },
          },
        },
        delete: {
          summary: "Delete movie",
          description:
            "Deletes a movie (requires admin). Only users with admin role can delete movies.",
          tags: ["Movies"],
          security: [{ bearerAuth: [] }],
          parameters: [{ $ref: "#/components/parameters/MovieIdParam" }],
          responses: {
            204: { description: "Movie deleted successfully" },
          },
        },
      },
      "/actors": {
        get: {
          summary: "List all actors",
          description: "Returns a complete list of all registered actors",
          tags: ["Actors"],
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "List of actors",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ActorRead" },
                },
              },
            },
          },
        },
        post: {
          summary: "Create new actor",
          description: "Creates a new actor record (requires admin)",
          tags: ["Actors"],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ActorCreate" },
              },
            },
          },
          responses: {
            201: {
              description: "Actor created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ActorReturn" },
                },
              },
            },
          },
        },
      },
      "/actors/{actorId}": {
        get: {
          summary: "Get actor by ID",
          description: "Retrieves actor by ID (requires admin)",
          tags: ["Actors"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "actorId",
              in: "path",
              required: true,
              schema: {
                type: "string",
                format: "uuid",
                example: "550e8400-e29b-41d4-a716-446655440000",
              },
            },
          ],
          responses: {
            200: {
              description: "Actor details",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ActorReturn" },
                },
              },
            },
          },
        },
        patch: {
          summary: "Update actor",
          description: "Updates data of an existing actor (requires admin)",
          tags: ["Actors"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "actorId",
              in: "path",
              required: true,
              schema: {
                type: "string",
                format: "uuid",
                example: "550e8400-e29b-41d4-a716-446655440000",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ActorUpdate" },
              },
            },
          },
          responses: {
            200: {
              description: "Actor updated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ActorReturn" },
                },
              },
            },
          },
        },
        delete: {
          summary: "Delete actor",
          description: "Permanently removes an actor from the system (requires admin)",
          tags: ["Actors"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "actorId",
              in: "path",
              required: true,
              schema: {
                type: "string",
                format: "uuid",
                example: "550e8400-e29b-41d4-a716-446655440000",
              },
            },
          ],
          responses: {
            204: { description: "Actor deleted successfully" },
          },
        },
      },
      "/directors": {
        get: {
          summary: "List all directors",
          description: "Returns a complete list of all registered directors",
          tags: ["Directors"],
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "List of directors",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/DirectorRead" },
                },
              },
            },
          },
        },
        post: {
          summary: "Create new director",
          description: "Creates a new director record (requires admin)",
          tags: ["Directors"],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DirectorCreate" },
              },
            },
          },
          responses: {
            201: {
              description: "Director created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/DirectorReturn" },
                },
              },
            },
          },
        },
      },
      "/directors/{directorId}": {
        get: {
          summary: "Get director by ID",
          description: "Retrieves director by ID (requires admin)",
          tags: ["Directors"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "directorId",
              in: "path",
              required: true,
              schema: {
                type: "string",
                format: "uuid",
                example: "550e8400-e29b-41d4-a716-446655440000",
              },
            },
          ],
          responses: {
            200: {
              description: "Director details",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/DirectorReturn" },
                },
              },
            },
          },
        },
        patch: {
          summary: "Update director",
          description: "Updates data of an existing director (requires admin)",
          tags: ["Directors"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "directorId",
              in: "path",
              required: true,
              schema: {
                type: "string",
                format: "uuid",
                example: "550e8400-e29b-41d4-a716-446655440000",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DirectorUpdate" },
              },
            },
          },
          responses: {
            200: {
              description: "Director updated",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/DirectorReturn" },
                },
              },
            },
          },
        },
        delete: {
          summary: "Delete director",
          description: "Permanently removes a director from the system (requires admin)",
          tags: ["Directors"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "directorId",
              in: "path",
              required: true,
              schema: {
                type: "string",
                format: "uuid",
                example: "550e8400-e29b-41d4-a716-446655440000",
              },
            },
          ],
          responses: {
            204: { description: "Director deleted successfully" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/**/*.ts", "./src/controllers/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Application): void => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Documentation available at: http://localhost:3000/docs");
};
