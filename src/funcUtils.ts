import { Right, Left, Either } from 'purify-ts';

export type CaseType = [(...args: any[]) => boolean, boolean];
export const check = (arr: CaseType, ...args: any[]): Either<string, boolean> => {
  if (arr[0](...args)) {
    return Right(arr[1]);
  }
  return Left('None');
};
export const is = (arr: CaseType, ...args: any[]) => {
  return () => check(arr, ...args);
};

export const match = (...arr: any[]) => arr.reduce((a, b) => a || b);
