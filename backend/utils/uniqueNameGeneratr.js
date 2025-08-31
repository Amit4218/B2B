import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export const generateUniqueName = () => {
  const uniqueName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    length: 3,
    separator: "-",
  });

  return uniqueName;
};

export default generateUniqueName;

