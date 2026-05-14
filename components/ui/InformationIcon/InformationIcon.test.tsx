import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { InformationIcon } from "./InformationIcon";
import { InformationPageKey } from "@/types/information";

jest.mock("@/data/information/InformationContent", () => ({
  InformationContentObject: {
    splash: {
      title: "Splash Page",
      imageSrc: "/information_images/splash.png",
      content: "This is test information content.",
    },
  },
}));

jest.mock("../ModalBase/ModalBase", () => ({
  ModalBase: ({
    isOpen,
    children,
  }: {
    isOpen: boolean;
    children: React.ReactNode;
  }) => (isOpen ? <div data-testid="modal-base">{children}</div> : null),
}));

/*
 * Story: Player views information about a game screen
 * In order to learn about the game mechanics,
 * a player wants to click an information icon to open a modal with relevant content.
 *
 * Scenario: Information icon renders when content exists for the page key
 *   Given a valid page key with content
 *   When the InformationIcon renders
 *   Then the information icon button should be visible
 *
 * Scenario: Information icon renders nothing when no content exists for the key
 *   Given an invalid page key with no content
 *   When the InformationIcon renders
 *   Then nothing should be rendered
 *
 * Scenario: Clicking the icon opens the modal with content
 *   Given the InformationIcon is rendered with a valid page key
 *   When I click the information icon
 *   Then the modal should open and display the page content
 */
describe("InformationIcon", () => {
  it("renders the information icon button when content exists", () => {
    render(<InformationIcon pageKey={"splash"} />);
    expect(screen.getByAltText("Information Icon")).toBeInTheDocument();
  });

  it("renders nothing when no content exists for the page key", () => {
    render(<InformationIcon pageKey={"unknownPage" as InformationPageKey} />);
    expect(screen.queryByAltText("Information Icon")).not.toBeInTheDocument();
  });

  it("clicking the icon opens the modal with page content", () => {
    render(<InformationIcon pageKey={"splash"} />);
    fireEvent.click(screen.getByAltText("Information Icon"));
    expect(screen.getByTestId("modal-base")).toBeInTheDocument();
    expect(
      screen.getByText("This is test information content."),
    ).toBeInTheDocument();
  });
});
