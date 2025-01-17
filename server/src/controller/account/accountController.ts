import { prisma } from "../../../../client/prisma/prisma-client"

 class UserControllerClass{
  async registrarion(req:any,res:any,next:any){
    try{
    
    }
    catch(e){
    
    }
  }
  async login(req:any,res:any,next:any){
    try{
    
    }
    catch(e){
    
    }
  }
  async logout(req:any,res:any,next:any){
    try{
    
    }
    catch(e){
    
    }
  }
  async activated(req:any,res:any,next:any){
    try{
    
    }
    catch(e){
    
    }
  }
  async refresh(req:any,res:any,next:any){
    try{
    
    }
    catch(e){
    
    }
  }
  async getUsers(req:any,res:any,next:any){
    try{
      const result = await prisma.category.findMany()
      console.log(result)
      console.log(result)
    }
    catch(e){
    
    }
  }
}

export const UserController = new UserControllerClass()