import {
  generateRandomPlayer,
  generateRandomPlayers,
} from "../../mocks/playerFactory";
import playersReducer from "./playersReducer";

describe("Given a playersReducer reducer", () => {
  describe("When it receives a list of players in the action with type loadPlayers", () => {
    test("Then it should return the list of players in the action", () => {
      const initialPlayers = generateRandomPlayers(3);
      const expectedPlayers = [...initialPlayers, generateRandomPlayer()];

      const action = {
        type: "load-players",
        players: expectedPlayers,
      };

      const newPlayers = playersReducer(initialPlayers, action);

      expect(newPlayers).toEqual(expectedPlayers);
    });
  });

  describe("When it doesn't receives any playres and action", () => {
    test("Then it should return the initialPlayers array", () => {
      const newPlayers = playersReducer();

      expect(newPlayers).toEqual([]);
    });
  });

  describe("When it receives a list of players and a delete-player action with a player id", () => {
    test("Then it should delete the player with the id from the list of players", () => {
      const players = generateRandomPlayers(3);
      const deleteAction = {
        type: "delete-player",
        id: players[1].id,
      };

      const newPlayers = playersReducer(players, deleteAction);

      expect(newPlayers).toHaveLength(players.length - 1);
    });
  });

  describe("When it receives a list of players and an action with create-player type and the new player", () => {
    test("Then it should add the player to the list of players", () => {
      const players = generateRandomPlayers(3);
      const player = generateRandomPlayer();

      const createAction = {
        type: "create-player",
        player,
      };

      const newPlayers = playersReducer(players, createAction);

      expect(newPlayers).toHaveLength(players.length + 1);
    });
  });
});
