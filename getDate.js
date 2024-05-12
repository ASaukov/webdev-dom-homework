export const getDate = (commentDate) => {
    let d = new Date(commentDate);
  function addZero(a) {
    return (a < 10) ? '0' + a : a;
  }
  let date = addZero(d.getDate());
  let month = addZero(d.getMonth() + 1);
  let year = d.getFullYear();
  let hours = addZero(d.getHours());
  let min = addZero(d.getMinutes());
  const userDate = date + '.' + month + '.' + year + ' ' + hours + ':' + min;
  return userDate;
  };