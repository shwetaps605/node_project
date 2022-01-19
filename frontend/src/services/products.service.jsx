import ProductsClient from '../http-common.js'

class ProductsDataService {
    
    static getAllProducts() {
        return ProductsClient.get('/')
    }
    getProductsById(id) {
        console.log(id)
        return ProductsClient.get(`/${id}`)
    }
    addProduct(data) {
        console.log(data)
        return ProductsClient.post('/',data)
    }
    deleteProduct(id){
        console.log(id)
        return ProductsClient.delete(`/${id}`)
    }
    updateProduct(id,data){
        console.log(id)
        console.log(data)
        return ProductsClient.put(`/${id}`,data)
    }
}

export default ProductsDataService