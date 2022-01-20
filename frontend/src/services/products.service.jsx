import ProductsClient from '../http-common.js'

class ProductsDataService {
    
    static getAllProducts() {
        return ProductsClient.get('/')
    }
    static getProductsById(id) {
        console.log(id)
        return ProductsClient.get(`/${id}`)
    }
    static addProduct(data) {
        console.log(data)
        return ProductsClient.post('/',data)
    }
    static deleteProduct(id){
        console.log(id)
        return ProductsClient.delete(`/${id}`)
    }
    static updateProduct(id,data){
        console.log(id)
        console.log(data)
        return ProductsClient.put(`/${id}`,data)
    }
}

export default ProductsDataService