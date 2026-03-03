import dayjs from "dayjs";

export const abbreviatedDate = () => {
  return dayjs().toISOString().slice(0, 10);
};
