export const formatDate = (datetime: Date): string => {
  const date = new Date(datetime);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return date.toLocaleString('en-US', options).replace('at', '-');
};

export const formatToTimeOnly = (datetime: Date): string => {
  const date = new Date(datetime);
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return date.toLocaleString('en-US', options);
};

export const formatToDateOnly = (datetime: Date): string => {
  const date = new Date(datetime);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleString('en-US', options);
};

export const autoFormatDate = (date: Date): string => {
  const currentDate = new Date();
  const messageDate = new Date(date);
  const differenceInMs: number = currentDate.getTime() - messageDate.getTime();
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

  return differenceInDays >= 1 ? formatToDateOnly(date) : formatToTimeOnly(date);
};