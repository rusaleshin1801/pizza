import React from "react";
import { useDispatch } from "react-redux";
import { Sort as SortType } from "../redux/slices/filterSlice";

import { setSort } from "../redux/slices/filterSlice.ts";

type ListItem = {
  name: string;
  sortProperty: "rating" | "price" | "title";
};

type PopupClick = MouseEvent & {
  path: Node[];
};

type SortProps = {
  value: SortType;
};

export const List: ListItem[] = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "title" },
];

const Sort: React.FC<SortProps> = ({ value }) => {
  const dispatch = useDispatch();

  const sortRef = React.useRef<HTMLDivElement>(null);

  const [Open, setIsOpen] = React.useState(false);

  const onClickListItem = (obj: ListItem) => {
    dispatch(setSort(obj));
    setIsOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (Event: MouseEvent) => {
      const _event = Event as PopupClick;
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!Open)}>{value.name}</span>
      </div>
      {Open && (
        <div className="sort__popup">
          <ul>
            {List.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(obj)}
                className={
                  value.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;

// setSelected(i); выбираем пункт
// setIsOpen(false); скрываются поля, после выбора какого-то пункта
// const sortName = List[Sorting]; сделали для того, чтобы при нажатии на выбор Сортиторвки, оставалось то значение, на которое мы кликнули