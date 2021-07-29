export const trimText = (text = "", limit) =>
  text.length > limit ? `${text.slice(0, limit)}..` : text;

export const trimTextChart = (text = "", limit) =>
  text.length > limit ? `${text.slice(0, limit)}..` : text;
