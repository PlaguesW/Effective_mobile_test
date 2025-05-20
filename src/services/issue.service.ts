import { AppDataSource } from '../data-source';
import { Issue } from '../entities/Issue';
import { Between } from 'typeorm';

const repo = AppDataSource.getRepository(Issue);

export const createIssue = (topic: string, description: string) => {
  const issue = repo.create({ topic, description });
  return repo.save(issue);
};

export const startIssue = (id: number) => repo.update(id, { status: 'in_progress' });

export const completeIssue = (id: number, resolutionText: string) =>
  repo.update(id, { status: 'done', resolutionText });

export const cancelIssue = (id: number, reason: string) =>
  repo.update(id, { status: 'cancelled', cancellationReason: reason });

export const getIssues = (from?: string, to?: string) => {
  if (from && to) {
    return repo.find({
      where: { createdAt: Between(new Date(from), new Date(to)) },
      order: { createdAt: 'DESC' },
    });
  } else if (from) {
    return repo.find({
      where: { createdAt: new Date(from) },
      order: { createdAt: 'DESC' },
    });
  } else {
    return repo.find({ order: { createdAt: 'DESC' } });
  }
};

export const cancelAllInProgress = () =>
  repo
    .createQueryBuilder()
    .update(Issue)
    .set({ status: 'cancelled', cancellationReason: 'Auto-cancelled' })
    .where("status = :status", { status: 'in_progress' })
    .execute();