import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import IServiceUser from '../interfaces/IServiceUser';
import validateImputs from '../../schemas/user';

class TeamController {
  private _service: IServiceUser;

  constructor(service: IServiceUser) {
    this._service = service;
  }

  async getByEmail(req: Request, res: Response) {
    const { email, password } = req.body;
    const error = validateImputs({ email, password });
    if (error.type) {
      return res.status(400).json({ message: error.message });
    }
    const result = await this._service.findByEmail(email);
    if (result) console.log(result);
    const SECRET = 'jwt_secret';
    const token = sign({ email }, SECRET);
    return res.status(200).json({ token });
  }
}

export default TeamController;
