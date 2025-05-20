import express from 'express';
import { json } from 'body-parser';
import { issueRoutes } from './routes/issue.routes';
import { AppDataSource } from './data-source';

const app = express();
app.use(json());
app.use('/issues', issueRoutes);

AppDataSource.initialize().then(() => {
  console.log('Database connected');

  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
}).catch((err) => {
  console.error('Error connecting to database:', err);
});