import { LoadUserAction } from "../../Interfaces/LoadUserActionInterface";
import { LoadPlayersAction } from "../../Interfaces/LoadPlayersActionInterface";
import { Player } from "../../Interfaces/PlayerInterface";
import { User } from "../../Interfaces/UserInterface";
import actionsTypes from "./actionsTypes";
import { DeletePlayerAction } from "../../Interfaces/DeletePlayerActionInterface";
import { CreatePlayerAction } from "../../Interfaces/CreataePlayerActionInterface";
import { UpdatePlayerAction } from "../../Interfaces/UpdatePlayerActionInterface";
import { FilterPlayerAction } from "../../Interfaces/FilterPlayerActionInterface";

export const loadUserAction = (user: User): LoadUserAction => ({
  type: actionsTypes.loadUser,
  user,
});

export const loadPlayersAction = (players: Player[]): LoadPlayersAction => ({
  type: actionsTypes.loadPlayers,
  players,
});

export const deletePlayerAction = (id: string): DeletePlayerAction => ({
  type: actionsTypes.deletePlayer,
  id,
});

export const createPlayerAction = (player: Player): CreatePlayerAction => ({
  type: actionsTypes.createPlayer,
  player,
});

export const updatePlayerAction = (player: Player): UpdatePlayerAction => ({
  type: actionsTypes.updatePlayer,
  player,
});

export const filterPlayersAction = (
  position: string,
  players: Player[]
): FilterPlayerAction => ({
  type: actionsTypes.filterPlayers,
  position,
  players,
});
