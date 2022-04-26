import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../redux/store";
import CreatePlayer from "./CreatePlayer";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Given a createPlayer page", () => {
  describe("When it's rendered without token on the localStorage", () => {
    const mockLocalStorage = {
      getItem: () => undefined,
    };
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
    test("Then it should call the navigate", () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <CreatePlayer />
          </BrowserRouter>
        </Provider>
      );

      expect(mockNavigate).toHaveBeenCalled();
    });
  });
});
