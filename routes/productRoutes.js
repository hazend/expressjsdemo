import express from 'express'
import products from '../model/products.js'

const router = express.Router()

router.get('/api/products', (req,res)=>{
    res.json(products)
})


router.post('/api/products', (req,res)=>{
    const newProduct = req.body
    if(!newProduct.productName || !newProduct.price){
        res.status(400).json({msg: 'product Name and Price is mandatory'})
    }
    products.push(newProduct)

    res.json(products)
})

router.put('/api/products/:id', (req,res)=>{

    const id = req.params.id
    const exists = products.some(product=>product.productId === +id)
    if(exists){
        const productTobeUpdated = req.body
        products.forEach(productAlreadyInArray=>{
            if(productTobeUpdated.productId === productAlreadyInArray.productId) {
                productAlreadyInArray = Object.assign(productAlreadyInArray, productTobeUpdated)
                res.json({msg:`${productAlreadyInArray.productName} updated !!!`})
            }
        })
    } else res.status(400).json({msg: `Product ${id} does not exists`})
})

router.delete('/api/products/:id', (req,res)=>{

    const id = req.params.id
    const exists = products.some(product=>product.productId === +id)
    if(exists) {
        products.filter(product=>product.productId !== +id)
        res.json({msg:`Product ${id} dleted !!!`})
    } else res.status(400).json({msg: `Product ${id} does not exists`})


})

export default router