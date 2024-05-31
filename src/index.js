import express from 'express';
import { admin, adminRouter } from './admin/index.js';
import bodyParser from 'body-parser';
import userRoutes from './api/user.js';
import projectRoutes from './api/project.js';
import dotenv from 'dotenv';
import { specs, swaggerUi } from '../utils/swagger.js';

dotenv.config();


const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  // eslint-disable-next-line no-undef
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
});

app.use(admin.options.rootPath, adminRouter);
app.use('/api/user', userRoutes);
app.use('/api/project', projectRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
  res.redirect('/admin');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});