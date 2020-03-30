export const makeRating = (numericRating) => {
  return (100 / 5 * numericRating).toFixed(0);
};

export const makeCityList = (offers) => {
  return [...new Set(offers.map(({city}) => city.name))];
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

export const validateEmail = (email) => {
  const regularExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExp.test(email);
};
