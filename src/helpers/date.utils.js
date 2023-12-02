const getDayFromData = (date) => {
  const dateSplit = date.split("T")[0];
  const day = dateSplit.split("-")[2];
  return day;
};

const getMonthFromData = (date) => {
  const months = {
    "01": "ENE",
    "02": "FEB",
    "03": "MAR",
    "04": "ABR",
    "05": "MAY",
    "06": "JUN",
    "07": "JUL",
    "08": "AGU",
    "09": "SEP",
    10: "OCT",
    11: "NOV",
    12: "DEC",
  };
  const dateSplit = date.split("T")[0];
  const month = dateSplit.split("-")[1];
  return months[month];
};

export default { getDayFromData, getMonthFromData };
