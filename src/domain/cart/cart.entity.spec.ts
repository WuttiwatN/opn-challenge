import { DiscountType, FreebieConditionType } from 'src/common/types/cart.type'

import { CartEntity } from './cart.entity'

describe('cart', () => {
  const mockCustomerId = 'customer-1'

  it('create new instance', () => {
    const cart = new CartEntity(mockCustomerId)

    expect(cart).toBeDefined()
  })

  describe('add product', () => {
    it('when inputs are normal', () => {
      const cart = new CartEntity(mockCustomerId)

      cart.add('product-1', 1)
      cart.add('product-2', 2)

      expect(cart.items).toEqual({
        'product-1': {
          quantity: 1,
        },
        'product-2': {
          quantity: 2,
        },
      })
    })

    it('when quantity is less then 0', () => {
      const cart = new CartEntity(mockCustomerId)

      cart.add('product-1', -1)

      expect(cart.items).toEqual({
        'product-1': {
          quantity: 0,
        },
      })
    })
  })

  describe('update product', () => {
    it('when there is product to update', () => {
      const cart = new CartEntity(mockCustomerId)

      cart.add('product-1', 1)
      cart.update('product-1', 2)

      expect(cart.items).toEqual({
        'product-1': {
          quantity: 2,
        },
      })
    })

    it('when there is no product to update', () => {
      const cart = new CartEntity(mockCustomerId)

      cart.add('product-1', 1)
      cart.update('product-2', 2)

      expect(cart.items).toEqual({
        'product-1': {
          quantity: 1,
        },
      })
    })

    it('when quantity is less then 0', () => {
      const cart = new CartEntity(mockCustomerId)

      cart.add('product-1', 1)
      cart.update('product-1', -1)

      expect(cart.items).toEqual({
        'product-1': {
          quantity: 0,
        },
      })
    })
  })

  describe('remove product', () => {
    it('remove existing product', () => {
      const cart = new CartEntity(mockCustomerId)

      cart.add('product-1', 1)
      cart.remove('product-1')

      expect(cart.items).toEqual({})
    })

    it('remove non-existing product', () => {
      const cart = new CartEntity(mockCustomerId)

      cart.add('product-1', 1)
      cart.remove('non-product-id')

      expect(cart.items).toEqual({
        'product-1': {
          quantity: 1,
        },
      })
    })
  })

  describe('has product', () => {
    it('when there is product', () => {
      const cart = new CartEntity(mockCustomerId)

      cart.add('product-1', 1)

      expect(cart.has('product-1')).toEqual(true)
    })

    it('when there is no product', () => {
      const cart = new CartEntity(mockCustomerId)

      expect(cart.has('product-1')).toEqual(false)
    })
  })

  describe('isEmpty product', () => {
    it('when cart is empty', () => {
      const cart = new CartEntity(mockCustomerId)

      expect(cart.isEmpty()).toEqual(true)
    })

    it('when cart is not empty', () => {
      const cart = new CartEntity(mockCustomerId)

      cart.add('product-1', 1)

      expect(cart.isEmpty()).toEqual(false)
    })
  })

  describe('count product', () => {
    it('when cart is empty', () => {
      const cart = new CartEntity(mockCustomerId)

      expect(cart.count()).toEqual({})
    })

    it('when cart is not empty', () => {
      const cart = new CartEntity(mockCustomerId)

      cart.add('product-1', 1)

      expect(cart.count()).toEqual({ 'product-1': { quantity: 1 } })
    })
  })

  describe('quantity product', () => {
    it('when cart is empty', () => {
      const cart = new CartEntity(mockCustomerId)

      expect(cart.quantity()).toEqual(0)
    })

    it('when cart is not empty', () => {
      const cart = new CartEntity(mockCustomerId)

      cart.add('product-1', 1)
      cart.add('product-2', 1)

      expect(cart.quantity()).toEqual(2)
    })
  })

  describe('total product', () => {
    it('when cart is empty', () => {
      const cart = new CartEntity(mockCustomerId)

      expect(cart.total()).toEqual(0)
    })

    it('when cart is not empty', () => {
      const cart = new CartEntity(mockCustomerId)

      cart.add('product-1', 1)
      cart.add('product-2', 1)

      expect(cart.total()).toEqual(300)
    })
  })

  describe('add discount', () => {
    describe('discount type fixed', () => {
      it('total price is more than discount', () => {
        const cart = new CartEntity(mockCustomerId)

        cart.add('product-1', 1)
        cart.add('product-2', 1)
        cart.addDiscount('discount-1', {
          type: DiscountType.FIXED,
          amount: 100,
        })

        expect(cart.total()).toEqual(200)
      })

      it('total price is less than discount', () => {
        const cart = new CartEntity(mockCustomerId)

        cart.add('product-1', 1)
        cart.add('product-2', 1)
        cart.addDiscount('discount-1', {
          type: DiscountType.FIXED,
          amount: 400,
        })

        expect(cart.total()).toEqual(0)
      })
    })

    describe('discount type percentage', () => {
      it('total price is more than discount', () => {
        const cart = new CartEntity(mockCustomerId)

        cart.add('product-1', 1)
        cart.add('product-2', 1)
        cart.addDiscount('discount-1', {
          type: DiscountType.PERCENTAGE,
          amount: 10,
          max: 200,
        })

        expect(cart.total()).toEqual(270)
      })

      it('total price is less than discount', () => {
        const cart = new CartEntity(mockCustomerId)

        cart.add('product-1', 1)
        cart.add('product-2', 1)
        cart.addDiscount('discount-1', {
          type: DiscountType.PERCENTAGE,
          amount: 110,
          max: 400,
        })

        expect(cart.total()).toEqual(0)
      })

      it('discount is more than max config', () => {
        const cart = new CartEntity(mockCustomerId)

        cart.add('product-1', 1)
        cart.add('product-2', 1)
        cart.addDiscount('discount-1', {
          type: DiscountType.PERCENTAGE,
          amount: 10,
          max: 20,
        })

        expect(cart.total()).toEqual(280)
      })

      it('forget set max config', () => {
        const cart = new CartEntity(mockCustomerId)

        cart.add('product-1', 1)
        cart.add('product-2', 1)
        cart.addDiscount('discount-1', {
          type: DiscountType.PERCENTAGE,
          amount: 10,
        })

        expect(cart.total()).toEqual(270)
      })
    })

    describe('multiple discount', () => {
      it('two discount type fixed', () => {
        const cart = new CartEntity(mockCustomerId)

        cart.add('product-1', 1)
        cart.add('product-2', 1)
        cart.addDiscount('discount-1', {
          type: DiscountType.FIXED,
          amount: 100,
        })
        cart.addDiscount('discount-2', {
          type: DiscountType.FIXED,
          amount: 100,
        })

        expect(cart.total()).toEqual(100)
      })

      it('two discount type percentage', () => {
        const cart = new CartEntity(mockCustomerId)

        cart.add('product-1', 1)
        cart.add('product-2', 1)
        cart.addDiscount('discount-1', {
          type: DiscountType.PERCENTAGE,
          amount: 10,
          max: 200,
        })
        cart.addDiscount('discount-2', {
          type: DiscountType.PERCENTAGE,
          amount: 10,
          max: 200,
        })

        expect(cart.total()).toEqual(243)
      })

      it('one discount type fixed and percentage', () => {
        const cart = new CartEntity(mockCustomerId)

        cart.add('product-1', 1)
        cart.add('product-2', 1)
        cart.addDiscount('discount-1', {
          type: DiscountType.FIXED,
          amount: 100,
        })
        cart.addDiscount('discount-2', {
          type: DiscountType.PERCENTAGE,
          amount: 10,
          max: 200,
        })

        expect(cart.total()).toEqual(180)
      })
    })

    it('add the same discount name', () => {
      const cart = new CartEntity(mockCustomerId)

      cart.add('product-1', 1)
      cart.add('product-2', 1)
      cart.addDiscount('discount-1', {
        type: DiscountType.FIXED,
        amount: 100,
      })
      cart.addDiscount('discount-1', {
        type: DiscountType.FIXED,
        amount: 150,
      })

      expect(cart.total()).toEqual(150)
    })
  })

  describe('remove discount', () => {
    it('remove existing discount', () => {
      const cart = new CartEntity(mockCustomerId)

      cart.add('product-1', 1)
      cart.add('product-2', 1)
      cart.addDiscount('discount-1', {
        type: DiscountType.PERCENTAGE,
        amount: 10,
        max: 200,
      })
      cart.removeDiscount('discount-1')

      expect(cart.total()).toEqual(300)
    })

    it('remove non-existing discount', () => {
      const cart = new CartEntity(mockCustomerId)

      cart.add('product-1', 1)
      cart.add('product-2', 1)
      cart.addDiscount('discount-1', {
        type: DiscountType.PERCENTAGE,
        amount: 10,
        max: 200,
      })
      cart.removeDiscount('discount-2')

      expect(cart.total()).toEqual(270)
    })
  })

  describe('add freebie', () => {
    describe('freebie type contain', () => {
      it('one freebie', () => {
        const cart = new CartEntity(mockCustomerId)

        cart.add('product-1', 1)
        cart.addFreebie(
          'freebie-1',
          { type: FreebieConditionType.CONTAINS, productId: 'product-1' },
          { productId: 'product-2', quantity: 1 },
        )

        expect(cart.has('product-2')).toEqual(true)
        expect(cart.count()).toEqual({
          'product-1': {
            quantity: 1,
          },
          'product-2': {
            quantity: 1,
          },
        })
        expect(cart.quantity()).toEqual(2)
        expect(cart.total()).toEqual(100)
      })

      it('two different freebie name', () => {
        const cart = new CartEntity(mockCustomerId)

        cart.add('product-1', 1)
        cart.add('product-2', 1)
        cart.addFreebie(
          'freebie-1',
          { type: FreebieConditionType.CONTAINS, productId: 'product-1' },
          { productId: 'product-3', quantity: 1 },
        )
        cart.addFreebie(
          'freebie-2',
          { type: FreebieConditionType.CONTAINS, productId: 'product-2' },
          { productId: 'product-4', quantity: 1 },
        )

        expect(cart.has('product-3')).toEqual(true)
        expect(cart.has('product-4')).toEqual(true)
        expect(cart.count()).toEqual({
          'product-1': {
            quantity: 1,
          },
          'product-2': {
            quantity: 1,
          },
          'product-3': {
            quantity: 1,
          },
          'product-4': {
            quantity: 1,
          },
        })
        expect(cart.quantity()).toEqual(4)
        expect(cart.total()).toEqual(300)
      })

      it('two different freebie name but same reward', () => {
        const cart = new CartEntity(mockCustomerId)

        cart.add('product-1', 1)
        cart.add('product-2', 1)
        cart.addFreebie(
          'freebie-1',
          { type: FreebieConditionType.CONTAINS, productId: 'product-1' },
          { productId: 'product-3', quantity: 1 },
        )
        cart.addFreebie(
          'freebie-2',
          { type: FreebieConditionType.CONTAINS, productId: 'product-2' },
          { productId: 'product-3', quantity: 1 },
        )

        expect(cart.has('product-3')).toEqual(true)
        expect(cart.count()).toEqual({
          'product-1': {
            quantity: 1,
          },
          'product-2': {
            quantity: 1,
          },
          'product-3': {
            quantity: 2,
          },
        })
        expect(cart.quantity()).toEqual(4)
        expect(cart.total()).toEqual(300)
      })

      it('two different freebie name but reward with the same as one in cart', () => {
        const cart = new CartEntity(mockCustomerId)

        cart.add('product-1', 1)
        cart.add('product-2', 1)
        cart.addFreebie(
          'freebie-1',
          { type: FreebieConditionType.CONTAINS, productId: 'product-1' },
          { productId: 'product-2', quantity: 1 },
        )

        expect(cart.count()).toEqual({
          'product-1': {
            quantity: 1,
          },
          'product-2': {
            quantity: 2,
          },
        })
        expect(cart.quantity()).toEqual(3)
        expect(cart.total()).toEqual(300)
      })
    })
  })

  describe('discount with freebie', () => {
    it('one discount and one freebie', () => {
      const cart = new CartEntity(mockCustomerId)

      cart.add('product-1', 1)
      cart.addFreebie(
        'freebie-1',
        { type: FreebieConditionType.CONTAINS, productId: 'product-1' },
        { productId: 'product-2', quantity: 1 },
      )
      cart.addDiscount('discount-1', {
        type: DiscountType.FIXED,
        amount: 20,
      })

      expect(cart.has('product-2')).toEqual(true)
      expect(cart.count()).toEqual({
        'product-1': {
          quantity: 1,
        },
        'product-2': {
          quantity: 1,
        },
      })
      expect(cart.quantity()).toEqual(2)
      expect(cart.total()).toEqual(80)
    })
  })
})
