import { Dropdown, IDropdownOption } from "@fluentui/react";
import { useFilter } from "../../contexts/FilterContext";
import { MovieTVType } from "../../enums";
interface SideBarProps {}

const SideBar: React.FunctionComponent<SideBarProps> = () => {
  const { type, updateType } = useFilter();
  const typeDropdownOptions = [
    { key: MovieTVType.Movie, text: "Movie" },
    { key: MovieTVType.TV, text: "TV" },
  ];

  const onChange = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption
  ): void => {
    updateType(item?.key as MovieTVType);
  };
  return (
    <div>
      <Dropdown
        label="Controlled example"
        selectedKey={type}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onChange}
        placeholder="Select an option"
        options={typeDropdownOptions}
      />
    </div>
  );
};

export default SideBar;
