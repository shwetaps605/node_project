import { useState, useEffect } from 'react'
import './product-list.component.scss'
import Product from '../product/product.component'

const ProductList = ({ products }) => {

    return (
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
                    </div>
                ))
            }
        </div>
    )


}

export default ProductList