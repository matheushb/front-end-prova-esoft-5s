const differenceInDays2 = (date1, date2) => {
  return Math.floor((date1.getTime() - date2.getTime()) / 1000 / 60 / 60 / 24);
};
