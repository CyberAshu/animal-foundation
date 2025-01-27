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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

type Partner = {
  id: number
  name: string
  description: string
  imageUrl: string
}

const partners: Partner[] = [
  {
    id: 1,
    name: "City Animal Shelter",
    description: "Local animal shelter providing temporary homes for stray and surrendered animals.",
    imageUrl: "animalshelter.png?height=200&width=200",
  },
  {
    id: 2,
    name: "Paws for a Cause",
    description: "Non-profit organization dedicated to animal rescue and welfare education.",
    imageUrl: "Paws.png?height=200&width=200",
  },
  {
    id: 3,
    name: "Veterinary Clinic Network",
    description: "A network of veterinary clinics providing discounted services for rescued animals.",
    imageUrl: "VeterinaryClinicNetwork.png?height=200&width=200",
  },
]

export default function Collaborations() {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const { toast } = useToast()

  const handleContactRequest = (partner: Partner) => {
    setSelectedPartner(partner)
  }

  const handleSubmitContact = (event: React.FormEvent) => {
    event.preventDefault()
    // TODO: Implement API call to submit contact form
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${selectedPartner?.name}. They will contact you soon.`,
    })
    setSelectedPartner(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Collaborations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <Card key={partner.id}>
            <CardHeader>
              <CardTitle>{partner.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={partner.imageUrl || "/placeholder.svg"}
                alt={partner.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <CardDescription>{partner.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleContactRequest(partner)}>Contact</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedPartner} onOpenChange={() => setSelectedPartner(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact {selectedPartner?.name}</DialogTitle>
            <DialogDescription>Fill out this form to get in touch with our partner organization.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitContact}>
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
                <Label htmlFor="message" className="text-right">
                  Message
                </Label>
                <Textarea id="message" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Send Message</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

