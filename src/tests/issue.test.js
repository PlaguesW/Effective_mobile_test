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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const data_source_1 = require("../data-source");
const Issue_1 = require("../entities/Issue");
const index_1 = __importDefault(require("../index"));
describe('API Tests for Issues', () => {
    let createdIssueId;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize();
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.getRepository(Issue_1.Issue).delete({});
        yield data_source_1.AppDataSource.destroy();
    }));
    it('should create a new issue', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .post('/issues/create')
            .send({
            topic: 'Ошибка оплаты',
            description: 'Не проходит оплата картой'
        });
        (0, chai_1.expect)(res.status).to.equal(201);
        (0, chai_1.expect)(res.body).to.have.property('id');
        (0, chai_1.expect)(res.body.status).to.equal('new');
        createdIssueId = res.body.id;
    }));
    it('should take issue in progress', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/issues/${createdIssueId}/take`);
        (0, chai_1.expect)(res.status).to.equal(200);
        (0, chai_1.expect)(res.body.status).to.equal('В работе');
    }));
    it('should complete an issue', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/issues/${createdIssueId}/complete`)
            .send({ solution: 'Проблема решена' });
        (0, chai_1.expect)(res.status).to.equal(200);
        (0, chai_1.expect)(res.body.status).to.equal('Завершено');
        (0, chai_1.expect)(res.body.resolutionText).to.equal('Проблема решена');
    }));
    it('should cancel an issue', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default)
            .put(`/issues/${createdIssueId}/cancel`)
            .send({ reason: 'Отмена пользователем' });
        (0, chai_1.expect)(res.status).to.equal(200);
        (0, chai_1.expect)(res.body.status).to.equal('Отменено');
        (0, chai_1.expect)(res.body.cancellationReason).to.equal('Отмена пользователем');
    }));
    it('should get all issues', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get('/issues');
        (0, chai_1.expect)(res.status).to.equal(200);
        (0, chai_1.expect)(res.body).to.be.an('array');
        (0, chai_1.expect)(res.body.length).to.greaterThan(0);
    }));
    it('should cancel all in-progress issues', () => __awaiter(void 0, void 0, void 0, function* () {
        const repo = data_source_1.AppDataSource.getRepository(Issue_1.Issue);
        const issue = repo.create({
            topic: 'Тестовая задача',
            description: 'Для массовой отмены'
        });
        const saved = yield repo.save(issue);
        const res = yield (0, supertest_1.default)(index_1.default).put('/issues/cancel-all-in-progress');
        (0, chai_1.expect)(res.status).to.equal(200);
        (0, chai_1.expect)(res.body.message).to.include('обращений отменено');
        const updatedIssue = yield repo.findOneBy({ id: saved.id });
        (0, chai_1.expect)(updatedIssue === null || updatedIssue === void 0 ? void 0 : updatedIssue.status).to.equal('Отменено');
    }));
});
