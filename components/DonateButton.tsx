"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Heart, Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const formSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
})

export default function DonateButton() {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
    },
  })

  const handleDonate = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      const upiLink = `upi://pay?pa=7489014432@yesbank&pn=Ayush%20Sen&am=${values.amount}&cu=INR`
      const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiLink)}&size=150x150`
      setQrCodeUrl(qrCode)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 rounded-full p-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg"
      >
        <Heart className="h-6 w-6" />
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Support Our College Project</DialogTitle>
          <DialogDescription>
            Help us make a difference in animal welfare. This project is developed by students at Govt. Madhav Science College, Ujjain.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleDonate)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (INR)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter donation amount"
                      {...field}
                      className="border-2 border-gray-300 focus:border-blue-500 transition duration-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {qrCodeUrl && (
              <div className="flex flex-col items-center gap-4">
                <p className="text-sm text-muted-foreground">Scan QR code to complete your donation</p>
                {isLoading ? (
                  <Skeleton className="w-[150px] h-[150px] rounded-lg" />
                ) : (
                  <img
                    src={qrCodeUrl || "/placeholder.svg"}
                    alt="Payment QR Code"
                    className="rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
                  />
                )}
              </div>
            )}
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating QR Code...
                  </>
                ) : (
                  "Generate Payment QR"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

