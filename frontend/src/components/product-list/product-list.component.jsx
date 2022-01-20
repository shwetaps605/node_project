import {useState,useEffect} from 'react'
import './product-list.component.scss'
import Product from '../product/product.component'

const ProductList = ({products}) => {
    
    return(
        <div className="products__list__container">
            {
                products.map(product => <Product product={product}></Product>)
            }
        </div>
    )

    
}

export default ProductList