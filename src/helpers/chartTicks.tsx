import type { Scale } from "chart.js";
import { monthLabel } from "./monthLabel";

export function monthTickCallback() {
  return function (this: Scale, value: string | number) {
    const label = this.getLabelForValue(Number(value));
    return monthLabel(label, "MMM YY");
  };
}
