import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamsService';

const router = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

router.get('/', ((req: Request, res: Response) => teamController.getAll(req, res)));
router.get('/:id', ((req: Request, res: Response) => teamController.getById(req, res)));

export default router;
