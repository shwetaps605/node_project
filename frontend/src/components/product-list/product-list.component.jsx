import { useState, useEffect } from 'react'
import './product-list.component.scss'
import Product from '../product/product.component'
import ProductsDataService from '../../services/products.service'
import ProductCard from '../product-card/product-card.component'

const ProductList = (props) => {

    const [products, setProducts] = useState([])
    const [filterText, setFilterText] = useState("")
    const [isAdding, setIsAdding] = useState(false)
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productDesc, setProductDesc] = useState("")


    useEffect(() => {
        fetchProducts()
    }, [])

    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value);
        if (e.target.name === "productNameInput") {
            const name = e.target.value
            if (name) {
                setProductName(name)
            }
            else {
                setProductName("")
            }
        }
        else if (e.target.name === "productPriceInput") {
            const price = parseFloat(e.target.value)
            if (price) {
                setProductPrice(price)
            }
            else {
                setProductPrice("")
            }
        }
        else if (e.target.name === "productDescInput") {
            const desc = e.target.value
            if (desc) {
                setProductDesc(desc)
            }
            else {
                setProductDesc("")
            }
        }
    }


    const toggleIsAddingProduct = () => {
        setIsAdding(!isAdding)
    }

    const addProduct = () => {
        const product = {
            name: productName,
            price: productPrice,
            desc: productDesc
        }
        ProductsDataService.addProduct(product)
            .then(response => { fetchProducts() })
            .catch(error => console.log(error))
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
                        <div className='add__products__form'>

                            <div>
                                <button onClick={toggleIsAddingProduct}>
                                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 19.168L13.815 10.981L22 2.807L19.168 0L10.986 8.179L2.81 0L0 2.81L8.186 11.006L0 19.19L2.81 22L11.013 13.808L19.193 22L22 19.168Z" fill="#974444" />
                                    </svg>

                                </button>
                            </div>

                            <input
                                type="text"
                                name='productNameInput'
                                onChange={handleChange}
                                value={productName}
                                placeholder="enter product name"
                                required
                            />

                            <input
                                type="text"
                                name='productPriceInput'
                                onChange={handleChange}
                                value={productPrice}
                                placeholder="enter product price"
                                required
                            />

                            <input
                                type="text"
                                name='productDescInput'
                                onChange={handleChange}
                                value={productDesc}
                                placeholder="enter product desc"
                            />

                            <div>
                                <button onClick={addProduct}>Add</button>
                            </div>

                        </div> :
                        <button onClick={toggleIsAddingProduct} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
                            </svg>
                        </button>
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
                        <ProductCard key={product.id} product={product} handleChange={()=>{removeProduct(product.id)}}></ProductCard>
                    ))
                }
            </div>

        </>


    )


}

export default ProductList