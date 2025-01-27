"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

type Animal = {
  id: number
  name: string
  species: string
  breed: string
  age: number
  description: string
  imageUrl: string
}

const animals: Animal[] = [
  {
    id: 1,
    name: "Buddy",
    species: "Dog",
    breed: "Labrador Retriever",
    age: 3,
    description: "Friendly and energetic Labrador looking for an active family.",
    imageUrl: "Dog - Labrador Retriever.png",
  },
  {
    id: 2,
    name: "Whiskers",
    species: "Cat",
    breed: "Siamese",
    age: 5,
    description: "Calm and affectionate Siamese cat seeking a quiet home.",
    imageUrl: "Siamese.png",
  },
  {
    id: 3,
    name: "Polly",
    species: "Bird",
    breed: "Parrot",
    age: 2,
    description: "Colorful and talkative parrot looking for an engaging owner.",
    imageUrl: "/Parrot.png?height=200&width=200",
  },
]

export default function AdoptAnimal() {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)
  const { toast } = useToast()

  const handleAdoptRequest = (animal: Animal) => {
    setSelectedAnimal(animal)
  }

  const handleSubmitAdoption = (event: React.FormEvent) => {
    event.preventDefault()
    // TODO: Implement API call to submit adoption request
    toast({
      title: "Adoption Request Submitted",
      description: `Thank you for your interest in adopting ${selectedAnimal?.name}. We'll be in touch soon!`,
    })
    setSelectedAnimal(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Adopt an Animal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animals.map((animal) => (
          <Card key={animal.id}>
            <CardHeader>
              <CardTitle>{animal.name}</CardTitle>
              <CardDescription>
                {animal.species} - {animal.breed}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={animal.imageUrl || "/placeholder.svg"}
                alt={animal.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p>{animal.description}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleAdoptRequest(animal)}>Request Adoption</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedAnimal} onOpenChange={() => setSelectedAnimal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adopt {selectedAnimal?.name}</DialogTitle>
            <DialogDescription>
              Please provide your contact information to submit an adoption request.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitAdoption}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" type="tel" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

