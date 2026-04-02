import { createPinia, setActivePinia } from "pinia"
import { useCartStore } from "./cart"

describe('Cart Store', ()=>{
    beforeEach(()=>{
        setActivePinia(createPinia())
    })
    it('should add item to cart',()=>{
        const cartStore = useCartStore();
        const product = {
    "id": 1,
    "title": "Retro Canvas Messenger Bag",
    "slug": "retro-canvas-messenger-bag",
    "price": 85,
    "description": "A durable, vintage-inspired messenger bag with brass hardware and adjustable shoulder strap.",
    "category": {
      "id": 10,
      "name": "Travel Gear",
      "slug": "travel-gear",
      "image": "https://picsum.photos/seed/travel/600/400",
      "creationAt": "2024-01-10T09:00:00Z",
      "updatedAt": "2024-01-10T09:00:00Z"
    },
    "images": [
      "https://picsum.photos/seed/bag1/800/600",
      "https://picsum.photos/seed/bag2/800/600"
    ],
    "creationAt": "2024-03-10T14:20:00Z",
    "updatedAt": "2024-03-12T10:30:00Z"
  }
  cartStore.addToCart(product)
  expect(cartStore.getCart.size).toBe(1);
  expect(cartStore.total).toBe(94)
  expect(cartStore.getCart.has(product.id)).toBeTruthy();
    })
    test('should remove product from cart', ()=>{
        const cart = useCartStore();
        const product = {
    "id": 1,
    "title": "Retro Canvas Messenger Bag",
    "slug": "retro-canvas-messenger-bag",
    "price": 85,
    "description": "A durable, vintage-inspired messenger bag with brass hardware and adjustable shoulder strap.",
    "category": {
      "id": 10,
      "name": "Travel Gear",
      "slug": "travel-gear",
      "image": "https://picsum.photos/seed/travel/600/400",
      "creationAt": "2024-01-10T09:00:00Z",
      "updatedAt": "2024-01-10T09:00:00Z"
    },
    "images": [
      "https://picsum.photos/seed/bag1/800/600",
      "https://picsum.photos/seed/bag2/800/600"
    ],
    "creationAt": "2024-03-10T14:20:00Z",
    "updatedAt": "2024-03-12T10:30:00Z"
  }
  cart.addToCart(product);
  cart.removeFromCart(product);
  expect(cart.getCart.size).toBe(0);
  expect(cart.total).toBe(9);
  expect(cart.getCart.has(product.id)).toBeFalsy();
    })
    test('should clear cart', ()=>{
        const cart = useCartStore();
        const product = {
    "id": 1,
    "title": "Retro Canvas Messenger Bag",
    "slug": "retro-canvas-messenger-bag",
    "price": 85,
    "description": "A durable, vintage-inspired messenger bag with brass hardware and adjustable shoulder strap.",
    "category": {
      "id": 10,
      "name": "Travel Gear",
      "slug": "travel-gear",
      "image": "https://picsum.photos/seed/travel/600/400",
      "creationAt": "2024-01-10T09:00:00Z",
      "updatedAt": "2024-01-10T09:00:00Z"
    },
    "images": [
      "https://picsum.photos/seed/bag1/800/600",
      "https://picsum.photos/seed/bag2/800/600"
    ],
    "creationAt": "2024-03-10T14:20:00Z",
    "updatedAt": "2024-03-12T10:30:00Z"
  }
  cart.addToCart(product);
  cart.clearCart();
  expect(cart.getCart.size).toBe(0);
  expect(cart.total).toBe(9);
  expect(cart.getCart.has(product.id)).toBeFalsy();
    })
})