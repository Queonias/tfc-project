import { ModelStatic } from 'sequelize';
import { compareSync } from 'bcryptjs';
import User from '../../database/models/UserModel';
import IUserTeam from '../interfaces/IServiceUser';

export default class UserService implements IUserTeam {
  protected model: ModelStatic<User> = User;

  async findByLogin(email: string, password: string): Promise<User | null> {
    const result = await this.model.findOne({ where: { email } });
    if (result) {
      const isMatch = compareSync(password, result?.dataValues.password);
      if (!isMatch) {
        return null;
      }
    }
    return result;
  }

  async findByRole(email: string): Promise<User | null> {
    const result = await this.model.findOne({ where: { email } });
    return result;
  }
}
