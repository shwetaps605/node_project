import { useEffect, useState } from 'react'
import './addOrUpdateProduct.styles.scss'
import ProductsDataService from '../../services/products.service'

const AddorUpdateProduct = props => {

    const [isFormOpen, setIsFormVisible] = useState(true)
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productDesc, setProductDesc] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

    // const isUpdating = props.isUpdating

    useEffect(() => {
        if(props.isUpdating)populateFields()
    }, [props.isUpdating])



    const clearFields = () => {
        setProductName("")
        setProductPrice("")
        setProductDesc("")
    }

    const addProduct = () => {
        let product = {
            name: productName,
            price: productPrice,
            desc: productDesc
        }
        ProductsDataService.addProduct(product)
            .then(response => {
                props.updateProducts()
                setIsSubmitted(true)
                clearFields()
            })
            .catch(error => console.log(error))
    }

    const populateFields = () => {
        ProductsDataService.getProductsById(props.productId)
            .then(response => {
                console.log(response.data.product)
                let product = response.data.product
                setProductName(product.name)
                setProductPrice(product.price)
                setProductDesc(product.desc)
            })
            .catch(error => console.log("Cannot fetch product",error))
    }

    const updateProduct = () => {
        console.log("firing UPDATE PRODUCT operation", props.productId)
        let updatedProduct = {
            name:productName,
            price:productPrice,
            desc:productDesc
        }
        ProductsDataService.updateProduct(props.productId, updatedProduct)
        .then(response => {
            console.log(response)
            props.updateProducts()
            setIsSubmitted(true)
            clearFields()
        })
        .catch(error => console.log("Cannot update product",error))
    }

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

    return (
        <>
            <div className='add__products__form'>

                <div>
                    <button>
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
                    {
                        props.isUpdating ?
                            <button onClick={updateProduct}>
                                Update
                            </button> :
                            <button onClick={addProduct}>
                                Add
                            </button>

                    }

                </div>

            </div>
        </>
    )
}

export default AddorUpdateProduct