import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';

const router = Router();
const matchesService = new MatchesService();
const loginController = new MatchesController(matchesService);

router.get('/', ((req: Request, res: Response) => loginController.getAll(req, res)));

export default router;
