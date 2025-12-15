import type { Scale } from "chart.js";
import { formatMonthLabel } from "./formatMonthLabel";

export function monthTickCallback(locale = "en-US") {
  return function (this: Scale, value: string | number) {
    const label = this.getLabelForValue(Number(value));
    return formatMonthLabel(label, locale);
  };
}
