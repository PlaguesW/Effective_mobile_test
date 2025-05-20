import { Router } from 'express';
import * as issueController from '../controllers/issue.controller';

const router = Router();

router.post('/create', issueController.createIssue);
router.put('/:id/take', issueController.takeInWork);
router.put('/:id/complete', issueController.completeIssue);
router.put('/:id/cancel', issueController.cancelIssue);
router.get('/', issueController.getAllIssues);
router.put('/cancel-all-in-progress', issueController.cancelAllInProgress);

export default router;