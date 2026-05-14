import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";

/*
 * Story: Player sees a loading indicator during async operations
 * In order to understand the app is working,
 * a player should see a visible loading spinner while waiting for a response.
 *
 * Scenario: Spinner renders with accessible status role
 *   Given an async operation is in progress
 *   When the LoadingSpinner is rendered
 *   Then it should be present in the DOM with a status role for accessibility
 */
describe("LoadingSpinner", () => {
  it("renders a spinner with accessible status role", () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});
