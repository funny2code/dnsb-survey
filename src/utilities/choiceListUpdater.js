const choiceListUpdater = (choiceList, value, activeRow = null) => {
  const updatedChoiceList = choiceList.map((choice, index) => {
    return {
      ...choice,
      value:
        activeRow == null || activeRow.text === choice.text
          ? Math.round(value)
          : choice.value, 
    };
  });

  return updatedChoiceList;
};

export default choiceListUpdater;


