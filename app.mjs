import express from 'express'
import cors from 'cors'
// import bodyParser from 'body-parser'
// import randomRoutes from './routes/random-route.js'

const PORT = 5000
const app = express()

//Middlewares
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
// app.use('/api/v1/random',randomRoutes)
app.use('*',(req,res)=> res.status(404).json({error:"Invalid URI, Content Not found"}))

app.listen(PORT,() => {
    console.log(`Server is listening on port ${PORT}`)
})

