import { ModelStatic } from 'sequelize';
import User from '../../database/models/UserModel';
import IUserTeam from '../interfaces/IServiceUser';

export default class UserService implements IUserTeam {
  protected model: ModelStatic<User> = User;

  findByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ where: { email } });
  }
}
