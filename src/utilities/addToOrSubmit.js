const markUserChoice = (widget, questionType, choiceList) => {
  let formData = [];
  let processedChoice = "";

  if (widget == "ring" || questionType == "rate" || questionType == "rank") {
    processedChoice = `<mark>${choiceList
      .filter((choice) => choice.text.toLowerCase() !== "others")
      .map((choice) => `${choice.text} (${choice.value})`)
      .join(", ")} </mark> `; // Process respondent choice to be added to story;

    formData = [...choiceList];
  }

  if (questionType == "singleChoice") {
    processedChoice = `<mark>${choiceList
      .filter((choice) => choice.value === 1)
      .map((choice) => choice.text)
      .join(", ")}</mark> `;

    formData = [...choiceList.filter((choice) => choice.value === 1)];
  }

  if (questionType == "multipleChoice") {
    processedChoice = `<mark>${choiceList
      .filter((choice) => choice.value === 1)
      .map((choice) => choice.text)
      .join(", ")}</mark> `;

    formData = [...choiceList.filter((choice) => choice.value === 1)];
  }

  if (widget == "bar") {
    processedChoice = `<mark>${choiceList[0].value}%</mark>`;

    formData = [...choiceList];
  }

  if (questionType == "scale") {
    processedChoice = `<mark>${choiceList
      .map((choice) => choice.text)
      .join(", ")}</mark> `;

    formData = choiceList.map((choice) => {
      // Find the index of the scale that is equal to 1
      const scaleIndex = choice.scales.findIndex((scale) => scale === 1);

      return {
        ...choice, // Copy all other properties
        value: scaleIndex !== -1 ? scaleIndex : null, // Set value to index or null
      };
    });
  }
  return {
    processedChoice,
    formData,
  };
};

export default markUserChoice;
