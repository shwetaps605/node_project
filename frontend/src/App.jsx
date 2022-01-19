import {useState, useEffect} from 'react'
import './App.css'
import ProductsDataService from './services/products.service'
import Product from './components/product.component'

const App = () => {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        fetchProducts()
    },[])

    const fetchProducts = () => {
        ProductsDataService.getAllProducts()
        .then(response => {
            //console.log(response.data.products)
            setProducts(response.data.products)
        })
        .catch(error => console.log(error))
    }

    console.log(products);

    return(
        <div>
            <h1>App Component</h1>
            <div className='container'>
                {
                    products.map((product)=>{
                        console.log(product);
                        <Product key={product.id} product={product}></Product>
                    })
                }
            </div>
        </div>
    )



}


export default App