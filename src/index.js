"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const issue_routes_1 = __importDefault(require("./routes/issue.routes"));
const data_source_1 = require("./data-source");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use('/issues', issue_routes_1.default);
data_source_1.AppDataSource.initialize().then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
        console.log('Server started on http://localhost:3000');
    });
}).catch((err) => {
    console.error('Error connecting to database:', err);
});
