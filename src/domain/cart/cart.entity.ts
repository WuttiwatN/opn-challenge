import {
  Discount,
  DiscountType,
  Discounts,
  Freebie,
  FreebieCondition,
  FreebieConditionType,
  FreebieReward,
  Freebies,
  Item,
  Items,
} from 'src/common/types/cart.type'

import { mergeWith } from 'lodash'
import { mockProductCollection } from 'src/common/mockData'

export class CartEntity {
  readonly customerId: string
  readonly items: Items = {}
  readonly discounts: Discounts = {}
  readonly freebies: Freebies = {}

  constructor(customerId: string) {
    this.customerId = customerId
  }

  add(productId: string, quantity: number): void {
    this.items[productId] = { quantity: quantity < 0 ? 0 : quantity }
  }

  update(productId: string, quantity: number): void {
    if (this.items[productId]) {
      this.items[productId] = { quantity: quantity < 0 ? 0 : quantity }
    }
  }

  remove(productId: string): void {
    delete this.items[productId]
  }

  has(productId: string): boolean {
    const freebieItems = this.getFreebieItems()
    return !!this.items[productId] || !!freebieItems[productId]
  }

  isEmpty(): boolean {
    return !Object.keys(this.items).length
  }

  count(): Items {
    const freebieItems = this.getFreebieItems()
    const itemsMerged = this.mergeItems(this.items, freebieItems)
    return itemsMerged
  }

  quantity(): number {
    const freebieItems = this.getFreebieItems()
    const itemsMerged = this.mergeItems(this.items, freebieItems)
    return Object.values(itemsMerged).reduce(
      (total: number, item: Item) => total + item.quantity,
      0,
    )
  }

  total(): number {
    let totalPrice = Object.entries(this.items).reduce(
      (total: number, [productId, value]) =>
        total + value.quantity * mockProductCollection[productId].price,
      0,
    )
    Object.values(this.discounts).forEach((discount: Discount) => {
      const { type, amount, max } = discount
      switch (type) {
        case DiscountType.FIXED:
          totalPrice -= amount
          break
        case DiscountType.PERCENTAGE:
          const discount = totalPrice * (amount / 100)
          totalPrice -= discount > max ? max : discount
          break
      }
    })
    return totalPrice < 0 ? 0 : totalPrice
  }

  addDiscount(name: string, discount: Discount): void {
    this.discounts[name] = discount
  }

  removeDiscount(name: string): void {
    delete this.discounts[name]
  }

  addFreebie(
    name: string,
    condition: FreebieCondition,
    reward: FreebieReward,
  ): void {
    this.freebies[name] = { condition, reward }
  }

  private getFreebieItems(): Items {
    const freebieItems: Items = {}
    Object.values(this.freebies).forEach((freebie: Freebie) => {
      const { condition, reward } = freebie
      const { type: conditionType, productId: conditionProductId } = condition
      switch (conditionType) {
        case FreebieConditionType.CONTAINS:
          if (this.items[conditionProductId]) {
            const { productId, quantity } = reward
            freebieItems[productId] = {
              quantity: freebieItems[productId]
                ? freebieItems[productId].quantity + quantity
                : quantity,
            }
          }
          break
      }
    })
    return freebieItems
  }

  private mergeItems(itemsA: Items, itemsB: Items): Items {
    return mergeWith(
      { ...itemsA },
      { ...itemsB },
      (itemA: Item, itemB: Item) => {
        const quantityItemA = itemA?.quantity || 0
        const quantityItemB = itemB?.quantity || 0
        return { quantity: quantityItemA + quantityItemB }
      },
    )
  }
}
