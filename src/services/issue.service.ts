import { AppDataSource } from '../data-source';
import { Issue } from '../entities/Issue';
import { Between } from 'typeorm';

const repo = AppDataSource.getRepository(Issue);

export const issueService = {
  createIssue,
  updateIssue,
  getIssues,
  cancelAllInProgress
};

function createIssue(topic: string, description: string): Promise<Issue> {
  const issue = repo.create({ topic, description });
  return repo.save(issue);
}

function updateIssue(id: number, status: string, reason?: string) {
  return repo.update(id, { status, cancellationReason: reason });
}

function getIssues(from?: string, to?: string) {
  if (from && to) {
    return repo.find({
      where: { createdAt: Between(new Date(from), new Date(to)) },
      order: { createdAt: 'DESC' }
    });
  } else if (from) {
    return repo.find({
      where: { createdAt: new Date(from) },
      order: { createdAt: 'DESC' }
    });
  } else {
    return repo.find({ order: { createdAt: 'DESC' } });
  }
}

function cancelAllInProgress() {
  return repo
    .createQueryBuilder()
    .update(Issue)
    .set({ status: 'cancelled', cancellationReason: 'Auto-cancelled' })
    .where("status = :status", { status: 'in_progress' })
    .execute();
}