import products from '../data/products.js'


class ProductsController {

    static apiGetProducts(req, res, next) {
        try {
            const data = {
                message: "Products successfully received",
                products
            }
            res.status(200).json(data)
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }

    static apiGetProductById(req, res, next) {
        try {
            let { id } = req.params
            let product = products.find(product => product.id === parseInt(id, 10))
            res.status(200).json({ message: "Success", product })
        } catch (e) {
            req.status(500).json({ error: e })
        }
    }

    static apiAddProduct(req, res, next) {

        const data = req.body.product

        let new_id = products.length + 1
        try {
            let product = {
                id: new_id,
                name: data.name,
                price: data.price,
                desc: data.desc
            }
            products.push(product)
            console.log("Successfully added product!")
            res.status(200).json({ message: "Successfully added product!", product })
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }

    static apiDeleteProductById(req, res, next) {
        try {
            let { id } = req.params
            let deletedProduct
            console.log(id)
            products.forEach((product, index) => {
                if (product.id === parseInt(id, 10)) {
                    deletedProduct = product
                    console.log("Removing product", product)
                    products.splice(index, 1)
                }
            })
            res.status(200).json({ message: "Product deleted successfully", product: deletedProduct })
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }

    static apiUpdateProduct(req, res, next) {

        const data = req.body.product

        try {
            let { id } = req.params
            let name = data.name || ""
            let price = data.price || -1
            let desc = data.desc
            
            let product = products.find(product => product.id === parseInt(id, 10))
            if (name.length !== 0) {
                product.name = name
            }
            if (price !== -1) {
                product.price = price
            }
            if (desc.length !== 0) {
                product.desc = desc
            }
            console.log("Successfully updated product!")
            res.status(200).json({ message: "Updated product succesfully", product })
        } catch (e) {
            res.status(500).json({ error: e })
        }
    }
}

export default ProductsController