import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import IServiceUser from '../interfaces/IServiceUser';
import validateImputs from '../../schemas/user';

const SECRET = 'jwt_secret';

class TeamController {
  private _service: IServiceUser;

  constructor(service: IServiceUser) {
    this._service = service;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const error = validateImputs({ email, password });

    if (error.type) {
      return res.status(error.type).json({ message: error.message });
    }
    const result = await this._service.findByEmail(email, password);

    if (!result) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = sign({ email }, SECRET);
    return res.status(200).json({ token });
  }
}

export default TeamController;
