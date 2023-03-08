import { Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';

const router = Router();
const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

router.get('/home', ((req: Request, res: Response) => leaderboardController.getAll(req, res)));

export default router;
