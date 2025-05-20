"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Issue_1 = require("./entities/Issue");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'your_user',
    password: process.env.DB_PASSWORD || 'your_pass',
    database: process.env.DB_DATABASE || 'issue_db',
    synchronize: true,
    logging: true,
    entities: [Issue_1.Issue],
});
exports.AppDataSource.initialize().then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.error('Error connecting to database:', err);
});
