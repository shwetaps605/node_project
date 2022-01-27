import { useState, useEffect } from 'react'
import './product-list.component.scss'
import Product from '../product/product.component'
import ProductsDataService from '../../services/products.service'
import ProductCard from '../product-card/product-card.component'
import AddorUpdateProduct from '../add-or-update-product/addOrUpdateProduct.component'
import SearchBar from '../search-bar/search-bar.component'

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
        setIsAdding(false)
        if(productId.length == 0){
            console.log("Abhi zero hai,should TOGGLE");
            setIsUpdating(!isUpdating)
        }else{
            console.log("Abhi zero hai,should TOGGLE");
            setIsUpdating(true)
        }
        setProductId(id)
    }

    const searchisChanging = () => {
        console.log("whoooooo");
    }


    const handleSearchInputChange = async e => {
        if (e.target.value.length > 0) {
            const filteredProducts = products.filter(product => {
                return product.name.toLowerCase().includes(e.target.value.toLowerCase())
            })
            console.log(e.target.value, filteredProducts)
            setFilterText(e.target.value)

            setProducts(filteredProducts)
        } else {

            console.log("FUCKING SEARCH BOX IS EMPTYYYY", e.target.value);
            fetchProducts()
        }



    }


    const fetchProducts = async () => {
        await ProductsDataService.getAllProducts()
            .then(response => {
                const fetchedProducts = response.data.products
                setProducts(fetchedProducts)
            })
            .catch(error => console.log(error))
    }

    const removeProduct = async productId => {
        await ProductsDataService.deleteProduct(productId)
            .then(response => {
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

            <SearchBar input={filterText} handleChange={handleSearchInputChange} onChange={searchisChanging} />



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