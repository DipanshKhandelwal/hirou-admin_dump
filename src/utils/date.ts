export function getDateString(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getJapaneseDateString(dateStr: string) {
  const dateJapan = new Date(dateStr);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as any;

  return dateJapan.toLocaleDateString('ja-JP-u-ca-japanese', options);
}
