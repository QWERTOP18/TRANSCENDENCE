export class CreateTournamentDto {
  title: string;
  description: string;
  startedAt: Date;
  createdById: number;
}

export class UpdateTournamentDto {
  title?: string;
  description?: string;
  startedAt?: Date;
}

export class AddParticipantDto {
  tournamentId: number;
  userId: number;
}

export class CreateMatchDto {
  tournamentId: number;
  round: number;
  matchNumber: number;
  player1Id: number;
  player2Id: number;
}

export class UpdateMatchResultDto {
  matchId: number;
  winnerId: number;
}
