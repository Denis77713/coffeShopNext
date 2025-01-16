import express, { Request, Response } from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import { configDotenv } from 'dotenv'

const app = express()
// const PORT = configDotenv().parsed.port || 5000
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())
app.use(cors())
console.log(123)
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