import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';
import validateLogin from '../middlewares/validateLogin';

const router = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

router.get('/', ((req: Request, res: Response) => matchesController.getAll(req, res)));
router.post('/', validateLogin, ((req: Request, res: Response) => matchesController
  .create(req, res)));
router.patch('/:id/finish', validateLogin, ((req: Request, res: Response) => matchesController
  .finished(req, res)));
router.patch('/:id', validateLogin, ((req: Request, res: Response) => matchesController
  .update(req, res)));

export default router;
