import React, { useEffect, useState } from 'react'
import { Descriptions, Button } from 'antd'

function ProductInfo({ detail, addToCart }) {

  const [Product, setProduct] = useState({})

  useEffect(() => {
    setProduct(detail)
  }, [detail])

  const addToCartHandler = () => {
    addToCart(detail._id)
    console.log(detail._id)
  }

  return (
    <div>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Price">{Product.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{Product.views}</Descriptions.Item>
        <Descriptions.Item label="Description">{Product.description}</Descriptions.Item>
      </Descriptions>
        <br />
        <br />
        <br />
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <Button size="large" shape="round" type="danger" onClick={addToCartHandler}>
            Add to Cart
          </Button>
        </div>

    </div>
  )
}

export default ProductInfo
