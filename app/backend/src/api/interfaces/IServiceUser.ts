import User from '../../database/models/UserModel';

export default interface IServiceTeam {
  findByEmail(email: string, password: string): Promise<User | null>;
}
