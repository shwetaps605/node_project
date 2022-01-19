import React from "react"

const Product = props => {
    const {product} = props

    return(
        <div>
            <h1>Product Component</h1>
            <div className="product__container">
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>{product.desc}</p>
            </div>
        </div>
    )
}

export default Product