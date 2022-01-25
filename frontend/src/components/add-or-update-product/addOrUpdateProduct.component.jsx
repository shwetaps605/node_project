import { useEffect, useState } from 'react'
import './addOrUpdateProduct.styles.scss'
import ProductsDataService from '../../services/products.service'
import { v4 as uuidv4 } from 'uuid';
import Response from '../response/response.component';

const AddorUpdateProduct = props => {

    // const [isFormOpen, setIsFormVisible] = useState(true)
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productDesc, setProductDesc] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)

    useEffect(() => {
        if (props.isUpdating) populateFields()
    }, [props.isUpdating])


    const clearFields = () => {
        setProductName("")
        setProductPrice("")
        setProductDesc("")
    }

    const addProduct = () => {
        const id = uuidv4()
        let product = {
            id: id,
            name: productName,
            price: productPrice,
            desc: productDesc
        }
        ProductsDataService.addProduct(product)
            .then(response => {
                props.updateProducts()
                setTimeout(()=>{setIsSubmitted(true)},3000)
                setIsSubmitted(false)
                clearFields()
            })
            .catch(error => console.log(error))
    }

    const populateFields = () => {
        ProductsDataService.getProductsById(props.productId)
            .then(response => {
                let product = response.data.product
                setProductName(product.name)
                setProductPrice(product.price)
                setProductDesc(product.desc)
            })
            .catch(error => console.log("Cannot fetch product", error))
    }

    const updateProduct = () => {
        let updatedProduct = {
            name: productName,
            price: productPrice,
            desc: productDesc
        }
        ProductsDataService.updateProduct(props.productId, updatedProduct)
            .then(response => {
                props.updateProducts()
                setTimeout(()=>{setIsSubmitted(true)},3000)
                setIsSubmitted(false)
                clearFields()
            })
            .catch(error => console.log("Cannot update product", error))
    }

    const handleChange = (e) => {
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
                    <button onClick={!props.isUpdating ? props.toggleForm : () => { props.toggleForm("") }}>
                        Close
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

            {
                isSubmitted ? <p>Operation done successfully</p> : ""
            }
        </>
    )
}

export default AddorUpdateProduct