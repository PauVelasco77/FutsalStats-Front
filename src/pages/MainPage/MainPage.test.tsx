import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../redux/store";
import MainPage from "./MainPage";

const mockLocalStorage = {
  getItem: () =>
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicGVwZSIsInVzZXJuYW1lIjoicGVwZSIsImlkIjoiNjIzMzFkZjQ3NDMzMGZiZDI4ZDU5NWUxIiwiaWF0IjoxNjQ3NTE3Mjg4fQ.suBLCba7CxFLfXRDudmvdL1uRzVFGAlnWxkOngW0i1A",
};
Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

describe("Given a MainPage page", () => {
  describe("When it's rendered", () => {
    test("Then it should display a list of players", async () => {
      const renderedPlayers = [
        {
          name: "Cristiano",
          number: 7,
          goals: 21,
          assists: 3,
          yellowCards: 4,
          redCards: 9,
          totalMatches: 21,
          position: "Alero",
          photo:
            "https://img.uefa.com/imgml/TP/players/1/2022/324x324/63706.jpg?imwidth=36",
          id: "1",
        },
        {
          name: "Messi",
          number: 10,
          goals: 43,
          assists: 2,
          yellowCards: 6,
          redCards: 1,
          totalMatches: 24,
          position: "Cierre",
          photo:
            "https://img.uefa.com/imgml/TP/players/1/2022/324x324/63706.jpg?imwidth=36",
          id: "2",
        },
      ];

      render(
        <BrowserRouter>
          <Provider store={store}>
            <MainPage />
          </Provider>
        </BrowserRouter>
      );

      const findCristianoName = await screen.findByText(
        renderedPlayers[0].name
      );
      const findCristianoNumber = await screen.findByText(
        `DORSAL: ${renderedPlayers[0].number}`
      );
      const findMessiName = await screen.findByText(renderedPlayers[1].name);
      const findMessiGoals = await screen.findByText(
        `GOLES: ${renderedPlayers[0].goals}`
      );

      expect(findCristianoName).toBeInTheDocument();
      expect(findMessiName).toBeInTheDocument();
      expect(findCristianoNumber).toBeInTheDocument();
      expect(findMessiGoals).toBeInTheDocument();
    });
  });

  describe("When the user click in the first player trash icon", () => {
    test("Then it should delete the card", async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <MainPage />
          </Provider>
        </BrowserRouter>
      );

      const findCristiano = await screen.findByText(/cristiano/i);
      const findTrashButton = await screen.findAllByRole("img", {
        name: "trash",
      });
      userEvent.click(findTrashButton[0]);
      await waitForElementToBeRemoved(findCristiano);

      expect(findCristiano).not.toBeInTheDocument();
    });
  });

  describe("When the user click the 'VER MAS' button", () => {
    test("Then it should remove the button from the screen", async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <MainPage />
          </Provider>
        </BrowserRouter>
      );

      const findVerMas = await screen.findByRole("button", { name: "VER MÁS" });
      userEvent.click(findVerMas);
      userEvent.click(findVerMas);

      expect(findVerMas).not.toBeInTheDocument();
    });
  });

  describe("When the user click the 'VER MAS' button for two times and delete the first player", () => {
    test("Then it should show a toast with the message 'Player Cristiano deleted'", async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <MainPage />
          </Provider>
        </BrowserRouter>
      );
      const findCristiano = screen.getByText(/Player Cristiano deleted/i);

      const findVerMas = await screen.findByRole("button", {
        name: "VER MÁS",
      });
      userEvent.click(findVerMas);

      const findVerMas2 = await screen.findByRole("button", {
        name: "VER MÁS",
      });
      userEvent.click(findVerMas2);

      const findDelete = await screen.findAllByRole("img", { name: "trash" });
      userEvent.click(findDelete[0]);

      expect(findCristiano).toBeInTheDocument();
    });
  });
});
