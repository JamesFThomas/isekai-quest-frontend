// ToastProvider.test.tsx

import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { ToastProvider } from "./ToastProvider";
import { primeAudioContext } from "@/lib/utils/soundEffects";

jest.mock("@/lib/utils/soundEffects", () => ({
  primeAudioContext: jest.fn(),
}));

const mockPrimeAudioContext = jest.mocked(primeAudioContext);

/*
 * Story: Sound effects play reliably once the player interacts with the page
 * Browsers will not start an AudioContext created outside a user gesture, and
 * toast sounds play from a React effect, which does not count as one. The
 * provider therefore primes the context on the first real interaction.
 *
 * Scenario: The audio context is primed on the first user gesture
 *   Given the ToastProvider is mounted
 *   When the player first interacts with the page
 *   Then the shared audio context should be created
 *
 * Scenario: Priming happens only once
 *   Given the audio context has already been primed
 *   When the player interacts with the page again
 *   Then the context should not be primed a second time
 */

describe("ToastProvider", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("primes the audio context on the first user gesture", () => {
    render(
      <ToastProvider>
        <div>Child Content</div>
      </ToastProvider>,
    );

    expect(screen.getByText("Child Content")).toBeInTheDocument();
    expect(mockPrimeAudioContext).not.toHaveBeenCalled();

    window.dispatchEvent(new Event("pointerdown"));

    expect(mockPrimeAudioContext).toHaveBeenCalledTimes(1);
  });

  it("stops listening once the audio context has been primed", () => {
    render(
      <ToastProvider>
        <div>Child Content</div>
      </ToastProvider>,
    );

    window.dispatchEvent(new Event("pointerdown"));
    window.dispatchEvent(new Event("pointerdown"));
    window.dispatchEvent(new Event("keydown"));

    expect(mockPrimeAudioContext).toHaveBeenCalledTimes(1);
  });

  it.todo("should provide toast context to child components");
  it.todo("should add a toast to the queue when addToast is called");
  it.todo("should remove a toast from the queue when removeToast is called");
  it.todo("should auto-dismiss a toast after its duration expires");
  it.todo("should support quest event toast types");
  it.todo("should support item event toast types");
  it.todo("should support battle event toast types");
});
