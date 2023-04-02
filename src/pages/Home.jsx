import React from "react";
import ReactPaginate from "react-paginate";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination";

function Home({searchValue}) {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1)
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sort: 'rating'
  });
  const [categoryId, setCategoryId] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sort.replace('-', '');
    const order = sortType.sort.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://641591c88b5d06e4a7b1c2be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false)
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)
  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index}/>)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)}/>
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)}/>
      </div>
      <h1 className="content__title">Все пиццы</h1>
      <div className="content__items">
        {isLoading ? skeletons : pizzas}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)}/>
    </div>
  )
}

export default Home