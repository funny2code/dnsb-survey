export default function addUserChoice(regex, story, respondentChoice) {
  return story.replace(regex, (match) => respondentChoice);
}
