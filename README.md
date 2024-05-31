# Overview
This repository contains an Express server application for managing blogs, projects, services, and users using Prisma ORM for MySQL database. The API endpoints are documented using Swagger for easy reference, and basic admin dashboard interface built using AdminJS.

# Setup
- Clone the repository.
- Install dependencies using npm install.
- Set up your MySQL database and update the connection URL in the .env file.
- Run the server using `npm run dev`.

# API Endpoints

Root Api:
```your-site-name/api/```

### Blogs
```GET /blogs: Get all blogs.```

```GET /blogs/{id}: Get a blog by ID.```

```POST /blogs: Create a new blog.```

```PUT /blogs/{id}: Update a blog by ID.```

```DELETE /blogs/{id}: Delete a blog by ID.```

### Projects
```GET /projects: Get all projects.```

```GET /projects/{id}: Get a project by ID.```

```POST /projects: Create a new project.```

```PUT /projects/{id}: Update a project by ID.```

```DELETE /projects/{id}: Delete a project by ID.```

### Services
```GET /services: Get all services.```

```GET /services/{id}: Get a service by ID.```

```POST /services: Create a new service.```

```PUT /services/{id}: Update a service by ID.```

```DELETE /services/{id}: Delete a service by ID.```

### Users
```POST /users: Create a new user.```

```GET /users: Get all users.```

```GET /users/{id}: Get a user by ID.```

```PUT /users/{id}: Update a user by ID.```

```DELETE /users/{id}: Delete a user by ID.```

# Documentation
Swagger documentation is available for the API endpoints. You can access it by running the server and visiting the Swagger UI at http://localhost:{PORT}/api-docs.

Feel free to explore and test the API endpoints using the provided documentation. If you encounter any issues, please refer to the error messages returned by the server for troubleshooting.

Created by [Muhtar Lutfi Efendi](https://muhtarlutfiefendi.vercel.app)