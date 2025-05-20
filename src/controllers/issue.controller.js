"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.cancelInProgress = exports.list = exports.cancel = exports.complete = exports.start = exports.create = void 0;
const issueService = __importStar(require("../services/issue.service"));
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
