import {ApiError} from '../errors/api.error'

export function middlewareError (err:any, req:any,res:any,next:any){
  console.log(err)
  // если есть экземпляр класса ApiError то отрабатывает if
  if(err instanceof ApiError){
    return res.status(err.status).json({message: err.message, errors:err.errors})
  }
  return res.status(500).json({message:'Непредвиденная ошибка'})
}