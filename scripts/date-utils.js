export const differenceInExtense = ibgeDate => {
  const differenceInDays = differenceFromTodayToDateInDays(ibgeDate);

  if (differenceInDays === 0) {
    return 'hoje';
  }
  if (differenceInDays === 1) {
    return 'ontem';
  }
  return `${differenceInDays} dias atrás`;
};

const parseIbgeDateToIso = ibgeDate => {
  return ibgeDate.split(' ')[0].split('/').reverse().join('-');
};

const differenceFromTodayToDateInDays = ibgeDate => {
  const parsedDate = parseIbgeDateToIso(ibgeDate);
  const today = new Date().toISOString().split('T')[0];

  return Math.floor(
    (new Date(today).getTime() - new Date(parsedDate).getTime()) /
      1000 /
      60 /
      60 /
      24
  );
};
