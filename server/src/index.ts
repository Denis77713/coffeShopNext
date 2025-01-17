import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { configDotenv } from 'dotenv'
import {accountRouter} from './routes/account/accountRoute'



const app = express()
const PORT = configDotenv().parsed?.port || 5000
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', accountRouter)

async function main(){
  try {
   
    app.use('/login',(reqest, resolve)=>{
      resolve.status(200).json({
        message:'complite!'
      })
    })
  
    app.listen(PORT,()=>{
      console.log('port: 5000')
    })  
  } catch (e) {
    console.log(e)
  }
  
}
main()