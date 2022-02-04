import React from "react"
import './product-card.styles.scss'


const ProductCard = (props) => {

    const background__image__url = props.product.image ? props.product.image : "https://i.postimg.cc/J4chyj5b/image-product.png"

    return (
        <>
            <div className="product">
                <div
                    className='product__image'
    
                    style={{
                        backgroundImage: `url(${background__image__url})`
                    }}
                />

                <div>
                    <p className='product__name'>{props.product.name}</p>
                    <p className='product__price'>{props.product.price}</p>
                </div>
                <p className='product__desc'>{props.product.desc}</p>
                <div className='cta'>
                    <button
                        type="button"
                        onClick={() => { props.handleUpdate(props.product.id) }}>

                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M1.438 16.872l-1.438 7.128 7.127-1.438 12.642-12.64-5.69-5.69-12.641 12.64zm2.271 2.253l-.85-.849 11.141-11.125.849.849-11.14 11.125zm20.291-13.436l-2.817 2.819-5.69-5.691 2.816-2.817 5.691 5.689z" />\
                        </svg> */}
                        Edit
                    </button>
                    <button
                        type='button'
                        onClick={() => { props.handleDelete(props.product.id) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
                        </svg>
                    </button>
                </div>


            </div>
        </>
    )

}

export default ProductCard