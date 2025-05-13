export type Iproduct = {
  id: number
  name: string
  imageUrl: string
  price: string
  best: string | null
  weight: string | null
  none: string
  drip: string
  number: number
  secondCategoryId: number | null
  categoryId: number
  like?: boolean
}

export type fileType = {
  lastModified: number
  lastModifiedDate: any
  name: string
  size: number
  type: string
  webkitRelativePath: string
}
export type IProductCart = {
  id: number
  imageUrl: string
  price: string
  name: string
  number: number
}
export type IProductCartStore = {
  id: number
  imageUrl: string
  price: string
  name: string
  number: number
  numProductsPay?: number | any
}
export type Star = {
  comment: string | null
  grade: number
  id: number
  productId: number
  userAnonim: boolean
  userId: number | null
}
export type TypeCategory = {
  id: number
  name: string
  image: string
  page: string
}
export type IProductPay = {
  userProduct: Iproduct[]
  complitePdoduct: Iproduct[]
  develery: Iproduct[]
}
export type IDataProductPay = {
  data: {
    userProduct: Iproduct[]
    complitePdoduct: Iproduct[]
    develery: Iproduct[]
  }
}
export type TypeGrade = {
  comment: string
  grade: number
  id: number
  productId: number
  userAnonim: boolean
  userId: number
}
export type TypeProductPay = {
  id: number
  num: number
  productId: number
  status: string
  sum: number
  userId: number
}
export type TypeUser = {
  id: number
  email: string
  password: string
  isActivated: boolean
  activationLink: string
  name: string
  lastName: string
  role: "user" | "admin" | "manager" | string
}
