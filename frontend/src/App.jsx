import { useState, useEffect } from 'react'
import './App.scss'
import ProductsDataService from './services/products.service'
import ProductList from './components/product-list/product-list.component'

const App = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = () => {
        ProductsDataService.getAllProducts()
            .then(response => {
                //console.log(response.json());
                //console.log(response.data.products)
                setProducts(response.data.products)
            })
            .catch(error => console.log(error))
    }



    return (
        <div className='conatiner'>
            <div className='header__container'>
                <h1><strong><span>furnish.co</span></strong></h1>
                <p>Currently selling {products.length} pieces of delight</p>
            </div>
            <ProductList products={products}></ProductList>

        </div>
    )



}


export default App