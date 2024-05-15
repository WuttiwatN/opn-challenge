export type Product = {
  price: number
}

export type Items = {
  [key: string]: Item
}

export type Item = {
  quantity: number
}

export type Discounts = {
  [key: string]: Discount
}

export type Discount = {
  type: DiscountType
  amount: number
  max?: number
}

export enum DiscountType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
}

export type Freebies = {
  [key: string]: Freebie
}

export type Freebie = {
  condition: FreebieCondition
  reward: FreebieReward
}

export type FreebieCondition = {
  type: FreebieConditionType
  productId: string
}

export type FreebieReward = {
  productId: string
  quantity: number
}

export enum FreebieConditionType {
  CONTAINS = 'contains',
}
