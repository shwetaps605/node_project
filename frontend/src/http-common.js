import axios from "axios"

const ProductsClient = axios.create(
    {
        baseURL:"http://localhost:5000/api/v1/random",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }
)

export default ProductsClient