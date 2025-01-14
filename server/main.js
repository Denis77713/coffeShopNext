import express from 'express'

const app = express()

async function main(){
  app.use(express.json())

  app.use('/login',(reqest, resolve)=>{
    resolve.status(200).json({
      message:'complite!'
    })
  })

  app.listen(5000,()=>{
    console.log('port: 5000')
  })
}
main()