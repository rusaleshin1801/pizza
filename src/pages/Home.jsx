import React from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";

import Categories from "../componets/Categories.tsx";
import Sort from "../componets/Sort.tsx";
import PizzaBlock from "../componets/PizzaBlock/PizzaBlock.tsx";
import Skeleton from "../componets/PizzaBlock/Skeleton.tsx";
import Pagination from "../componets/Pagination/index.tsx";

import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice.ts";
import { fetchPizzas } from "../redux/slices/pizzaClice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const items = useSelector((state) => state.pizza.items);
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filterSlice
  );

  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = React.useCallback((id) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    try {
      dispatch(
        fetchPizzas({
          sortBy,
          order,
          category,
          search,
          currentPage,
        })
      );
    } catch (error) {
      alert("Ошибка при загрузке страницы");
    } finally {
      setIsLoading(false);
    }
    window.scrollTo(0, 0);
  };

  // Если изменили парамметры и был первый рендрер
  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sort.sortProperty,
        currentPage,
      };

      const queryString = qs.stringify(params, { skipNulls: true });

      navigate(`?${queryString}`);
    }

    if (!window.location.search) {
      dispatch(fetchPizzas());
    }
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер, то проверяем URL - параметры и сохряняем в редаксе
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    isSearch.current = false;
  }, []);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

// window.scrollTo(0, 0); при переходе на старницу, страница отоброжается на вверху

// const [categoryId, setCategoryId] = useState(0);
//   const [sortType, setSortType] = useState({
//     name: "популярности",
//     sort: "rating",
//   }); вынесли useState из Категорий и Сорта

// fetch(
//   `https://63f9be5e473885d837d21495.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&oreder=${order}${search}`
// )
//   .then((res) => res.json())
//   .then((arr) => {
//     setItems(arr);
//     setIsLoading(false);
//   });

// axios
//   .get(
//     `https://63f9be5e473885d837d21495.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&oreder=${order}&${search}`
//   )
//   .then((res) => {
//     setItems(res.data);
//     setIsLoading(false);
//   });

// с помощью свойства await сократил код, как на примере выше, убрал .then

// try{}catch(){} - в try помещяем код, в catch - если ошибка! метод для
//  отлавливания ошибок в синхронном коде
