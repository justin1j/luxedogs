import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Icon, Row, Col, Card } from 'antd';
import Images from '../../utils/Images';

const { Meta } = Card

function LandingPage() {

	const [Products, setProducts] = useState([]);
	const [Skip, setSkip] = useState(0);
	const [Limit, setLimit] = useState(8);
	const [DisplaySize, setDisplaySize] = useState(0);

	const displayProducts = {
		skip: Skip,
		limit: Limit
	}

	useEffect(() => {
		getProducts(displayProducts)
	}, [])

	const getProducts = (displayProducts) => {
		axios.post('/api/product/getProducts', displayProducts)
		.then(res => {
			if (res.data.success) {
				setProducts([...Products, ...res.data.products]) // has to be ...res.data.products to copy the items of the original array otherwise it will be array of array so map method in images component will not be invoked correctly.
				setDisplaySize(res.data.displaySize)

			} else {
				alert('Failed to fetch product data!')
			}
		})
	}

	const onViewMore = () => {
		const maxItemsPerView = Skip + Limit;
		const displayMoreProducts = {...displayProducts};
		displayMoreProducts.skip = maxItemsPerView; 
		getProducts(displayMoreProducts)
		setSkip(maxItemsPerView);
	}


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

	// Conditional Rendering for View More Button

	let isViewMoreButtonVisible;

	if (DisplaySize >= Limit) {
		isViewMoreButtonVisible = 
			<div style={{ display: 'flex', justifyContent: 'center'}}>
				<button onClick={onViewMore}>View More</button>
			</div>
	} 

	//
	
	console.log(DisplaySize)

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

			{isViewMoreButtonVisible}

		</div>
	)
}

export default LandingPage
