export function sortChoiceListByValue(choiceList, isDescending) {
  const sortedList = choiceList.sort((a, b) => {
    const valueA = Number(a.value);
    const valueB = Number(b.value);
    return isDescending ? valueB - valueA : valueA - valueB;
  });
  return sortedList;
}

export function sortChoiceListByName(choiceList, isDescending) {
  const sortedList = choiceList.sort((a, b) => {
    const textA = a.text.toLowerCase();
    const textB = b.text.toLowerCase();

    // If either text is "others", prioritize it last
    if (textA.toLowerCase().includes("other")) {
      return 1;
    } else if (textB.toLowerCase().includes("other")) {
      return -1;
    }

    // Otherwise, sort alphabetically
    if (textA < textB) {
      return isDescending ? 1 : -1;
    }
    if (textA > textB) {
      return isDescending ? -1 : 1;
    }
    return 0; // texts are equal
  });
  return sortedList;
}
