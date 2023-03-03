import { Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamsService';

const teamRoutes = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRoutes.get('/teams', ((req: Request, res: Response) => teamController.getAll(req, res)));

export default teamRoutes;
