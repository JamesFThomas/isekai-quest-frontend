# Quest Authoring Guide

This document explains how to create a new quest in Isekai Quest, including quest structure, branching, battles, rewards, end states, and the asset pipeline.

---

## 1. Quest Overview

Quests are the primary narrative and gameplay structure within Isekai Quest. Each quest is composed of a series of interconnected story points that present narrative text, artwork, and player choices.

A quest progresses as the player moves from one StoryPoint to another by selecting choices. These choices may lead to additional narrative nodes, branching story paths, battles, rewards, or quest-ending outcomes.

At a high level, a quest follows this structure:

Quest  
→ StoryPoints  
→ Choices  
→ Results  
→ Branching Paths  
→ End States

StoryPoints act as the core building blocks of a quest. Each StoryPoint represents a moment in the story where the player is presented with narrative context and a set of choices that determine how the quest progresses.

Through this system, quests can support:

- Linear progression
- Branching storylines
- Battle encounters
- Multiple endings
- Rewards and penalties based on player decisions

All quests ultimately resolve into one of two final states: **completed** or **failed**.

While quests may contain multiple branching paths, battles, and narrative outcomes, every possible path must eventually lead to one of these two final states. Authors can create many different reasons for reaching these outcomes, but the quest system requires that every branch terminate in either a completed or failed result.

Battle encounters, story outcomes, and branching decisions exist to shape the player's journey through the quest, but they do not represent final states themselves. Instead, they redirect the player to different StoryPoints that ultimately resolve the quest.

---

## 2. Quest File Structure

Each quest in Isekai Quest is defined as a single quest object that contains metadata about the quest and the collection of StoryPoints that define the narrative flow.

A quest file represents the complete structure of the quest, including its starting point, all possible story nodes, and the paths that connect them.

At a minimum, a quest contains the following core properties:

- **id** — a unique identifier for the quest
- **title** — the name displayed to the player
- **description** — a short explanation of the quest shown in the quest board
- **startStoryPointId** — the StoryPoint where the quest begins
- **storyPoints** — a collection of StoryPoints that make up the quest

The `startStoryPointId` determines which StoryPoint is shown when the player begins the quest. From that point forward, player choices determine which StoryPoint is loaded next.

Each StoryPoint within the quest contains its own narrative content and references to other StoryPoints through `nextPointId` values. These references form the branching structure of the quest.

All StoryPoints referenced within a quest must exist within that quest's `storyPoints` collection.

### Storage and Registration

Quest files are stored within the project's quest content directory. Each quest is authored in its own file and exported as a quest object.

The Quest Board displays quests from a predefined quest list used by the application. To test or add a newly authored quest, the existing placeholder quest should be replaced with the new quest.

When adding a new quest:

- Create the quest file in the quest content directory.
- Export the quest object from the file.
- Replace the existing quest import in the quest list entry point with the newly created quest.
- Verify the new quest appears in the Quest Board UI.

### Example Quest Object

Below is a simplified example showing the basic structure of a quest.

```ts
const exampleQuest = {
  id: "bandit_watch",
  title: "Bandit Watch",
  description: "Investigate reports of suspicious riders near the trade road.",
  startStoryPointId: "SP1",

  storyPoints: [
    {
      id: "SP1",
      text: "You arrive at the edge of the trade road where merchants reported seeing armed riders watching caravans.",
      image: "/quests/bandit-watch/sp1.webp",

      choices: [
        {
          text: "Observe the road from a distance",
          nextPointId: "SP2",
        },
        {
          text: "Approach the riders directly",
          nextPointId: "SP3",
        },
      ],
    },
  ],
};
```

---

## 3. StoryPoint Structure

---

## 4. StoryPoint ID Conventions

---

## 5. Choice Structure

---

## 6. Branching and Story Progression

---

## 7. Outcome Nodes

---

## 8. Battle Nodes

---

## 9. Opponent Definitions

---

## 10. Rewards and Inventory Items

---

## 11. End States

---

## 12. Quest Images and Art Assets

---

## 13. Quest Artwork Style Prompt

---

## 14. Story Design Guidelines

---

## 15. Testing a Quest
