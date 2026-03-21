import type { FC } from "react";
import s from "./SearchView.module.css";
import { monthLabel } from "../../helpers/monthLabel";
import ControlSelect from "../ControlSelect/ControlSelect";
import CustomInput from "../CustomInput/CustomInput";

type SearchViewProps = {
  value: string;
  onChangeValue: (e: string) => void;
  selectedMonth: string;
  setSelectedMonth: (e: string) => void;
  months: string[];
};

const SearchView: FC<SearchViewProps> = ({
  value,
  onChangeValue,
  selectedMonth,
  setSelectedMonth,
  months,
}) => {
  return (
    // maybe some changes in the future with Control Select component,
    // maybe will be component for this logic,
    // its work but i think its not comfortable to read
    <div className={s.search}>
      <div className={s.searchMonths}>
        <ControlSelect
          value={selectedMonth}
          label="By months"
          values={months}
          onChange={setSelectedMonth}
          formatValue={(m) => monthLabel(m, "MMMM YY")}
          allValues="All months"
        />
      </div>
      <div className={s.searchInput}>
        <CustomInput
          label="Search finances..."
          value={value}
          onChange={onChangeValue}
        />
      </div>
    </div>
  );
};

export default SearchView;
