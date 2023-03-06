import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';
import validateLogin from '../middlewares/validateLogin';

const router = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

router.get('/', ((req: Request, res: Response) => matchesController.getAll(req, res)));
router.patch('/:id/finish', validateLogin, ((req: Request, res: Response) => matchesController
  .finished(req, res)));

export default router;
