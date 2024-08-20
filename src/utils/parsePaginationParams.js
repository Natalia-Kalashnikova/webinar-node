// **SUMMARY-CODE**

// const parseNumber = (number, defaultValue) => {
//     const isString = typeof number === 'string';
//     if (!isString) return defaultValue;


//     const parsedNumber = parseInt(number);
//     if (Number.isNaN(parsedNumber)) {
//         return defaultValue;
//     }
//     return parsedNumber;
// };

// export const parsePaginationParams = (query) => {
//     const { page, perPage } = query;

//     const parsedPage = parseNumber(page, 1);
//     const parsedPerPage = parseNumber(perPage, 10);

//     return {
//         page: parsedPage,
//         perPage: parsedPerPage,
//     };
// };



// **WEBINAR-CODE**
const parseNumber = (unknown, defaultNumber) => {
  if (typeof unknown !== 'string') return defaultNumber;

  const parsedNumber = parseInt(unknown);

  if (Number.isNaN(parsedNumber)) return defaultNumber;

  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  return {
    page: parseNumber(page, 1),
    perPage: parseNumber(perPage, 5),
  };
};
