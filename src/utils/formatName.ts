export const formatTaskName = (name: string) => {
  if (!name) {
    return '---';
  }
  const [date, ...subStrings] = name.split(':');
  const dateJP = new Date(date);
  return `月${dateJP.getDate()}日${dateJP.getMonth() + 1} : ${subStrings.join(
    ''
  )}`;
};
