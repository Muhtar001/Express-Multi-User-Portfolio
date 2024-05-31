/* eslint-disable no-undef */
// swagger.js
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A simple Express API with Swagger',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
    components: {
      schemas: {
        Project: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            userId: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
            deletedAt: {
              type: 'string',
              format: 'date-time',
              nullable: true,
            },
            imageUrls: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            links: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            user: {
              $ref: '#/components/schemas/User',
            },
            tags: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Tag',
              },
            },
            categories: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Category',
              },
            },
          },
        },
        Blog: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            author: {
              type: string,
            },
            title: {
              type: String,
            },
            content: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
            deletedAt: {
              type: 'string',
              format: 'date-time',
            },
            cover: {
              type: 'string',
              nullable: 'true',
            },
            status: {
              type: 'string',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
            tags: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Tag',
              },
            },
            categories: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Category',
              },
            },
          },
        },
        Service: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: {
              type: 'string',
            },
            description: { type: string },
            cover: {
              type: 'string',
            },
            userId: {
              type: 'string',
            },
            price: {
              type: 'string',
              format: 'number',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
            deletedAt: {
              type: 'string',
              format: 'date-time',
            },
            duration: {
              type: 'string',
              format: 'number',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
            tags: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Tag',
              },
            },
            categories: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Category',
              },
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            username: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            firstName: {
              type: 'string',
              nullable: true,
            },
            lastName: {
              type: 'string',
              nullable: true,
            },
            phoneNumber: {
              type: 'string',
              nullable: true,
            },
            bio: {
              type: 'string',
              nullable: true,
            },
            avatar: {
              type: 'string',
              nullable: true,
            },
            socialLinks: {
              type: 'array',
              items: {
                type: 'string',
              },
              nullable: true,
            },
          },
        },
        Tag: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
          },
        },
        Category: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            description: {
              type: 'string',
              nullable: true,
            },
          },
        },
      },
    },
  },
  apis: ['../api/*.js'], // Path to the API docs
};

const specs = swaggerJsDoc(options);

export { specs, swaggerUi };
