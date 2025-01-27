"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

type Report = {
  id: number
  species: string
  condition: string
  location: string
  status: "pending" | "in_progress" | "resolved"
}

type AdoptionRequest = {
  id: number
  animalName: string
  requesterName: string
  status: "pending" | "approved" | "rejected"
}

type Partnership = {
  id: number
  name: string
  status: "active" | "inactive"
}

const reports: Report[] = [
  { id: 1, species: "Dog", condition: "Injured", location: "123 Main St", status: "pending" },
  { id: 2, species: "Cat", condition: "Healthy", location: "456 Elm St", status: "in_progress" },
]

const adoptionRequests: AdoptionRequest[] = [
  { id: 1, animalName: "Buddy", requesterName: "John Doe", status: "pending" },
  { id: 2, animalName: "Whiskers", requesterName: "Jane Smith", status: "approved" },
]

const partnerships: Partnership[] = [
  { id: 1, name: "City Animal Shelter", status: "active" },
  { id: 2, name: "Paws for a Cause", status: "inactive" },
]

export default function AdminPanel() {
  const [activeReports, setActiveReports] = useState(reports)
  const [activeAdoptions, setActiveAdoptions] = useState(adoptionRequests)
  const [activePartnerships, setActivePartnerships] = useState(partnerships)
  const { toast } = useToast()

  const handleReportAction = (id: number, action: "start" | "resolve") => {
    setActiveReports(
      activeReports.map((report) =>
        report.id === id ? { ...report, status: action === "start" ? "in_progress" : "resolved" } : report,
      ),
    )
    toast({
      title: "Report Updated",
      description: `Report #${id} has been ${action === "start" ? "started" : "resolved"}.`,
    })
  }

  const handleAdoptionAction = (id: number, action: "approve" | "reject") => {
    setActiveAdoptions(
      activeAdoptions.map((request) =>
        request.id === id ? { ...request, status: action === "approve" ? "approved" : "rejected" } : request,
      ),
    )
    toast({
      title: "Adoption Request Updated",
      description: `Adoption request #${id} has been ${action === "approve" ? "approved" : "rejected"}.`,
    })
  }

  const handlePartnershipAction = (id: number) => {
    setActivePartnerships(
      activePartnerships.map((partnership) =>
        partnership.id === id
          ? { ...partnership, status: partnership.status === "active" ? "inactive" : "active" }
          : partnership,
      ),
    )
    toast({
      title: "Partnership Status Updated",
      description: `Partnership #${id} status has been updated.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="adoptions">Adoption Requests</TabsTrigger>
          <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
        </TabsList>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Animal Reports</CardTitle>
              <CardDescription>Manage incoming animal reports</CardDescription>
            </CardHeader>
            <CardContent>
              {activeReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-semibold">
                      {report.species} - {report.condition}
                    </p>
                    <p className="text-sm text-muted-foreground">{report.location}</p>
                  </div>
                  <div>
                    {report.status === "pending" && (
                      <Button onClick={() => handleReportAction(report.id, "start")}>Start</Button>
                    )}
                    {report.status === "in_progress" && (
                      <Button onClick={() => handleReportAction(report.id, "resolve")}>Resolve</Button>
                    )}
                    {report.status === "resolved" && <span className="text-green-500">Resolved</span>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="adoptions">
          <Card>
            <CardHeader>
              <CardTitle>Adoption Requests</CardTitle>
              <CardDescription>Manage adoption requests</CardDescription>
            </CardHeader>
            <CardContent>
              {activeAdoptions.map((request) => (
                <div key={request.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-semibold">{request.animalName}</p>
                    <p className="text-sm text-muted-foreground">Requested by: {request.requesterName}</p>
                  </div>
                  <div>
                    {request.status === "pending" && (
                      <>
                        <Button onClick={() => handleAdoptionAction(request.id, "approve")} className="mr-2">
                          Approve
                        </Button>
                        <Button onClick={() => handleAdoptionAction(request.id, "reject")} variant="destructive">
                          Reject
                        </Button>
                      </>
                    )}
                    {request.status === "approved" && <span className="text-green-500">Approved</span>}
                    {request.status === "rejected" && <span className="text-red-500">Rejected</span>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="partnerships">
          <Card>
            <CardHeader>
              <CardTitle>Partnerships</CardTitle>
              <CardDescription>Manage partnerships</CardDescription>
            </CardHeader>
            <CardContent>
              {activePartnerships.map((partnership) => (
                <div key={partnership.id} className="flex items-center justify-between py-2">
                  <p className="font-semibold">{partnership.name}</p>
                  <Button
                    onClick={() => handlePartnershipAction(partnership.id)}
                    variant={partnership.status === "active" ? "destructive" : "default"}
                  >
                    {partnership.status === "active" ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

