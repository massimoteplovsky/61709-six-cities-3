import * as React from "react";

interface Props {
  city: string,
  isActive: boolean,
  onChangeActualCity(city: string): void
}

const CityListItem: React.FC<Props> = (props: Props) => {
  const {
    city,
    isActive,
    onChangeActualCity,
  } = props;

  return (
    <li className="locations__item">
      <a
        className={`locations__item-link tabs__item ${isActive ? `tabs__item--active` : ``}`}
        href="#"
        onClick={(event) => {
          event.preventDefault();
          onChangeActualCity(city);
        }}
      >
        <span>{city}</span>
      </a>
    </li>
  );
};

export default CityListItem;
