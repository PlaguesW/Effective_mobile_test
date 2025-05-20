import { expect } from 'chai';
import request from 'supertest';
import { AppDataSource } from '../data-source';
import { Issue } from '../entities/Issue';
import app from '../index'; 
describe('API Tests for Issues', () => {
  let createdIssueId: string;

  before(async () => {
    await AppDataSource.initialize();
  });

  after(async () => {
    await AppDataSource.getRepository(Issue).delete({});
    await AppDataSource.destroy();
  });

  it('should create a new issue', async () => {
    const res = await request(app)
      .post('/issues/create')
      .send({
        topic: 'Ошибка оплаты',
        description: 'Не проходит оплата картой'
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    expect(res.body.status).to.equal('new');

    createdIssueId = res.body.id;
  });

  it('should take issue in progress', async () => {
    const res = await request(app)
      .put(`/issues/${createdIssueId}/take`);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('В работе');
  });

  it('should complete an issue', async () => {
    const res = await request(app)
      .put(`/issues/${createdIssueId}/complete`)
      .send({ solution: 'Проблема решена' });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('Завершено');
    expect(res.body.resolutionText).to.equal('Проблема решена');
  });

  it('should cancel an issue', async () => {
    const res = await request(app)
      .put(`/issues/${createdIssueId}/cancel`)
      .send({ reason: 'Отмена пользователем' });

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('Отменено');
    expect(res.body.cancellationReason).to.equal('Отмена пользователем');
  });

  it('should get all issues', async () => {
    const res = await request(app).get('/issues');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.greaterThan(0);
  });

  it('should cancel all in-progress issues', async () => {
    const repo = AppDataSource.getRepository(Issue);
    const issue = repo.create({
      topic: 'Тестовая задача',
      description: 'Для массовой отмены'
    });
    const saved = await repo.save(issue);

    const res = await request(app).put('/issues/cancel-all-in-progress');

    expect(res.status).to.equal(200);
    expect(res.body.message).to.include('обращений отменено');

    const updatedIssue = await repo.findOneBy({ id: saved.id });
    expect(updatedIssue?.status).to.equal('Отменено');
  });
});