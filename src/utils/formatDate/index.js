export default function formatDate(dateNow, yearFormat = 'full') {
  const date = new Date(Number(dateNow));
  const addZeroToDate = value => value < 10 ? `0${value}` : value;

  const day = addZeroToDate(date.getDate());
  const month = addZeroToDate(date.getMonth() + 1);
  let year = date.getFullYear();

  if (yearFormat === 'short') {
    year = year.toString().slice(2, 4);
  }

  return `${day}/${month}/${year}`;
};