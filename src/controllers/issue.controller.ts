import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Issue } from '../entities/Issue';

export const createIssue = async (req: Request, res: Response) => {
  const { topic, description } = req.body;
  const repo = getRepository(Issue);
  const issue = repo.create({ topic, description });
  await repo.save(issue);
  return res.status(201).json(issue);
};

export const create = async (req: Request, res: Response) => {
  const { topic, description } = req.body;
  if (!topic || !description) {
    return res.status(400).json({ error: 'Topic and description are required' });
  }

  const issue = await issueService.createIssue(topic, description);
  res.status(201).json(issue);
};

export const start = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await issueService.startIssue(id);
  res.sendStatus(200);
};

export const complete = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { resolutionText } = req.body;
  if (!resolutionText) {
    return res.status(400).json({ error: 'Resolution text is required' });
  }

  await issueService.completeIssue(id, resolutionText);
  res.sendStatus(200);
};

export const cancel = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { reason } = req.body;
  if (!reason) {
    return res.status(400).json({ error: 'Cancellation reason is required' });
  }

  await issueService.cancelIssue(id, reason);
  res.sendStatus(200);
};

export const list = async (req: Request, res: Response) => {
  const { from, to } = req.query;
  const issues = await issueService.getIssues(from as string, to as string);
  res.json(issues);
};

export const cancelInProgress = async (_req: Request, res: Response) => {
  await issueService.cancelAllInProgress();
  res.sendStatus(200);
};