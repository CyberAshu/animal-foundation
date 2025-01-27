"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion } from "framer-motion"

const formSchema = z.object({
  species: z.string().min(2, {
    message: "Species must be at least 2 characters.",
  }),
  condition: z.string().min(2, {
    message: "Condition must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  description: z.string().optional(),
})

export default function ReportAnimal() {
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [classification, setClassification] = useState<{ species: string; condition: string } | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      species: "",
      condition: "",
      location: "",
      description: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, imageUrl }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit report")
      }

      toast({
        title: "Report submitted",
        description: "Thank you for reporting this animal. We'll look into it as soon as possible.",
      })
      form.reset()
      setImageUrl("")
      setClassification(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsLoading(true)
      try {
        const formData = new FormData()
        formData.append("image", file)
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Failed to upload image")
        }

        const data = await response.json()
        setImageUrl(data.url)

        const classificationResponse = await fetch("/api/classify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl: data.url }),
        })

        if (!classificationResponse.ok) {
          throw new Error("Failed to classify image")
        }

        const classificationData = await classificationResponse.json()
        setClassification(classificationData)

        toast({
          title: "Image Processed",
          description: `AI Classification: ${classificationData.species}, Condition: ${classificationData.condition}`,
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to process image. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardTitle className="text-2xl">Report an Animal</CardTitle>
          <CardDescription className="text-gray-100">Help us locate and assist animals in need</CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="species"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Species</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Dog, Cat, Bird"
                        {...field}
                        className="border-2 border-gray-300 focus:border-blue-500 transition duration-300"
                      />
                    </FormControl>
                    <FormDescription>What kind of animal are you reporting?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500 transition duration-300">
                          <SelectValue placeholder="Select the animal's condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="healthy">Healthy</SelectItem>
                          <SelectItem value="injured">Injured</SelectItem>
                          <SelectItem value="sick">Sick</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>What is the animal's current condition?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 123 Main St, City, State"
                        {...field}
                        className="border-2 border-gray-300 focus:border-blue-500 transition duration-300"
                      />
                    </FormControl>
                    <FormDescription>Where did you see the animal?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide any additional information about the animal or the situation"
                        {...field}
                        className="border-2 border-gray-300 focus:border-blue-500 transition duration-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Upload Image</FormLabel>
                    <FormControl>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="border-2 border-gray-300 focus:border-blue-500 transition duration-300"
                      />
                    </FormControl>
                    <FormDescription>Upload an image of the animal (if available)</FormDescription>
                  </FormItem>
                )}
              />
              {imageUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt="Uploaded animal"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                </motion.div>
              )}
              {classification && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>AI Classification Result</AlertTitle>
                    <AlertDescription>
                      Species: {classification.species}
                      <br />
                      Condition: {classification.condition}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-300"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Report
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

