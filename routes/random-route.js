import expres from "express"
import ProductsController from '../controller/products-controller.js'

const router = expres.Router()

router.route('/')
.get(ProductsController.apiGetProducts)
.post(ProductsController.apiAddProduct)


router.route('/:id')
.get(ProductsController.apiGetProductById)
.delete(ProductsController.apiDeleteProductById)
.put(ProductsController.apiUpdateProduct)

export default router