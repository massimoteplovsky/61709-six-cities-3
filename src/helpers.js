export const makeRating = (numericRating) => {
  return (100 / 5 * numericRating).toFixed(0);
};

export const makeCityList = (offers) => {
  return [...new Set(offers.map(({city}) => city.name))];
};

export const makeTitle = (rating) => {
  if (rating === 1) {
    return `terribly`;
  }

  if (rating === 2) {
    return `badly`;
  }

  if (rating === 3) {
    return `not bad`;
  }

  if (rating === 4) {
    return `good`;
  }

  return `perfect`;
};

export const shuffleArray = (arr) => {
  let arrayLength = arr.length;
  let temp;
  let index;

  while (arrayLength) {

    index = Math.floor(Math.random() * arrayLength--);

    temp = arr[arrayLength];
    arr[arrayLength] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

export const getFormatDate = (date) => {
  return new Date(date).toLocaleDateString(`en-US`, {year: `numeric`, month: `long`, day: `numeric`});
};

export const sortByDate = (a, b) => {
  return new Date(b.date) - new Date(a.date);
};

export const convertToCamelCase = (str) => {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1
      .toUpperCase()
      .replace(`-`, ``)
      .replace(`_`, ``);
  });
};

export const checkIsObject = (obj) => {
  return obj === Object(obj) && !Array.isArray(obj) && typeof obj !== `function`;
};

export const convertObjectKeys = (obj) => {
  if (checkIsObject(obj)) {
    const newObj = {};

    Object.keys(obj).forEach((item) => {
      newObj[convertToCamelCase(item)] = convertObjectKeys(obj[item]);
    });

    return newObj;
  } else if (Array.isArray(obj)) {
    return obj.map((item) => {
      return convertObjectKeys(item);
    });
  }

  return obj;
};
