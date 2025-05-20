"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelInProgress = exports.list = exports.cancel = exports.complete = exports.start = exports.create = exports.createIssue = void 0;
const typeorm_1 = require("typeorm");
const Issue_1 = require("../entities/Issue");
const createIssue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { topic, description } = req.body;
    const repo = (0, typeorm_1.getRepository)(Issue_1.Issue);
    const issue = repo.create({ topic, description });
    yield repo.save(issue);
    return res.status(201).json(issue);
});
exports.createIssue = createIssue;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { topic, description } = req.body;
    if (!topic || !description) {
        return res.status(400).json({ error: 'Topic and description are required' });
    }
    const issue = yield issueService.createIssue(topic, description);
    res.status(201).json(issue);
});
exports.create = create;
const start = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    yield issueService.startIssue(id);
    res.sendStatus(200);
});
exports.start = start;
const complete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { resolutionText } = req.body;
    if (!resolutionText) {
        return res.status(400).json({ error: 'Resolution text is required' });
    }
    yield issueService.completeIssue(id, resolutionText);
    res.sendStatus(200);
});
exports.complete = complete;
const cancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { reason } = req.body;
    if (!reason) {
        return res.status(400).json({ error: 'Cancellation reason is required' });
    }
    yield issueService.cancelIssue(id, reason);
    res.sendStatus(200);
});
exports.cancel = cancel;
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to } = req.query;
    const issues = yield issueService.getIssues(from, to);
    res.json(issues);
});
exports.list = list;
const cancelInProgress = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield issueService.cancelAllInProgress();
    res.sendStatus(200);
});
exports.cancelInProgress = cancelInProgress;
