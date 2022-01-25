import { useState, useEffect } from 'react'
import './product-list.component.scss'
import Product from '../product/product.component'
import ProductsDataService from '../../services/products.service'
import ProductCard from '../product-card/product-card.component'
import AddorUpdateProduct from '../add-or-update-product/addOrUpdateProduct.component'


const ProductList = (props) => {

    const [products, setProducts] = useState([])
    const [filterText, setFilterText] = useState("")
    const [isAdding, setIsAdding] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [productId, setProductId] = useState("")

    useEffect(() => {
        fetchProducts()
    }, [])


    const toggleIsAddingProduct = () => {
        setIsAdding(!isAdding)
        setIsUpdating(false)
    }

    const toggleIsUpdatingProduct = (id) => {
        console.log("Toogle k andar product id is", id)
        setIsAdding(false)
        setIsUpdating(!isUpdating)
        setProductId(id)
    }


    const handleSearchInputChange = async (e) => {
        await setFilterText(e.target.value)
        setProducts(!filterText ? products : products.filter(product => {
            product.name.toLowerCase().includes(filterText.toLowerCase())
        }))
        console.log(products);
    }


    const fetchProducts = () => {
        ProductsDataService.getAllProducts()
            .then(response => {
                setProducts(response.data.products)
            })
            .catch(error => console.log(error))
    }

    const removeProduct = (productId) => {
        ProductsDataService.deleteProduct(productId)
            .then(response => {
                console.log("Product deleted")
                fetchProducts()
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <div className='add__products__container'>
                {
                    isAdding ?
                        <AddorUpdateProduct
                            isUpdating={false}
                            updateProducts={fetchProducts}
                            toggleForm={toggleIsAddingProduct}
                        >
                        </AddorUpdateProduct> :

                        <button onClick={toggleIsAddingProduct} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
                            </svg>
                        </button>

                }
                {
                    isUpdating &&
                    <AddorUpdateProduct
                        productId={productId}
                        isUpdating={true}
                        updateProducts={fetchProducts}
                        toggleForm={() => { toggleIsUpdatingProduct("") }}
                    >
                    </AddorUpdateProduct>
                }
            </div>

            <div className="search__product__container">
                <div>
                    <input type="text"
                        name="searchField"
                        onChange={handleSearchInputChange}
                        value={filterText}
                        id="searchInput"
                        placeholder='search product' />

                </div>
            </div>

            <div className="products__list__container">
                {
                    products.map(product => (

                        <ProductCard
                            key={product.id}
                            product={product}
                            handleChange={() => { removeProduct(product.id) }}
                            toggleUpdate={() => { toggleIsUpdatingProduct(product.id) }}
                        >
                        </ProductCard>
                    ))
                }
            </div>

        </>


    )


}

export default ProductList