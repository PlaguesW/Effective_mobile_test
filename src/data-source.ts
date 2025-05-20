import { DataSource } from 'typeorm';
import { Issue } from './entities/Issue';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'your_user',
  password: process.env.DB_PASSWORD || 'your_pass',
  database: process.env.DB_DATABASE || 'issue_db',
  synchronize: true, 
  logging: true, 
  entities: [Issue],
});

AppDataSource.initialize().then(() => {
  console.log('Database connected');
}).catch((err) => {
  console.error('Error connecting to database:', err);
});