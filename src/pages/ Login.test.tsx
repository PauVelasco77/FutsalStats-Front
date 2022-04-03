import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { errorHadlers } from "../mocks/handlers";
import { server } from "../mocks/server";
import Login from "./Login";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Given a Login page", () => {
  describe("When it's rendered with an user", () => {
    test("Then it should render two inputs text", async () => {
      const username = "cristianito";
      const password = "theBest";

      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );

      const inputName = screen.getByRole("textbox", { name: "USERNAME" });
      userEvent.type(inputName, username);

      const inputPassword = screen.getByLabelText("PASSWORD");
      userEvent.type(inputPassword, password);

      const findButton = screen.getByRole("button");
      userEvent.click(findButton);

      await waitFor(() => expect(mockNavigate).toHaveBeenCalled());
    });
  });

  describe("When it's rendered with wrong user", () => {
    test("Then it should render two inputs text", async () => {
      server.use(...errorHadlers);

      const username = "cristianito";
      const password = "theBest";

      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );

      const inputName = screen.getByRole("textbox", { name: "USERNAME" });
      userEvent.type(inputName, username);

      const inputPassword = screen.getByLabelText("PASSWORD");
      userEvent.type(inputPassword, password);

      const findButton = screen.getByRole("button");
      userEvent.click(findButton);

      const toaster = await screen.findByText(/wrong username or password/i);

      expect(toaster).toBeInTheDocument();
    });
  });
});
