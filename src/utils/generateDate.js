function getActualDay() {
  let d = new Date();
  let date = d.getDate();

  let month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12

  let year = d.getFullYear();
  let dateStr = `${date}/${month}/${year}`;

  return dateStr;
}

export default getActualDay;
