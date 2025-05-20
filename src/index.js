"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const data_source_1 = require("./data-source");
const issue_routes_1 = __importDefault(require("./routes/issue.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/issues', issue_routes_1.default);
data_source_1.AppDataSource.initialize().then(() => {
    app.listen(3000, () => {
        console.log('Server started on http://localhost:3000');
    });
});
