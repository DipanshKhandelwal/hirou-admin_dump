import moment from 'moment';

export function getDateString(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getJapaneseDateString(dateStr: string) {
  moment.locale('ja', {
    weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
  });

  const d = moment(dateStr).format('YYYY/MM/DD (ddd) HH:mm:ss');
  return d;
}
