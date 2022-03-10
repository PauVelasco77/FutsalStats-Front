import { Player } from "../../Interfaces/PlayerInterface";
import { User } from "../../Interfaces/UserInterface";
import { loadPlayersAction, loadUserAction } from "./actionsCreator";

describe("Given a load user action", () => {
  describe("When it receives a user", () => {
    test("Then it should return an action type loadUser", () => {
      const user: User = {
        username: "pau",
        password:
          "$2b$10$jWXZKWhzU3CqtNXfah4LNuc0p/tA.WnwuCaFYlTVMgkzS399zLxoq",
        teamName: "pau",
        players: ["6229c27236ee9c9c2b458879", "6229c27736ee9c9c2b45887e"],
        id: "622719062b2a023745861d52",
      };

      const expectedAction = {
        type: "load-user",
        user,
      };

      const action = loadUserAction(user);

      expect(action).toEqual(expectedAction);
    });
  });
});

describe("Given a load players action", () => {
  describe("When it receives a list of players", () => {
    test("Then it should return an action with type loadPlayers and the list of players", () => {
      const players: Player[] = [
        {
          name: "Cristiano",
          number: 7,
          goals: 12,
          assists: 4,
          yellowCards: 4,
          redCards: 0,
          totalMatches: 21,
          position: "Alero",
          photo: "photo.jpg",
          id: "1",
        },
        {
          name: "Messi",
          number: 7,
          goals: 12,
          assists: 4,
          yellowCards: 4,
          redCards: 0,
          totalMatches: 21,
          position: "Alero",
          photo: "photo.jpg",
          id: "1",
        },
      ];

      const expectedAction = {
        type: "load-players",
        players,
      };

      const action = loadPlayersAction(players);

      expect(action).toEqual(expectedAction);
    });
  });
});