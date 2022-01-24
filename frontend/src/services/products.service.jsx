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
        console.log("WE GOT THE PROD",data)
        return ProductsClient.post('/',{"product":data})
    }
    static deleteProduct(id){
        console.log(id)
        return ProductsClient.delete(`/${id}`)
    }
    static updateProduct(id,data){
        console.log(id)
        console.log(data)
        return ProductsClient.put(`/${id}`,{"product":data})
    }
}

export default ProductsDataService