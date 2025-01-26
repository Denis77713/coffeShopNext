import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { configDotenv } from 'dotenv'
import {accountRouter} from './routes/account/accountRoute'
import {middlewareError} from './middleware/error'

const app = express()
const PORT = configDotenv().parsed?.port || 5000
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use('/api', accountRouter)
app.use(middlewareError)
async function main(){
  try {
   
    app.get('/login',(req, res)=>{
      res.status(200).json({
        message:'complite!'
      })
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', '*')
      res.setHeader('Access-Control-Allow-Headers', '*')
      res.setHeader('Access-Control-Allow-Credentials', 'true')
      res.cookie('hello','world',{maxAge:6000})
      
    })
    app.listen(PORT,()=>{
      console.log('port: 5000')
    })  
  } catch (e) {
    console.log(e)
  }
  
}
main()