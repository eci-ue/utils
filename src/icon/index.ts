
import Pic from "./pic";
import { isZero } from "../common";
import { h as createElement } from "vue";

import type { Component } from "vue";

const isPic = function(value: string | number) {
  if (isZero(value)) {
    return true;
  }
  if (value) {
    return /^(pic-{0, })?\d+(\.[a-z]+)?$/i.test(String(value));
  }
  return false;
}

export const pic = function(name: string | number): Component | false {
  if (isPic(name)) {
    return createElement(Pic, { name });
  }
  return false;
};