export type Iproduct = {
  id: number
  name: string
  imageUrl: string
  price: string | null
  best: string | null
  weight: string | null
  none: string
  drip: string
  number: number | null
  secondCategoryId: number | null
  categoryId: number
}
export type fileType = {
  lastModified: number
  lastModifiedDate: any
  name: string
  size: number
  type: string
  webkitRelativePath: string
}

export type AdminItemType = {
  best: string
  categoryId: number
  drip: string
  id: number
  imageUrl: string
  name: string
  none: string
  number: number
  price: string
  secondCategoryId: null
  weight: string
}
