import { useState, useEffect } from 'react'
import './adding-product.styles.scss'

const AddProduct = () => {

    const [isAdding, setIsAdding] = useState(false)

    const isAddingProduct = () => {
        setIsAdding(true)
    }

    return (
        <div className='add__products__container'>
            {
                isAdding ?
                    <div>
                        <input 
                        type="text"
                        name = 'productName' />
                    </div> :
                    <button onClick={isAddingProduct} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" /></svg>
                    </button>
            }
        </div>
    )
}

export default AddProduct