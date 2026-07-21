import {
  areAllCompleted,
  isQuestAvailable,
  isLocationUnlocked,
} from "./questAvailability";
import { QuestStory } from "@/types/quest";

/*
 * Story: Determine quest and location availability from completed quests
 * In order to gate content behind prior progress,
 * the game needs to compute availability from a player's completedQuestIds.
 */
describe("areAllCompleted", () => {
  // Scenario: all required ids are present
  it("returns true when every required id is in the completed list", () => {
    expect(areAllCompleted(["a", "b"], ["a", "b", "c"])).toBe(true);
  });

  // Scenario: some required ids are missing
  it("returns false when any required id is missing from the completed list", () => {
    expect(areAllCompleted(["a", "b"], ["a"])).toBe(false);
  });

  // Scenario: no requirements at all
  it("returns true when the required list is empty", () => {
    expect(areAllCompleted([], ["a"])).toBe(true);
  });
});

describe("isQuestAvailable", () => {
  const baseQuest: QuestStory = {
    id: "q2",
    name: "Test Quest",
    description: "",
    storyPoints: [],
    coverImageSrc: "",
    locationId: "startsville",
  };

  // Scenario: quest has no prerequisites
  it("is available when prerequisiteQuestIds is undefined", () => {
    expect(isQuestAvailable(baseQuest, [])).toBe(true);
  });

  it("is available when prerequisiteQuestIds is an empty array", () => {
    expect(
      isQuestAvailable({ ...baseQuest, prerequisiteQuestIds: [] }, []),
    ).toBe(true);
  });

  // Scenario: prerequisites are fully met
  it("is available when all prerequisites are completed", () => {
    const quest = { ...baseQuest, prerequisiteQuestIds: ["q1"] };
    expect(isQuestAvailable(quest, ["q1"])).toBe(true);
  });

  // Scenario: prerequisites are partially met
  it("is unavailable when some prerequisites are not completed", () => {
    const quest = { ...baseQuest, prerequisiteQuestIds: ["q1", "q1b"] };
    expect(isQuestAvailable(quest, ["q1"])).toBe(false);
  });

  // Scenario: no progress at all
  it("is unavailable when no prerequisites are completed", () => {
    const quest = { ...baseQuest, prerequisiteQuestIds: ["q1"] };
    expect(isQuestAvailable(quest, [])).toBe(false);
  });
});

describe("isLocationUnlocked", () => {
  const quests: QuestStory[] = [
    {
      id: "q1",
      name: "",
      description: "",
      storyPoints: [],
      coverImageSrc: "",
      locationId: "startsville",
    },
    {
      id: "q2",
      name: "",
      description: "",
      storyPoints: [],
      coverImageSrc: "",
      locationId: "startsville",
    },
    {
      id: "q3",
      name: "",
      description: "",
      storyPoints: [],
      coverImageSrc: "",
      locationId: "ashwood",
    },
  ];

  // Scenario: every quest in the location is completed
  it("is unlocked when all quests for the location are completed", () => {
    expect(isLocationUnlocked("startsville", quests, ["q1", "q2"])).toBe(true);
  });

  // Scenario: only some quests in the location are completed
  it("is locked when only some quests for the location are completed", () => {
    expect(isLocationUnlocked("startsville", quests, ["q1"])).toBe(false);
  });

  // Scenario: no quests completed
  it("is locked when no quests are completed", () => {
    expect(isLocationUnlocked("startsville", quests, [])).toBe(false);
  });

  // Scenario: unrecognized or empty location
  it("is locked when no quests exist for the given locationId", () => {
    expect(
      isLocationUnlocked("unknown-location", quests, ["q1", "q2", "q3"]),
    ).toBe(false);
  });

  // Scenario: completed quests from other locations don't count
  it("ignores completed quests belonging to other locations", () => {
    expect(isLocationUnlocked("startsville", quests, ["q3"])).toBe(false);
  });
});
