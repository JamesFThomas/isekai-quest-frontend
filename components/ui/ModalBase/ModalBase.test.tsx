import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ModalBase } from "./ModalBase";

const mockCloseModal = jest.fn();

/*
 * Story: Player interacts with a base modal
 * In order to view content or take action,
 * a player wants to open a modal that displays content and can be closed.
 *
 * Scenario: Modal renders children when open
 *   Given the ModalBase is open
 *   When the component renders
 *   Then the child content should be visible
 *
 * Scenario: Modal renders a title when provided
 *   Given the ModalBase is open with a title
 *   When the component renders
 *   Then the title should be visible
 *
 * Scenario: Read-only modal renders a Close button
 *   Given the ModalBase is open with type read-only
 *   When the component renders
 *   Then a Close button should be visible
 *
 * Scenario: Action modal does not render a Close button
 *   Given the ModalBase is open with type action
 *   When the component renders
 *   Then no Close button should be present
 *
 * Scenario: Clicking Close calls closeModal
 *   Given the ModalBase is open with type read-only
 *   When I click the Close button
 *   Then closeModal should be called
 */
describe("ModalBase", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders children when open", () => {
    render(
      <ModalBase
        isOpen={true}
        type="read-only"
        closeModal={mockCloseModal}
        title=""
      >
        <div>Modal Child Content</div>
      </ModalBase>,
    );
    expect(screen.getByText("Modal Child Content")).toBeInTheDocument();
  });

  it("renders the title when provided", () => {
    render(
      <ModalBase
        isOpen={true}
        type="read-only"
        closeModal={mockCloseModal}
        title="Test Title"
      >
        <div>Content</div>
      </ModalBase>,
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders a Close button for read-only type", () => {
    render(
      <ModalBase
        isOpen={true}
        type="read-only"
        closeModal={mockCloseModal}
        title=""
      >
        <div>Content</div>
      </ModalBase>,
    );
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("does not render a Close button for action type", () => {
    render(
      <ModalBase
        isOpen={true}
        type="action"
        closeModal={mockCloseModal}
        title=""
      >
        <div>Content</div>
      </ModalBase>,
    );
    expect(
      screen.queryByRole("button", { name: /close/i }),
    ).not.toBeInTheDocument();
  });

  it("clicking Close calls closeModal", () => {
    render(
      <ModalBase
        isOpen={true}
        type="read-only"
        closeModal={mockCloseModal}
        title=""
      >
        <div>Content</div>
      </ModalBase>,
    );
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });
});
