import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Heart, PawPrint, ShieldCheck } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Animal Foundation</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Improving animal welfare through technology and community engagement
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild size="lg">
            <Link href="/report">Report an Animal</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/adopt">Adopt an Animal</Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2 text-red-500" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We strive to create a world where every animal is treated with kindness and respect, leveraging technology
              to make a positive impact on animal welfare.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PawPrint className="mr-2 text-blue-500" />
              What We Do
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              From rescuing and rehabilitating animals in need to facilitating adoptions and promoting responsible pet
              ownership, we're committed to making a difference.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldCheck className="mr-2 text-green-500" />
              Get Involved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Whether you want to report an animal in need, adopt a new furry friend, or support our cause, there are
              many ways to contribute to our mission.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Make a Difference Today</h2>
        <p className="text-xl mb-8">Your support can help us continue our vital work in animal welfare.</p>
      </section>

    </div>
  )
}

