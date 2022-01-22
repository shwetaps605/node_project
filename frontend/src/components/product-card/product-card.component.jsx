import React from "react"
import './product-card.styles.scss'

const ProductCard = (props) => {

    return (
        <>
            <div className="product">
                <div
                    className='product__image'
                    style={{
                        backgroundImage: `url(${props.product.image})`
                    }}
                />

                <div>
                    <p className='product__name'>{props.product.name}</p>
                    <p className='product__price'>{props.product.price}</p>
                </div>
                <p className='product__desc'>{props.product.desc}</p>
                <div className='cta'>
                    <button
                        type='button'
                        onClick={() => removeProduct(props.product.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                            <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                        </svg>
                    </button>
                </div>


            </div>
        </>
    )

}

export default ProductCard