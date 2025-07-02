export type Iproduct = {
  id: number
  name: string | any
  imageUrl: string | any
  price: string | any
  best: string | any
  weight: string | any
  none: string | any
  drip: string | any
  number: number | any
  secondCategoryId: number | any
  categoryId: number | any
  like?: boolean | any
  text?: string | null
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
export type newDataManagerItem = {
  id: number
  userId: number
  productId: number
  sum: number
  status: string
  num: number
  developId?: string
  imageUrl: string
  text: string
  textStatus: string
}
export type TypeDevelop = {
  developId: string
  id: number
  name: string
  num: number
  productId: number
  status: string
  sum: number
  textStatus: string
  userId: number
}
export type TypeprductPay = {
  successfulOrder: TypeDevelop[]
  received: TypeDevelop[]
  delivered: TypeDevelop[]
}
