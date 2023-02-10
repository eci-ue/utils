
import { isZero } from "../common";

export const isPic = function(value: string | number) {
  if (isZero(value)) {
    return true;
  }
  if (value) {
    return /^(pic-{0, })?\d+(\.[a-z]+)?$/i.test(String(value));
  }
  return false;
}
