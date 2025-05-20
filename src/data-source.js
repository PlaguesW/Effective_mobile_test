"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Issue_1 = require("./entities/Issue");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'your_user',
    password: 'your_password',
    database: 'your_db',
    synchronize: true,
    logging: false,
    entities: [Issue_1.Issue],
});
