import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './MetaData'
import { useDispatch, useSelector} from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from '../product/product'
import Loader from './Loader';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';

import 'rc-slider/assets/index.css';

const Home = () => {
  const [currentPage,setCurrentPage] = useState(1);
  
  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;

  const { loading, products, error, productsCount, resPerPage} = useSelector(state=> state.products)
   
  useEffect(()=>{
    if(error)
    {
      return alert.error(error);
    }
      dispatch(getProducts(keyword,currentPage));
      
  },[dispatch,error,alert,keyword,currentPage]);
 

  function setCurrentPageNo(pageNumber){
    setCurrentPage(pageNumber)
  }
  return (
    <Fragment>
      {loading?  <Loader/>:(
        <Fragment>
   <MetaData title={'Buy Best Product Online'}/>
    <h1 id="products_heading">Latest Products</h1>
    <section id="products" className="container mt-5">
    <div className="row">

     
    {products && products.map(product=>{
          return(
        <Product key={product._id} product={product}></Product>
)})}
 </div>
    </section>
    {resPerPage<=productsCount&&(<div className="d-flex justify-content-center mt-5">
      <Pagination activePage={currentPage} 
      itemsCountPerPage={resPerPage}
      totalItemsCount={productsCount}
      onChange={setCurrentPageNo}
      nextPageText={'Next'}
      prevPageText={'Previous'}
      firstPageText={'First Page'}
      lastPageText={'Last Page'}
      itemClass='page-item'
      linkClass='page-link'/>
      </div>)}


    
        </Fragment>
      )}
      
    </Fragment>

  )
}

export default Home