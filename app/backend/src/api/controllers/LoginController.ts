import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

import IServiceUser from '../interfaces/IServiceUser';
import IToken from '../interfaces/IToken';
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
    const result = await this._service.findByLogin(email, password);

    if (!result) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = sign({ email }, SECRET);
    return res.status(200).json({ token });
  }

  async role(req: Request, res: Response) {
    const token = req.get('Authorization') as string;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const data = verify(token, 'jwt_secret') as IToken;
      if (data.email) {
        const result = await this._service.findByRole(data.email);
        return res.status(200).json({ role: result?.dataValues.role });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default TeamController;
