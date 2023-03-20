const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDateFormat = (date) => {
  const dateArr = date.split("-");
  const [year, month] = dateArr;
  const formated = [months[month-1], year].join(' ');
  console.log(formated)
  return formated;
};

export default getDateFormat;