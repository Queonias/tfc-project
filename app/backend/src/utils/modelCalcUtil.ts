import ILeaderboard from '../api/interfaces/ILeaderboard';
import Matches from '../database/models/MatcheModel';
import Team from '../database/models/TeamModel';

function calcPoints(id: number, listMatches: Matches[]) {
  const totalPoints = listMatches.reduce((acc: number, games) => {
    const { homeTeamId, homeTeamGoals, awayTeamGoals, inProgress } = games.dataValues;
    if (homeTeamId === id && inProgress === false) {
      if (homeTeamGoals > awayTeamGoals) {
        const points = acc + 3;
        return points;
      } if (homeTeamGoals === awayTeamGoals) {
        const points = acc + 1;
        return points;
      }
    }
    return acc;
  }, 0);
  return totalPoints;
}

function calcPointsAway(id: number, listMatches: Matches[]) {
  const totalPoints = listMatches.reduce((acc: number, games) => {
    const { homeTeamGoals, awayTeamGoals, inProgress, awayTeamId } = games.dataValues;
    if (awayTeamId === id && inProgress === false) {
      if (homeTeamGoals < awayTeamGoals) {
        const points = acc + 3;
        return points;
      } if (homeTeamGoals === awayTeamGoals) {
        const points = acc + 1;
        return points;
      }
    }
    return acc;
  }, 0);
  return totalPoints;
}

function calcGames(id: number, listMatches: Matches[]) {
  const totalGames = listMatches.reduce((acc: number, games) => {
    const { homeTeamId, inProgress } = games.dataValues;
    if (homeTeamId === id && inProgress === false) {
      const jg = acc + 1;
      return jg;
    }
    return acc;
  }, 0);
  return totalGames;
}

function calcGamesAway(id: number, listMatches: Matches[]) {
  const totalGames = listMatches.reduce((acc: number, games) => {
    const { awayTeamId, inProgress } = games.dataValues;
    if (awayTeamId === id && inProgress === false) {
      const jg = acc + 1;
      return jg;
    }
    return acc;
  }, 0);
  return totalGames;
}

function calcVictories(id: number, listMatches: Matches[]) {
  const totalVictories = listMatches.reduce((acc: number, games) => {
    const { homeTeamId, inProgress, homeTeamGoals, awayTeamGoals } = games.dataValues;
    if (homeTeamGoals > awayTeamGoals && homeTeamId === id && inProgress === false) {
      const jg = acc + 1;
      return jg;
    }
    return acc;
  }, 0);
  return totalVictories;
}

function calcVictoriesAway(id: number, listMatches: Matches[]) {
  const totalVictories = listMatches.reduce((acc: number, games) => {
    const { awayTeamId, inProgress, homeTeamGoals, awayTeamGoals } = games.dataValues;
    if (homeTeamGoals < awayTeamGoals && awayTeamId === id && inProgress === false) {
      const jg = acc + 1;
      return jg;
    }
    return acc;
  }, 0);
  return totalVictories;
}

function calcDraws(id: number, listMatches: Matches[]) {
  const totalDraws = listMatches.reduce((acc: number, games) => {
    const { homeTeamId, inProgress, homeTeamGoals, awayTeamGoals } = games.dataValues;
    if (homeTeamGoals === awayTeamGoals && homeTeamId === id && inProgress === false) {
      const jg = acc + 1;
      return jg;
    }
    return acc;
  }, 0);
  return totalDraws;
}

function calcDrawsAways(id: number, listMatches: Matches[]) {
  const totalDraws = listMatches.reduce((acc: number, games) => {
    const { awayTeamId, inProgress, homeTeamGoals, awayTeamGoals } = games.dataValues;
    if (homeTeamGoals === awayTeamGoals && awayTeamId === id && inProgress === false) {
      const jg = acc + 1;
      return jg;
    }
    return acc;
  }, 0);
  return totalDraws;
}

function calcLosses(id: number, listMatches: Matches[]) {
  const totalLosses = listMatches.reduce((acc: number, games) => {
    const { homeTeamId, inProgress, homeTeamGoals, awayTeamGoals } = games.dataValues;
    if (homeTeamGoals < awayTeamGoals && homeTeamId === id && inProgress === false) {
      const jg = acc + 1;
      return jg;
    }
    return acc;
  }, 0);
  return totalLosses;
}

