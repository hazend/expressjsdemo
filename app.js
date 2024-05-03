import express from "express";
import productRoutes from './routes/productRoutes.js'

const app = express()
// middlewere configuration
app.use(express.json())
app.use('/ibm', productRoutes)

app.listen(9999, ()=>console.log('server started'))



