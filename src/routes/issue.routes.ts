// src/routes/issue.routes.ts
import { Router } from 'express';
import * as issueController from '../controllers/issue.controller';

const router = Router();

router.post('/create', issueController.create);
router.put('/:id/take', issueController.start);
router.put('/:id/complete', issueController.complete);
router.put('/:id/cancel', issueController.cancel);
router.get('/', issueController.list);
router.put('/cancel-all-in-progress', issueController.cancelInProgress);

export default router;