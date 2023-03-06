import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';

const router = Router();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

router.post('/', ((req: Request, res: Response) => loginController.login(req, res)));
router.get('/role', ((req: Request, res: Response) => loginController.role(req, res)));

export default router;
