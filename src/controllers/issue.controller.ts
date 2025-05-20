// src/controllers/issue.controller.ts
import { Request, Response } from 'express';
import { issueService } from '../services/issue.service';

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
  await issueService.updateIssue(id, 'in_progress');
  res.sendStatus(200);
};

export const complete = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { resolutionText } = req.body;
  if (!resolutionText) {
    return res.status(400).json({ error: 'Resolution text is required' });
  }

  await issueService.updateIssue(id, 'done', resolutionText);
  res.sendStatus(200);
};

export const cancel = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { reason } = req.body;
  if (!reason) {
    return res.status(400).json({ error: 'Cancellation reason is required' });
  }

  await issueService.updateIssue(id, 'cancelled', reason);
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