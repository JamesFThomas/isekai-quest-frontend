export type InformationPageKey =
  | "splash"
  | "createcharacter"
  | "home"
  | "questboard"
  | "marketbooth"
  | "partyscreen"
  | "map";

export type InformationContent = {
  title: string;
  imageSrc: string;
  content: string;
};

export type InformationContentMap = {
  [key in InformationPageKey]: InformationContent;
};
