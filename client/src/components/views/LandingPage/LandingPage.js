import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Icon, Row, Col, Card } from 'antd';
import Images from '../../utils/Images';
import CheckBox from './Sections/CheckBox';

const { Meta } = Card

function LandingPage() {

	const [Products, setProducts] = useState([]);
	const [Skip, setSkip] = useState(0);
	const [Limit, setLimit] = useState(8);
	const [DisplaySize, setDisplaySize] = useState(0);
	const [Filters, setFilters] = useState({
		size: [],
		price: []
	})

	const displayProducts = {
		skip: Skip,
		limit: Limit
	}

	useEffect(() => {
		getProducts(displayProducts)
	}, [])

	const getProducts = (displayProducts) => {
		console.log('here3', displayProducts)
		axios.post('/api/product/getProducts', displayProducts)
		.then(res => {
			if (res.data.success) {

				if (displayProducts.loadMore) {
					setProducts([...Products, ...res.data.products]) // has to be ...res.data.products to copy the items of the original array otherwise it will be array of array so map method in images component will not be invoked correctly.
				} else {
					setProducts(res.data.products)
				}
				setDisplaySize(res.data.displaySize)
			} else {
				alert('Failed to fetch product data!')
			}
		})
	}

	const onViewMore = () => {
		const maxItemsPerView = Skip + Limit;
		const displayMoreProducts = {...displayProducts, skip: maxItemsPerView, loadMore: true};
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

	const showFilteredResults = (filters) => {
		const newDisplayProducts = { ...displayProducts };
		newDisplayProducts.skip = 0;
		newDisplayProducts.filters = filters;
		console.log('here2', newDisplayProducts)
		getProducts(newDisplayProducts);
		setSkip(0);
	}

	const handleFilters = (filters, category) => {
		console.log(filters)
		
		const newFilters = { ...Filters };
		newFilters[category] = filters;
		
		if (category === 'price') {

		}
		console.log('here', newFilters)
		showFilteredResults(newFilters)
		setFilters(newFilters)
	}

	// Conditional Rendering for View More Button

	let isViewMoreButtonVisible;

	if (DisplaySize >= Limit) {
		isViewMoreButtonVisible = 
			<div style={{ display: 'flex', justifyContent: 'center'}}>
				<button onClick={onViewMore}>View More</button>
			</div>
	} 

	return (
		<div style={{ width: '75%', margin: '3rem auto' }}>
			<div style={{ textAlign: 'center' }}>
				<h2>Luxury Clothing For Dogs</h2>
			</div>

			{/* Filter */}

			<CheckBox
				handleFilters={filters => handleFilters(filters, 'size')}
			/>

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
