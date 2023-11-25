const FileDuplicatefilter = async (PreviousData, selectedData) => {
  let unique = [...PreviousData];

  selectedData.forEach((element) => {
    const duplicate = PreviousData.find((obj) => {
      return obj.fileName === element.fileName;
    });
    if (!duplicate === true) {
      unique.push(element);
    }
  });
  return unique;
};

export default FileDuplicatefilter;
