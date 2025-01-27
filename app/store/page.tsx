"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

type Product = {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Premium Dog Food",
    description: "High-quality, nutritious food for adult dogs",
    price: 29.99,
    imageUrl: "dogfood.png?height=200&width=200",
  },
  {
    id: 2,
    name: "Cat Litter",
    description: "Odor-controlling, clumping cat litter",
    price: 14.99,
    imageUrl: "catfood.png?height=200&width=200",
  },
  {
    id: 3,
    name: "Bird Seed Mix",
    description: "Balanced seed mix for various bird species",
    price: 9.99,
    imageUrl: "birdfood.png?height=200&width=200",
  },
]

export default function Store() {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([])
  const { toast } = useToast()

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { product, quantity: 1 }])
    }
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter((item) => item.product.id !== productId))
    } else {
      setCart(cart.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Animal Foundation Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>${product.price.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p>{product.description}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.product.id} className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p>${item.product.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center">
                <Button variant="outline" size="sm" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                  -
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.product.id, Number.parseInt(e.target.value))}
                  className="w-16 mx-2 text-center"
                />
                <Button variant="outline" size="sm" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                  +
                </Button>
              </div>
            </div>
          ))}
          <div className="text-xl font-bold mt-4">Total: ${getTotalPrice()}</div>
          <Button
            className="mt-4"
            onClick={() => {
              toast({
                title: "Order Placed",
                description: "Thank you for your purchase!",
              })
              setCart([])
            }}
          >
            Place Order
          </Button>
        </div>
      )}
    </div>
  )
}

