import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function VoteAdministration() {
  // Mock data
  const pastElections = [
    {
      id: 1,
      year: "2023",
      title: "Annual Leadership Election",
      winner: "Alex Johnson",
      votes: 142,
    },
    {
      id: 2,
      year: "2022",
      title: "Division Head Election",
      winner: "Sam Wilson",
      votes: 118,
    },
  ];

  return (
    <div className="w-full mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Vote Administration
        </h1>
        <p className="text-gray-600">Manage elections and voting processes</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mb-6">
          <TabsTrigger value="upcoming">Upcoming Vote</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
        </TabsList>

        {/* Upcoming Vote Tab */}
        <TabsContent value="upcoming">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>2024 Leadership Election</CardTitle>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Active: Nomination Phase
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="font-medium">Nomination Period</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      May 1 - May 15, 2024
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="font-medium">Voting Period</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      May 20 - May 25, 2024
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="font-medium">Eligible Voters</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">243 members</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between bg-gray-50">
                  <h3 className="font-medium">
                    Candidate Submissions (12 pending)
                  </h3>
                  <Button size="sm">Review Nominations</Button>
                </CardHeader>
                <CardContent className="p-4 text-sm text-gray-600">
                  The nomination form is currently open for members. You can
                  review submissions.
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Past Elections</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Election</TableHead>
                    <TableHead>Winner</TableHead>
                    <TableHead>Votes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastElections.map((election) => (
                    <TableRow key={election.id}>
                      <TableCell>{election.year}</TableCell>
                      <TableCell>{election.title}</TableCell>
                      <TableCell>{election.winner}</TableCell>
                      <TableCell>{election.votes}</TableCell>
                      <TableCell>
                        <Button variant="link" className="h-4 p-0 mr-3">
                          View
                        </Button>
                        <Button variant="link" className="h-4 p-0">
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configuration Tab */}
        <TabsContent value="config">
          <Card>
            <CardHeader>
              <CardTitle>Election Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="font-medium">Default Election Timeline</h3>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomination-days">Nomination Days</Label>
                      <Input
                        id="nomination-days"
                        type="number"
                        defaultValue="14"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="voting-days">Voting Days</Label>
                      <Input id="voting-days" type="number" defaultValue="5" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="results-delay">
                        Results Delay (Days)
                      </Label>
                      <Input
                        id="results-delay"
                        type="number"
                        defaultValue="2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="font-medium">Member Permissions</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="seniority-checkbox" />
                    <Label htmlFor="seniority-checkbox">
                      Require minimum 1 year seniority to vote
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="nomination-checkbox" />
                    <Label htmlFor="nomination-checkbox">
                      Allow self-nominations
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
