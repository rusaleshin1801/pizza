import React from "react";
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";

type CategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
};

const categories = [
  "Все",
  "Мясные",
  "Острые",
  "Вегетарианские",
  "Гриль",
  "Закрытые",
];

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onClickCategory }) => {
    useWhyDidYouUpdate("Categories", { value, onClickCategory });

    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, index) => (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={value === index ? "active" : ""}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
