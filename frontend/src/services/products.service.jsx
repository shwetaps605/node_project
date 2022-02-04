import ProductsClient from '../http-common.js'

class ProductsDataService {
    
    static getAllProducts() {
        return ProductsClient.get('/')
    }
    static getProductsById(id) {
        return ProductsClient.get(`/${id}`)
    }
    static addProduct(data) {
        return ProductsClient.post('/',{"product":data})
    }
    static deleteProduct(id){
        return ProductsClient.delete(`/${id}`)
    }
    static updateProduct(id,data){
        return ProductsClient.put(`/${id}`,{"product":data})
    }
}

export default ProductsDataService