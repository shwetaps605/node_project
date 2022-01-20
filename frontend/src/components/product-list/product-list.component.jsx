import { useState, useEffect } from 'react'
import './product-list.component.scss'
import Product from '../product/product.component'
import ProductsDataService from '../../services/products.service'

const ProductList = (props) => {

    const [products, setProducts] = useState([])
    const [filterText, setFilterText] = useState("")

    useEffect(() => {
        fetchProducts()
    }, [])

    const filterProducts = () => {
        
        const filteredProducts = products.filter((product)=>
            product.name.toLowerCase().includes(filterText.toLowerCase())
        )
        setProducts(filteredProducts)
    }

    const handleSearchInputChange = (e) => {
        setFilterText(e.target.value)
        console.log(filterText);

        filterProducts()
    }

    const fetchProducts = () => {
        ProductsDataService.getAllProducts()
            .then(response => {
                //console.log(response.json());
                //console.log(response.data.products)
                setProducts(response.data.products)
            })
            .catch(error => console.log(error))
    }

    const removeProduct = (productId) => {
        console.log("Selected Product ID:", productId)
        ProductsDataService.deleteProduct(productId)
            .then(response => {
                console.log("Product deleted")
                fetchProducts()
            })
            .catch(error => console.log(error))
    }


    return (

        <>
            <div className="search__product__container">
                <div>
                    <input type="text"
                        name="searchField"
                        onChange={handleSearchInputChange}
                        id="searchInput"
                        placeholder='search product' />
                    
                </div>
            </div>
            <div className="products__list__container">
                {
                    products.map(product => (
                        <div key={product.id} className="product">
                            <div
                                className='product__image'
                                style={{
                                    backgroundImage: `url(${product.image})`
                                }}
                            />

                            <div>
                                <p className='product__name'>{product.name}</p>
                                <p className='product__price'>{product.price}</p>
                            </div>
                            <p className='product__desc'>{product.desc}</p>
                            <div className='cta'>
                                <button
                                    type='button'
                                    onClick={() => removeProduct(product.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                                        <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                                    </svg>
                                </button>
                            </div>

                        </div>
                    ))
                }
            </div>

        </>


    )


}

export default ProductList