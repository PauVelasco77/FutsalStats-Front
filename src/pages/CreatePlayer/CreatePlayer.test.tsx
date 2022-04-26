import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { errorHadlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";
import store from "../../redux/store";
import CreatePlayer from "./CreatePlayer";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockLocalStorage = {
  getItem: () => "fakeToken",
};
Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

describe("Given a CreatePlayer page", () => {
  describe("When it's rendered", () => {
    test("Then it should render a header with 'añade un nuevo jugador a tu equipo'", () => {
      const expectedTitle = "añade un nuevo jugador a tu equipo";

      render(
        <BrowserRouter>
          <Provider store={store}>
            <CreatePlayer />
          </Provider>
        </BrowserRouter>
      );

      const findTitle = screen.getByText(expectedTitle);

      expect(findTitle).toBeInTheDocument();
    });
  });

  describe("When it's rendered with a title, and nine inputs", () => {
    test("Then it should a title", () => {
      const title = "añade un nuevo jugador a tu equipo";
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
            <CreatePlayer />
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
      const numberTest = "1";
      const nameTest = "Cristiano";
      const positionTest = "cierre";
      const file = new File(["hello"], "hello.png", { type: "image/png" });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreatePlayer />
          </BrowserRouter>
        </Provider>
      );

      const inputsNumber = screen.getAllByRole("spinbutton");
      inputsNumber.forEach((input) => userEvent.type(input, numberTest));

      const inputName = screen.getByRole("textbox");
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

      const findToast = await screen.findByText(`Player ${nameTest} created`);
      expect(findToast).toBeInTheDocument();
    });
  });

  describe("When it's rendered with a new player and the user click on submidt", () => {
    test("Then it should reset the form and show the created player toast", async () => {
      server.use(...errorHadlers);

      const numberTest = "1";
      const nameTest = "Cristiano";
      const positionTest = "cierre";
      const file = new File(["hello"], "hello.png", { type: "image/png" });

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreatePlayer />
          </BrowserRouter>
        </Provider>
      );

      const inputsNumber = screen.getAllByRole("spinbutton");
      inputsNumber.forEach((input) => userEvent.type(input, numberTest));

      const inputName = screen.getByRole("textbox");
      userEvent.type(inputName, nameTest);

      const selectPosition = screen.getByRole("combobox");
      userEvent.selectOptions(selectPosition, positionTest);

      const addFile = screen.getByLabelText("FOTO");
      userEvent.upload(addFile, file);

      const submitButton = screen.getByRole("button", { name: "CREAR" });
      userEvent.click(submitButton);

      expect(selectPosition).toHaveValue("");
      expect(inputName).toHaveValue("");
      expect(submitButton).toBeDisabled();

      const findToast = await screen.findByText(
        `Can't create ${nameTest} player`
      );
      expect(findToast).toBeInTheDocument();
    });
  });
});
