import User from '../../database/models/UserModel';

export default interface IServiceTeam {
  findByLogin(email: string, password: string): Promise<User | null>;
  findByRole(email: string): Promise<User | null>;
}