function calcLossesAway(id: number, listMatches: Matches[]) {
  const totalLosses = listMatches.reduce((acc: number, games) => {
    const { awayTeamId, inProgress, homeTeamGoals, awayTeamGoals } = games.dataValues;
    if (homeTeamGoals > awayTeamGoals && awayTeamId === id && inProgress === false) {
      const jg = acc + 1;
      return jg;
    }
    return acc;
  }, 0);
  return totalLosses;
}

function calcGoalsFavor(id: number, listMatches: Matches[]) {
  const goalsFavor = listMatches.reduce((acc: number, games) => {
    const { homeTeamId, inProgress, homeTeamGoals } = games.dataValues;
    if (homeTeamId === id && inProgress === false) {
      const goals = acc + homeTeamGoals;
      return goals;
    }
    return acc;
  }, 0);
  return goalsFavor;
}

function calcGoalsFavorAway(id: number, listMatches: Matches[]) {
  const goalsFavor = listMatches.reduce((acc: number, games) => {
    const { awayTeamId, inProgress, awayTeamGoals } = games.dataValues;
    if (awayTeamId === id && inProgress === false) {
      const goals = acc + awayTeamGoals;
      return goals;
    }
    return acc;
  }, 0);
  return goalsFavor;
}

function calcGoalsOwn(id: number, listMatches: Matches[]) {
  const goalsOwn = listMatches.reduce((acc: number, games) => {
    const { homeTeamId, inProgress, awayTeamGoals } = games.dataValues;
    if (homeTeamId === id && inProgress === false) {
      const goals = acc + awayTeamGoals;
      return goals;
    }
    return acc;
  }, 0);
  return goalsOwn;
}

function calcGoalsOwnAway(id: number, listMatches: Matches[]) {
  const goalsOwn = listMatches.reduce((acc: number, games) => {
    const { awayTeamId, inProgress, homeTeamGoals } = games.dataValues;
    if (awayTeamId === id && inProgress === false) {
      return acc + homeTeamGoals;
    }
    return acc;
  }, 0);
  return goalsOwn;
}

function calcGoalsBalance(id: number, listMatches: Matches[]) {
  const goalsBalance = calcGoalsFavor(id, listMatches) - calcGoalsOwn(id, listMatches);
  return goalsBalance;
}

function calcGoalsBalanceAway(id: number, listMatches: Matches[]) {
  const goalsBalance = calcGoalsFavorAway(id, listMatches) - calcGoalsOwnAway(id, listMatches);
  return goalsBalance;
}

function calcEfficiency(id: number, listMatches: Matches[]) {
  const efficiency = (calcPoints(id, listMatches) / (calcGames(id, listMatches) * 3)) * 100;
  return parseFloat(efficiency.toFixed(2));
}

function calcEfficiencyAway(id: number, listMatches: Matches[]) {
  const efficiency = (calcPointsAway(id, listMatches) / (calcGamesAway(id, listMatches) * 3)) * 100;
  return parseFloat(efficiency.toFixed(2));
}

export function calcLeaderboard(team: Team[], matches: Matches[]) {
  const leaderboard = team.reduce((acc: ILeaderboard[], time) => {
    const { id, teamName } = time.dataValues;
    acc.push({
      name: teamName,
      totalPoints: calcPoints(id, matches),
      totalGames: calcGames(id, matches),
      totalVictories: calcVictories(id, matches),
      totalDraws: calcDraws(id, matches),
      totalLosses: calcLosses(id, matches),
      goalsFavor: calcGoalsFavor(id, matches),
      goalsOwn: calcGoalsOwn(id, matches),
      goalsBalance: calcGoalsBalance(id, matches),
      efficiency: calcEfficiency(id, matches),
    });
    return acc;
  }, []);

  return leaderboard;
}

export function calcLeaderboardAway(team: Team[], matches: Matches[]) {
  const leaderboard = team.reduce((acc: ILeaderboard[], time) => {
    const { id, teamName } = time.dataValues;
    acc.push({
      name: teamName,
      totalPoints: calcPointsAway(id, matches),
      totalGames: calcGamesAway(id, matches),
      totalVictories: calcVictoriesAway(id, matches),
      totalDraws: calcDrawsAways(id, matches),
      totalLosses: calcLossesAway(id, matches),
      goalsFavor: calcGoalsFavorAway(id, matches),
      goalsOwn: calcGoalsOwnAway(id, matches),
      goalsBalance: calcGoalsBalanceAway(id, matches),
      efficiency: calcEfficiencyAway(id, matches),
    });
    return acc;
  }, []);

  return leaderboard;
}
