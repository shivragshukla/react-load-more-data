import { useState, useEffect } from 'react';
import './styles.css'

export default function LoadMoreData() {

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [count, setCount] = useState(0);
	const [disabled, setDisabled] = useState(false);


	async function fetchProducts(){
		setLoading(true);
		try {
			const resposne = await fetch(`https://dummyjson.com/products?limit=5&skip=${count * 5}`);
			const data = await resposne.json();

			if (data && data.products && data.products.length > 0) {
				setProducts([...products, ...data.products])
			}

			setLoading(false)

		} catch (e) {
			console.error(e);
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchProducts()
	},[count]);

	useEffect(() => {
		if (products.length === 0) {
			setDisabled(true)
		}
		else {
			setDisabled(false)
		}
	},[products]);

	return (
		<div className="container">
			<h1> Load More Data </h1>
			<p> Total Products: {products.length}</p>

			<div className="content">
				{
					products && products.length > 0 
					? products.map(product => 
						<div className="item" key={product.id}>
							<img 
								className="product-image"
								alt={product.title}
								src={product.thumbnail}
							/> 
							<span>
								{ product.title}
							</span>
						</div>
					)
					: <p>No data found</p>
				}
			</div>
			<button className="btn-load-more" onClick={() => setCount(count+1)} disabled={disabled}> Load More </button>
		</div>
	);
}
