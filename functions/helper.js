const trimAndDoubleSpaces = string => {
  return string.trim().replace(/\s\s+/g, " ");
};

const objIsEmpty = obj => {
  if (Object.keys(obj).length > 0 && Object.values(obj).length > 0) {
    if (!Object.values(obj).some(x => x.trim() === "" || x === null)) {
      return false;
    }
  }
  return true;
};

const stringIsEmpty = string => {
  return string.trim() === "" ? true : false;
};

module.exports = {
    trimAndDoubleSpaces,
    objIsEmpty,
    stringIsEmpty
}