export default interface IMatches {
  id?: number;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IResponseMatches {
  type: number,
  message: IMatches | string,
}
