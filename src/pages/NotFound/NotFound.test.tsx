import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";

describe("Given a NotFound page", () => {
  describe("When it's rendered", () => {
    test("Then it should show two titles, the first with error 404, the second with page not found", () => {
      render(<NotFound />);

      const find404 = screen.getByText(/error 404/i);
      const findPageNotFound = screen.getByText(/page not found/i);

      expect(find404).toBeInTheDocument();
      expect(findPageNotFound).toBeInTheDocument();
    });
  });
});
