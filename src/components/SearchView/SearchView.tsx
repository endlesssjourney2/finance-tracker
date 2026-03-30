import type { FC } from "react";
import s from "./SearchView.module.css";
import CustomInput from "../CustomInput/CustomInput";
import SearchSelect from "../ControlSelect/SearchSelect";

type SearchViewProps = {
  value: string;
  onChangeValue: (e: string) => void;
  selectedMonth: string[];
  setSelectedMonth: (e: string[]) => void;
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
    <div className={s.search}>
      <div className={s.searchMonths}>
        {/* a new component for month selection, with multiple select and checkboxes.*/}
        <SearchSelect
          label="By months"
          values={months}
          selectedValues={selectedMonth}
          onChange={setSelectedMonth}
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
