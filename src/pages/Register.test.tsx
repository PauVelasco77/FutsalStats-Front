import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { errorHadlers } from "../mocks/handlers";
import { server } from "../mocks/server";
import Register from "./Register";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Given a Register page", () => {
  describe("When it's rendered with a new user", () => {
    test("Then it should call the navigate function", async () => {
      const username = "cristianito";
      const password = "theBest";
      const teamName = "manU";

      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      );

      const inputName = screen.getByRole("textbox", { name: "USERNAME" });
      userEvent.type(inputName, username);

      const inputPassword = screen.getByLabelText("PASSWORD");
      userEvent.type(inputPassword, password);

      const inputTeamName = screen.getByRole("textbox", {
        name: "NOMBRE DEL EQUIPO",
      });
      userEvent.type(inputTeamName, teamName);

      const findButton = screen.getByRole("button");
      userEvent.click(findButton);

      await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
    });
  });

  describe("When it's rendered with a wrong user", () => {
    test("Then it should render the error toaster", async () => {
      server.use(...errorHadlers);
      const username = "cristianito";
      const password = "theBest";
      const teamName = "manU";

      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      );

      const inputName = screen.getByRole("textbox", { name: "USERNAME" });
      userEvent.type(inputName, username);

      const inputPassword = screen.getByLabelText("PASSWORD");
      userEvent.type(inputPassword, password);

      const inputTeamName = screen.getByRole("textbox", {
        name: "NOMBRE DEL EQUIPO",
      });
      userEvent.type(inputTeamName, teamName);

      const findButton = screen.getByRole("button");
      userEvent.click(findButton);

      const findToaster = await screen.findByText(
        "This username already exists"
      );
      expect(findToaster).toBeInTheDocument();
    });
  });
});
