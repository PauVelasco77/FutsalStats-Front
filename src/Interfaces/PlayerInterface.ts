export interface Player {
  name: string;
  number: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  totalMatches: number;
  position: string;
  photo: string;
  id?: string;
}

export interface CreatedPlayer {
  name: string;
  number: string;
  goals: string;
  assists: string;
  yellowCards: string;
  redCards: string;
  totalMatches: string;
  position: string;
  photo: string;
}
