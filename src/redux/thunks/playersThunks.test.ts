import { deletePlayerThunk, loadPlayersThunk } from "./playersThunk";

describe("Given a loadPlayersThunk function", () => {
  describe("When it's called", () => {
    test("Then it should dispatch an loadUser action", async () => {
      const dispatch = jest.fn();
      const action = {
        type: "load-players",
        players: [
          {
            name: "Cristiano",
            number: 7,
            goals: 21,
            assists: 3,
            yellowCards: 4,
            redCards: 1,
            totalMatches: 21,
            position: "Alero",
            photo:
              "https://img.uefa.com/imgml/TP/players/1/2022/324x324/63706.jpg?imwidth=36",
            id: "1",
          },
          {
            name: "Cristiano",
            number: 7,
            goals: 21,
            assists: 3,
            yellowCards: 4,
            redCards: 1,
            totalMatches: 21,
            position: "Alero",
            photo:
              "https://img.uefa.com/imgml/TP/players/1/2022/324x324/63706.jpg?imwidth=36",
            id: "2",
          },
        ],
      };

      const players = loadPlayersThunk();
      await players(dispatch);

      expect(dispatch).toHaveBeenCalledWith(action);
    });
  });
});

describe("Given a deletePlayer thunk", () => {
  describe("When it's called with a player id", () => {
    test("Then it should call the dispatch with an action", async () => {
      const dispatch = jest.fn();
      const action = {
        type: "delete-player",
        id: "1",
      };

      const deletedPlayer = deletePlayerThunk(action.id);
      await deletedPlayer(dispatch);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe("When it's called with a bad req", () => {
    test("Then it shouldn't call the dispatch with an action", async () => {
      const dispatch = jest.fn();

      const deletedPlayer = deletePlayerThunk("234");
      await deletedPlayer(dispatch);

      expect(dispatch).not.toHaveBeenCalled();
    });
  });
});
