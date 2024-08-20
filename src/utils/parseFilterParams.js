// **SUMMARY-CODE**

// const parseGender = (gender) => {
//     const isString = typeof gender === 'string';
//     if (!isString) return;
//     const isGender = (gender) => ['male', 'female', 'other'].includes(gender);
//     if (isGender(gender)) return gender;
// };


// const parseNumber = (number) => {
//     const isString = typeof number === 'string';
//     if (!isString) return;

//     const parsedNumber = parseInt(number);
//     if (Number.isNaN(parsedNumber)) {
//         return;
//     }

//     return parsedNumber;
// };


// export const parseFilterParams = (query) => {
//     const { gender, maxAge, minAge, maxAvgMark, minAvgMark } =
//         query;

//     const parsedGender = parseGender(gender);
//     const parsedMaxAge = parseNumber(maxAge);
//     const parsedMinAge = parseNumber(minAge);
//     const parsedMaxAvgMark = parseNumber(maxAvgMark);
//     const parsedMinAvgMark = parseNumber(minAvgMark);

//     return {
//         gender: parsedGender,
//         maxAge: parsedMaxAge,
//         minAge: parsedMinAge,
//         maxAvgMark: parsedMaxAvgMark,
//         minAvgMark: parsedMinAvgMark,
//     };
// };


// **WEBINAR-CODE**
const parseIntFilter = (unknown) => {
    if (typeof unknown !== 'string') return;
    const parsedInt = parseInt(unknown);
    if (Number.isNaN(parsedInt)) return;

    return parsedInt;
};

const parseFloatFilter = (unknown) => {
    if (typeof unknown !== 'string') return;
    const parsedFloat = parseFloat(unknown);
    if (Number.isNaN(parsedFloat)) return;

    return parsedFloat;
};

const parseGender = (unknown) => {
    if (['male', 'female', 'other'].includes(unknown)) return unknown;
};

const parseBoolean = (unknown) => {
    if (!['true', 'false'].includes(unknown)) return;

    return unknown === 'true' ? true : false;
};

export const parseFilterParams = (query) => {
    return {
        gender: parseGender(query.gender),
        minAge: parseIntFilter(query.minAge),
        maxAge: parseIntFilter(query.maxAge),
        minavgMark: parseFloatFilter(query.minavgMark),
        maxavgMark: parseFloatFilter(query.maxavgMark),
        onDuty: parseBoolean(query.onDuty),
    };
};
