export const dateFormatter = ({
  date,
  locales = 'en',
  options = {
    dateStyle: 'short',
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  },
}: {
  date?: Date | number
  locales?: Intl.LocalesArgument
  options?: Intl.DateTimeFormatOptions
}) => new Intl.DateTimeFormat(locales, options).format(date)
