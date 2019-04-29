import moment from 'moment'

export const DateFormats = {
  common: 'DD/MM/YYYY',
  time: 'HH:mm',
};

export function formatDate(date: string, format: string, oldFormat?: string) {
  return moment(date, oldFormat).format(format).toString();
}
