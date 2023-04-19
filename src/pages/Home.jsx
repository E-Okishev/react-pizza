import React from "react";
import axios from 'axios';
import qs from 'qs';
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom'

import {setCategoryId} from '../redux/slices/filterSlice'
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {categoryId, sort} = useSelector((state) => state.filter);

  const {searchValue} = React.useContext(SearchContext)
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1)

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
    }
  }, [])

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://641591c88b5d06e4a7b1c2be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then(res => {
        setItems(res.data);
        setIsLoading(false)
      })
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    })

    navigate(`?${queryString}`)
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)
  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index}/>)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
        <Sort/>
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