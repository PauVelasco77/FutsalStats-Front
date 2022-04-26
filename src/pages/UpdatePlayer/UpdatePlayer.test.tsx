import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import React, { BrowserRouter } from "react-router-dom";
import store from "../../redux/store";
import UpdatePlayer from "./UpdatePlayer";
import { errorHadlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";

const state = {
  players: [
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
  ],
};

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => state.players,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
}));


describe("Given a UpdatePlayer page", () => {
  describe("When it's rendered", () => {
    test("Then it should render a header with 'edita un jugador de tu equipo'", () => {
      const expectedTitle = "edita un jugador de tu equipo";
      React.useParams = jest.fn().mockReturnValue({ id: "1" }),


      render(
        <BrowserRouter>
          <Provider store={store}>
            <UpdatePlayer />
          </Provider>
        </BrowserRouter>
      );

      const findTitle = screen.getByText(expectedTitle);

      expect(findTitle).toBeInTheDocument();
    });
  });

  describe("When it's rendered with a title, and nine inputs", () => {
    test("Then it should a title", () => {
      React.useParams = jest.fn().mockReturnValue({ id: "1" })

      const title = "edita un jugador de tu equipo";
      const nameInput = /nombre del jugador/i;
      const numberInput = /dorsal/i;
      const goalsInput = /goles/i;
      const assistsInput = /assists/i;
      const amarillInput = /amaril/i;
      const rojInput = /rojas/i;
      const jugadosInput = /p. jugados/i;
      const posicionInput = /posición/i;

      render(
        <BrowserRouter>
          <Provider store={store}>
            <UpdatePlayer />
          </Provider>
        </BrowserRouter>
      );

      const findTitle = screen.getByText(title);
      const findName = screen.getByLabelText(nameInput);
      const findNumber = screen.getByLabelText(numberInput);
      const findGoals = screen.getByLabelText(goalsInput);
      const findAssists = screen.getByLabelText(assistsInput);
      const findAmarill = screen.getByLabelText(amarillInput);
      const findRoj = screen.getByLabelText(rojInput);
      const findJugados = screen.getByLabelText(jugadosInput);
      const findPosicion = screen.getByLabelText(posicionInput);

      expect(findTitle).toBeInTheDocument();
      expect(findName).toBeInTheDocument();
      expect(findNumber).toBeInTheDocument();
      expect(findGoals).toBeInTheDocument();
      expect(findAssists).toBeInTheDocument();
      expect(findAmarill).toBeInTheDocument();
      expect(findRoj).toBeInTheDocument();
      expect(findJugados).toBeInTheDocument();
      expect(findPosicion).toBeInTheDocument();
    });
  });

  describe("When it's rendered with a new player and the user click on submit", () => {
    test("Then it should reset the form and show the created player toast", async () => {
      React.useParams = jest.fn().mockReturnValue({ id: "1" })

      const numberTest = "1";
      const nameTest = "Cristiano";
      const positionTest = "cierre";
      const file = new File(["hello"], "hello.png", { type: "image/png" });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <UpdatePlayer />
          </BrowserRouter>
        </Provider>
      );

      const inputsNumber = screen.getAllByRole("spinbutton");
      inputsNumber.forEach((input) => userEvent.type(input, numberTest));

      const inputName = screen.getByRole("textbox");
      userEvent.clear(inputName);
      userEvent.type(inputName, nameTest);

      const selectPosition = screen.getByRole("combobox");
      userEvent.selectOptions(selectPosition, positionTest);

      const addFile = screen.getByLabelText("FOTO");
      userEvent.upload(addFile, file);

      const submitButton = screen.getByRole("button");
      userEvent.click(submitButton);

      expect(selectPosition).toHaveValue("");
      expect(inputName).toHaveValue("");
      expect(submitButton).toBeDisabled();

      const findToast = await screen.findByText(`Player ${nameTest} updated`);
      expect(findToast).toBeInTheDocument();
    });
  });
});

describe("Given a UpdatePlayer page", () => {
  describe("Whden it's rendered and the API return an error", () => {
    test("Then it should render an empty page", async () => {
      React.useParams = jest.fn().mockReturnValue({ id: "" })
      server.use(...errorHadlers);

      render(
        <Provider store={store}>
          <BrowserRouter>
            <UpdatePlayer />
          </BrowserRouter>
        </Provider>
      );
    });
  });
});

