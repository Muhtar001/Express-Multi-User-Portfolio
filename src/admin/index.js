import AdminJS from 'adminjs';
import { Database, Resource, getModelByName } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import AdminJSExpress from '@adminjs/express';
// import uploadFeature from '@adminjs/upload';
// import session from 'express-session';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

AdminJS.registerAdapter({ Database, Resource });

const adminOptions = {
  resources: [
    {
      resource: { model: getModelByName('User'), client: prisma },
      options: {
        properties: {
          bio: {
            type: 'textarea',
            props: {
              rows: 20,
            },
          },
        },
      },
      // features: [
      //   uploadFeature({
      //     provider: { local: { bucket: 'public/img/profile' } }, // Local storage configuration
      //     properties: {
      //       key: 'avatar', // this column will store the uploaded file URL
      //       mimeType: 'mimeType', // this column will store the MIME type of the uploaded file
      //     },
      //     validation: {
      //       mimeTypes: ['image/jpeg', 'image/png'], // allowed MIME types
      //     },
      //   }),
      // ],
    },
    {
      resource: { model: getModelByName('Project'), client: prisma },
      Options: {},
    },
    {
      resource: { model: getModelByName('Service'), client: prisma },
      Options: {},
    },
    {
      resource: { model: getModelByName('Blog'), client: prisma },
      options: {
        properties: {
          content: {
            type: 'richtext',
            props: {
              rows: 20,
            },
          },
          status: {
            availableValues: [
              {
                value: 'Draft',
              },
              {
                value: 'Published',
              },
            ],
          },
        },
      },
      // features: [
      //   uploadFeature({
      //     provider: { local: { bucket: 'public/img/blog/cover' } }, // Local storage configuration
      //     properties: {
      //       key: 'coverImageUrl', // this column will store the uploaded file URL
      //       mimeType: 'mimeType', // this column will store the MIME type of the uploaded file
      //     },
      //     validation: {
      //       mimeTypes: ['image/jpeg', 'image/png'], // allowed MIME types
      //     },
      //   }),
      // ],
    },
    // Add other resources here
  ],
  rootPath: '/admin',
};

// Create AdminJS instance
const admin = new AdminJS(adminOptions);

const authenticate = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
};

const sessionOptions = {
  secret: 'some-secret-key',
  resave: false,
  saveUninitialized: true,
};

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate,
    cookiePassword: 'some-secret-password',
  },
  null,
  sessionOptions
);

export { admin, adminRouter };
