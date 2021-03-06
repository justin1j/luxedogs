import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { addToCart } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';

function ProductDetailPage({ match }) {
  const dispatch = useDispatch();
  const productId = match.params.productId
  const [Product, setProduct] = useState([])
  
  useEffect(() => {
    axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
    .then(res => { 
      console.log(res.data)
      setProduct(res.data[0])
    })
  }, [])

  const addToCartHandler = productId => {
    dispatch(addToCart(productId))
  }
  
  return (
    <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{Product.title}</h1>
      </div>

      <br />

      <Row gutter={[16, 16]} >
        <Col lg={12} xs={24}>
          <ProductImage detail={Product} />
        </Col>
        <Col lg={12} xs={24}>
          <ProductInfo detail={Product} addToCart={addToCartHandler} />
        </Col>
      </Row>
    </div>
  )
}

export default ProductDetailPage
