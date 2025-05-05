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
