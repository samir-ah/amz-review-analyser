export const getParamFromURLPath = (param: string, urlPath: string) => {
  const urlParams = new URLSearchParams(new URL(window.location.origin + urlPath).search);
  return urlParams.get(param);
};
export const limitStr = (text: string, count: number, insertDots = true) => {
  return text.slice(0, count) + (text.length > count && insertDots ? '...' : '');
};
export const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
