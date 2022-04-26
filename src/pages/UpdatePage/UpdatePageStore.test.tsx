import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { errorHadlers } from "../../mocks/handlers";
import { server } from "../../mocks/server";
import store from "../../redux/store";
import UpdatePlayer from "./UpdatePlayer";

describe("Given a UpdatePlayer page", () => {
  describe("Whden it's rendered and the API return an error", () => {
    test("Then it should render an empty page", async () => {
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
