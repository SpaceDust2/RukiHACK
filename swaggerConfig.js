const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'DevBuild API',
    version: '1.0.0',
    description: 'API документация для сервиса DevBuild',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Укажите путь к файлам с вашими маршрутами
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
