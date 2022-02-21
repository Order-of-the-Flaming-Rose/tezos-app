/* eslint-disable eqeqeq */
/* eslint-disable no-console */
type TParams = {
  [key: string]: string;
};

export const formatParams = (params: TParams) => {
  const entries = Object.entries(params);
  if (!entries.length) return;
  const str = entries.reduce((acc, el, i, ar) => {
    let paramValue = el[1];
    if (ar.length - 1 != i) {
      paramValue = paramValue.concat('&');
    }
    return acc.concat(`${el[0] + '='.concat(paramValue)}`);
  }, '?');
  console.log(str);
};
