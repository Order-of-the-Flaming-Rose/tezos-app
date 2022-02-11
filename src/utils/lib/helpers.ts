/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable func-names */
export function debounce(func: Function, ms: number) {
  let timer: any = null;

  return function (this: unknown, ...args: any[]) {
    const onComplete = () => {
      func.apply(this, args);
      timer = null;
    };

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(onComplete, ms);
  };
}

export function pluralForm(number: number, titles: any[]) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}

export function randomInteger(min: number, max: number) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export function gaussRound(num: number, decimalPlaces: number) {
  const d = decimalPlaces || 0;
  const m = 10 ** d;
  const n = +(d ? num * m : num).toFixed(8);
  const i = Math.floor(n);
  const f = n - i;
  const e = 1e-8;
  const r =
    f > 0.5 - e && f < 0.5 + e ? (i % 2 === 0 ? i : i + 1) : Math.round(n);
  return d ? r / m : r;
}

export function checkArrayInArray(where: any[], what: any) {
  return what.every((elem: any) => where.includes(elem));
}

export function clearStrSpases(str: string) {
  return str.replace(/\s+/g, '');
}

export function getObjectProp(obj: any, path: string, def: any) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length; i++) {
    current = current[parts[i]];
    if (!current) {
      current = def || null;
      break;
    }
  }
  return current;
}

export function deepEqual(x: any, y: any): boolean {
  const ok = Object.keys;
  const tx = typeof x;
  const ty = typeof y;
  return x && y && tx === 'object' && tx === ty
    ? ok(x).length === ok(y).length &&
        ok(x).every((key) => deepEqual(x[key], y[key]))
    : x === y;
}
