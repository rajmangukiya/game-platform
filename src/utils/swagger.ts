import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'test api',
      version: '1.0.0'
    },
    basePath: '/api/v1',
    schemes: [
      "http",
      "https"
    ],
    tags: [
      {
        name: "User",
        description: "Operations about User"
      }
    ],
    securityDefinitions: {
      Token: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      }
    }
  },
  apis: [
    './src/api/routes/user.js',
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }))
};
