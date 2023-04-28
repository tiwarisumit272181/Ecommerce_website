import { useAlert } from 'react-alert';
import React, {Fragment, useEffect, useState} from 'react';
import Loader from '../components/Loader'
import MetaData from '../components/MetaData'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails,clearErrors } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import {Carousel} from 'react-bootstrap'
import { addItemToCart } from '../actions/cartActions';

const ProductDetails = ({match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [quantity,setQuantity] = useState(1);
    const params = useParams();
    const {product,loading, error} = useSelector(state=>state.productDetails);
    useEffect(() =>{ 

        dispatch(getProductDetails(params.id))
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors);
        }
    
    },[dispatch,alert,error]);
    const increaseQty =()=>{
       
            if(quantity>=product.stock)
            {
                return;
            }
        
            
            setQuantity(quantity+1);

    }
    const decreaseQty =()=>{
       
        if(quantity<=1)
        {
            return;
        }
        
        setQuantity(quantity-1);
    }
    const addToCart = ()=>{
        dispatch(addItemToCart(params.id,quantity));
        alert.success("Item added successfully")
    }
  return (
    <Fragment>
        <MetaData title={product? product.name : ''}></MetaData>
      {loading? <Loader/> :<div className="row f-flex justify-content-around">
    <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <Carousel pause='hover'>
        {product ? product.images.map(image =>(
            <Carousel.Item key={image.pubic_id}>
            <img src={image.url} className='d-block w-100' alt={product.title}></img>
            </Carousel.Item>
           
        )): ""}
        </Carousel>
       
    </div>
    <div className="col-12 col-lg-5 mt-5">
        <h3></h3>
        <h6>{product ? product.name : ""}</h6>

        <p id="product_id">{product ? product._id : ""}</p>

        <hr/>

        <div className="rating-outer">
            <div className="rating-inner"></div>
        </div>
        <span id="no_of_reviews">({product ? product.numOfReviews : ""})</span>

        <hr/>

        <p id="product_price">Rs {product ? product.price : ""}</p>
        <div className="stockCounter d-inline">
            <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

            <input type="number" className="form-control count d-inline" value={quantity} readOnly />

            <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
        </div>
         <button type="button" id="cart_btn"  onClick={addToCart} className="btn btn-primary d-inline ml-4">Add to Cart</button>
        <hr/>

        <p>Status: <span id="stock_status" >{product ? (product.stock >0 ? "In Stock" : "Out Of Stock"): 'Out Of Stock'}</span></p>

        <hr/>

        <h4 className="mt-2">Description:</h4>
        <p>{product ? product.description : ""}</p>
        <hr/>
        <p id="product_seller mb-3">Sold by: <strong>{product ? product.seller :''}</strong></p>
        
        <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                    Submit Your Review
        </button>
        
        <div className="row mt-2 mb-5">
            <div className="rating w-50">

                <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                <ul className="stars" >
                                    <li className="star"><i className="fa fa-star"></i></li>
                                    <li className="star"><i className="fa fa-star"></i></li>
                                    <li className="star"><i className="fa fa-star"></i></li>
                                    <li className="star"><i className="fa fa-star"></i></li>
                                    <li className="star"><i className="fa fa-star"></i></li>
                                </ul>

                                <textarea name="review" id="review" className="form-control mt-3">

                                </textarea>

                                <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
                
    </div>

</div>
</div> }
    </Fragment>
    
    
  )
}

export default ProductDetails