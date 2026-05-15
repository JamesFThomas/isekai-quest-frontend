import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CharacterDisplayCard from "./CharacterDisplayCard";
import { Character } from "@/types/character";

const mockCharacter: Character = {
  id: "char-001",
  name: "Aric",
  avatar: "/character_avatars/aric.png",
  hp: 100,
  mp: 50,
  inventory: {
    attacks: [],
    skills: [],
    coins: { gold: 0, silver: 0, copper: 0 },
    weapons: [],
    equipment: [],
    rations: [],
    potions: [],
    questItems: [],
  },
};

/*
 * Story: Player views a character's stats on a display card
 * In order to review their party members,
 * a player wants to see a character's name, HP, and MP displayed on a card.
 *
 * Scenario: Character card renders the character's name
 *   Given a character with a name
 *   When the CharacterDisplayCard renders
 *   Then I should see the character's name
 *
 * Scenario: Character card renders HP and MP stats
 *   Given a character with HP and MP values
 *   When the CharacterDisplayCard renders
 *   Then I should see the correct HP and MP values
 *
 * Scenario: Character card renders the character avatar
 *   Given a character with an avatar
 *   When the CharacterDisplayCard renders
 *   Then I should see the character's avatar image
 */
describe("CharacterDisplayCard", () => {
  it("renders the character name", () => {
    render(<CharacterDisplayCard character={mockCharacter} />);
    expect(screen.getByText("Aric")).toBeInTheDocument();
  });

  it("renders the character HP and MP stats", () => {
    render(<CharacterDisplayCard character={mockCharacter} />);
    expect(screen.getByText("HP: 100")).toBeInTheDocument();
    expect(screen.getByText("MP: 50")).toBeInTheDocument();
  });

  it("renders the character avatar image", () => {
    render(<CharacterDisplayCard character={mockCharacter} />);
    expect(screen.getByAltText("Aric")).toBeInTheDocument();
  });
});
