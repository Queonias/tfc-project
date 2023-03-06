import Matche from '../../database/models/MatcheModel';

export default interface IServiceTeam {
  getAll(query: string): Promise<Matche[]>;
}
