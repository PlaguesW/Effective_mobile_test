"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAllInProgress = exports.getIssues = exports.cancelIssue = exports.completeIssue = exports.startIssue = exports.createIssue = void 0;
const data_source_1 = require("../data-source");
const Issue_1 = require("../entities/Issue");
const typeorm_1 = require("typeorm");
const repo = data_source_1.AppDataSource.getRepository(Issue_1.Issue);
const createIssue = (topic, description) => {
    const issue = repo.create({ topic, description });
    return repo.save(issue);
};
exports.createIssue = createIssue;
const startIssue = (id) => repo.update(id, { status: 'in_progress' });
exports.startIssue = startIssue;
const completeIssue = (id, resolutionText) => repo.update(id, { status: 'done', resolutionText });
exports.completeIssue = completeIssue;
const cancelIssue = (id, reason) => repo.update(id, { status: 'cancelled', cancellationReason: reason });
exports.cancelIssue = cancelIssue;
const getIssues = (from, to) => {
    if (from && to) {
        return repo.find({
            where: { createdAt: (0, typeorm_1.Between)(new Date(from), new Date(to)) },
            order: { createdAt: 'DESC' },
        });
    }
    else if (from) {
        return repo.find({
            where: { createdAt: new Date(from) },
            order: { createdAt: 'DESC' },
        });
    }
    else {
        return repo.find({ order: { createdAt: 'DESC' } });
    }
};
exports.getIssues = getIssues;
const cancelAllInProgress = () => repo
    .createQueryBuilder()
    .update(Issue_1.Issue)
    .set({ status: 'cancelled', cancellationReason: 'Auto-cancelled' })
    .where("status = :status", { status: 'in_progress' })
    .execute();
exports.cancelAllInProgress = cancelAllInProgress;
