import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamsService';

const router = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

router.get('/teams', ((req: Request, res: Response) => teamController.getAll(req, res)));
router.get('/teams/:id', ((req: Request, res: Response) => teamController.getById(req, res)));

export default router;
