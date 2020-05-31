import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Icon, Row, Col, Card } from 'antd';
import Images from '../../utils/Images';

const { Meta } = Card

function LandingPage() {

	const [Products, setProducts] = useState([])

	useEffect(() => {
		axios.post('/api/product/getProducts')
		.then(res => {
			if (res.data.success) {
				setProducts(res.data.products)

				console.log(res.data.products)
			} else {
				alert('Failed to fetch product data!')
			}
		})
	}, [])

	const renderCards = Products.map((product, index) => (
		<Col lg={6} md={8} xs={24}>
			<Card
				hoverable={true}
				cover={<Images images={product.images} />}
			>
				<Meta
					title={product.title}
					description={`$${product.price}`}
				/>
			</Card>
		</Col>					
	))

	return (
		<div style={{ width: '75%', margin: '3rem auto' }}>
			<div style={{ textAlign: 'center' }}>
				<h2>Luxury Clothing For Dogs</h2>
			</div>

			{/* Filter */}
			{/* Search */}

			{Products.length === 0 ?
				<div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center'}}>
					<h2>No products available..</h2>
				</div> : 
				<div>
					<Row gutter={[16,16]}>
						{renderCards}
					</Row>

				</div>	
			}
			<br />
			<br />
			<div style={{ display: 'flex', justifyContent: 'center'}}>
				<button>View More</button>
			</div>

		</div>
	)
}

export default LandingPage
