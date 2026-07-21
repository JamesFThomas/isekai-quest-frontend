import { QuestStory, QuestStoryId } from "@/types/quest";

export function areAllCompleted(
  requiredIds: string[],
  completedIds: string[],
): boolean {
  return requiredIds.every((id) => completedIds.includes(id));
}

export function isQuestAvailable(
  quest: QuestStory,
  completedQuestIds: QuestStoryId[],
): boolean {
  if (!quest.prerequisiteQuestIds || quest.prerequisiteQuestIds.length === 0) {
    return true;
  }
  return areAllCompleted(quest.prerequisiteQuestIds, completedQuestIds);
}

export function isLocationUnlocked(
  locationId: string,
  allQuests: QuestStory[],
  completedQuestIds: QuestStoryId[],
): boolean {
  const locationQuestIds = allQuests
    .filter((quest) => quest.locationId === locationId)
    .map((quest) => quest.id);

  if (locationQuestIds.length === 0) return false;

  return areAllCompleted(locationQuestIds, completedQuestIds);
}
