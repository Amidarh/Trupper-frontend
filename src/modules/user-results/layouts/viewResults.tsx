"use client"

import { useState, useMemo } from "react"
import { Download, FileText, Users, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BackButton } from "@/core/commons/navigation/backButton"

// Mock data types
interface Subject {
  name: string
  code: string
}

interface StudentResult {
  id: string
  name: string
  studentId: string
  class: string
  subjects: Record<string, number>
  totalScore: number
  averageScore: number
  position: number
}

interface Exam {
  id: string
  name: string
  term: string
  year: string
  subjects: Subject[]
}

// Mock data
const mockExams: Exam[] = [
  {
    id: "1",
    name: "First Term Examination",
    term: "First Term",
    year: "2025",
    subjects: [
      { name: "Mathematics", code: "MATH" },
      { name: "English Language", code: "ENG" },
      { name: "Mathematics", code: "MATH" },
      { name: "Physics", code: "PHY" },
      { name: "English Language", code: "ENG" },
      { name: "Chemistry", code: "CHEM" },
      { name: "Biology", code: "BIO" },
      { name: "Physics", code: "PHY" },
      { name: "Biology", code: "BIO" },
      { name: "English Language", code: "ENG" },
      { name: "Biology", code: "BIO" },
      { name: "Mathematics", code: "MATH" },
      { name: "Biology", code: "BIO" },
    ],
  },
  {
    id: "2",
    name: "Second Term Examination",
    term: "Second Term",
    year: "2025",
    subjects: [
      { name: "Mathematics", code: "MATH" },
      { name: "English Language", code: "ENG" },
      { name: "Physics", code: "PHY" },
      { name: "Chemistry", code: "CHEM" },
      { name: "English Language", code: "ENG" },
      { name: "Biology", code: "BIO" },
      { name: "Biology", code: "BIO" },
      { name: "Chemistry", code: "CHEM" },
      { name: "Biology", code: "BIO" },
      { name: "Biology", code: "BIO" },
    ],
  },
]

const mockStudentResults: StudentResult[] = [
  {
    id: "1",
    name: "Alice Johnson",
    studentId: "STU001",
    class: "SS3A",
    subjects: { MATH: 95, ENG: 88, PHY: 92, CHEM: 89, BIO: 91 },
    totalScore: 455,
    averageScore: 91.0,
    position: 1,
  },
  {
    id: "2",
    name: "Bob Smith",
    studentId: "STU002",
    class: "SS3A",
    subjects: { MATH: 87, ENG: 92, PHY: 85, CHEM: 88, BIO: 86 },
    totalScore: 438,
    averageScore: 87.6,
    position: 2,
  },
  {
    id: "3",
    name: "Carol Davis",
    studentId: "STU003",
    class: "SS3B",
    subjects: { MATH: 89, ENG: 85, PHY: 88, CHEM: 90, BIO: 84 },
    totalScore: 436,
    averageScore: 87.2,
    position: 3,
  },
  {
    id: "4",
    name: "David Wilson",
    studentId: "STU004",
    class: "SS3A",
    subjects: { MATH: 82, ENG: 79, PHY: 85, CHEM: 83, BIO: 80 },
    totalScore: 409,
    averageScore: 81.8,
    position: 4,
  },
  {
    id: "5",
    name: "Emma Brown",
    studentId: "STU005",
    class: "SS3B",
    subjects: { MATH: 78, ENG: 82, PHY: 76, CHEM: 79, BIO: 81 },
    totalScore: 396,
    averageScore: 79.2,
    position: 5,
  },
  {
    id: "6",
    name: "Frank Miller",
    studentId: "STU006",
    class: "SS3A",
    subjects: { MATH: 75, ENG: 77, PHY: 73, CHEM: 76, BIO: 78 },
    totalScore: 379,
    averageScore: 75.8,
    position: 6,
  },
  {
    id: "7",
    name: "Grace Taylor",
    studentId: "STU007",
    class: "SS3B",
    subjects: { MATH: 73, ENG: 75, PHY: 71, CHEM: 74, BIO: 76 },
    totalScore: 369,
    averageScore: 73.8,
    position: 7,
  },
  {
    id: "8",
    name: "Henry Anderson",
    studentId: "STU008",
    class: "SS3A",
    subjects: { MATH: 70, ENG: 72, PHY: 68, CHEM: 71, BIO: 73 },
    totalScore: 354,
    averageScore: 70.8,
    position: 8,
  },
  {
    id: "9",
    name: "Ivy Martinez",
    studentId: "STU009",
    class: "SS3B",
    subjects: { MATH: 68, ENG: 70, PHY: 66, CHEM: 69, BIO: 71 },
    totalScore: 344,
    averageScore: 68.8,
    position: 9,
  },
  {
    id: "10",
    name: "Jack Thompson",
    studentId: "STU010",
    class: "SS3A",
    subjects: { MATH: 65, ENG: 67, PHY: 63, CHEM: 66, BIO: 68 },
    totalScore: 329,
    averageScore: 65.8,
    position: 10,
  },
  {
    id: "11",
    name: "Kate Lewis",
    studentId: "STU011",
    class: "SS3B",
    subjects: { MATH: 62, ENG: 64, PHY: 60, CHEM: 63, BIO: 65 },
    totalScore: 314,
    averageScore: 62.8,
    position: 11,
  },
  {
    id: "12",
    name: "Liam Garcia",
    studentId: "STU012",
    class: "SS3A",
    subjects: { MATH: 58, ENG: 61, PHY: 57, CHEM: 60, BIO: 62 },
    totalScore: 298,
    averageScore: 59.6,
    position: 12,
  },
]

const GradeBadge = ({ score }: { score: number }) => {
  const getGradeInfo = (score: number) => {
    if (score >= 90) return { grade: "A", color: "bg-green-100 text-green-800" }
    if (score >= 80) return { grade: "B", color: "bg-blue-100 text-blue-800" }
    if (score >= 70) return { grade: "C", color: "bg-yellow-100 text-yellow-800" }
    if (score >= 60) return { grade: "D", color: "bg-orange-100 text-orange-800" }
    return { grade: "F", color: "bg-red-100 text-red-800" }
  }

  const { grade, color } = getGradeInfo(score)
  return (
    <Badge variant="secondary" className={`${color} font-medium`}>
      {score}%
      {/* {score} ({grade}) */}
    </Badge>
  )
}

const PositionBadge = ({ position }: { position: number }) => {
  const getPositionStyle = (pos: number) => {
    if (pos === 1) return "bg-yellow-100 text-yellow-800 border-yellow-300"
    if (pos === 2) return "bg-gray-100 text-gray-800 border-gray-300"
    if (pos === 3) return "bg-orange-100 text-orange-800 border-orange-300"
    return "bg-slate-100 text-slate-800 border-slate-300"
  }

  const getPositionIcon = (pos: number) => {
    if (pos <= 3) return <Trophy className="w-3 h-3 mr-1" />
    return null
  }

  return (
    <Badge variant="outline" className={`${getPositionStyle(position)} font-medium`}>
      {getPositionIcon(position)}
      {position}
    </Badge>
  )
}

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-8 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="space-y-2">
      <Skeleton className="h-10 w-full" />
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  </div>
)

const EmptyState = () => (
  <Card className="text-center py-12">
    <CardContent>
      <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
      <p className="text-gray-500">
        No results found for this exam. Please select a different exam or check back later.
      </p>
    </CardContent>
  </Card>
)

export function ViewResultContent() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const itemsPerPage = 10

  // Simulate loading when exam changes
  const filteredResults = useMemo(() => {
    return mockStudentResults
  }, [])

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredResults.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredResults, currentPage])

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage)
  const uniqueClasses = [...new Set(mockStudentResults.map((s) => s.class))]

  const handleExport = (format: "csv" | "pdf") => {
    // Mock export functionality
    alert(`Exporting results as ${format.toUpperCase()}...`)
  }

  const getStatistics = () => {
    if (!filteredResults.length) return { total: 0, average: 0, highest: 0, lowest: 0 }

    const scores = filteredResults.map((s) => s.averageScore)
    return {
      total: filteredResults.length,
      average: scores.reduce((a, b) => a + b, 0) / scores.length,
      highest: Math.max(...scores),
      lowest: Math.min(...scores),
    }
  }

  const stats = getStatistics()

  return (
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <BackButton
                title="Results"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={() => handleExport("csv")} variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={() => handleExport("pdf")} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredResults.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="px-4">
                  <div className="text-sm font-medium text-gray-500">Total Students</div>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="px-4">
                  <div className="text-sm font-medium text-gray-500">Class Average</div>
                  <div className="text-2xl font-bold text-blue-600">{stats.average.toFixed(1)}%</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="px-4">
                  <div className="text-sm font-medium text-gray-500">Highest Score</div>
                  <div className="text-2xl font-bold text-green-600">{stats.highest.toFixed(1)}%</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="px-4">
                  <div className="text-sm font-medium text-gray-500">Lowest Score</div>
                  <div className="text-2xl font-bold text-red-600">{stats.lowest.toFixed(1)}%</div>
                </CardContent>
              </Card>
            </div>

            {/* Results Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  First Term 2025 Examination Results
                  <span className="text-sm font-normal text-gray-600 ml-2">({filteredResults.length} students)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">Rank</TableHead>
                        <TableHead className="min-w-48">Student</TableHead>
                        {/* <TableHead>Class</TableHead> */}
                        {mockExams[0].subjects.map((subject) => (
                          <TableHead key={subject.code} className="text-center min-w-24">
                            {subject.code}
                          </TableHead>
                        ))}
                        <TableHead className="text-center">Total</TableHead>
                        <TableHead className="text-center">Average</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedResults.map((student) => (
                        <TableRow
                          key={student.id}
                        >
                          <TableCell>
                            <PositionBadge position={student.position} />
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.studentId}</div>
                            </div>
                          </TableCell>
                          {/* <TableCell>
                            <Badge variant="outline">{student.class}</Badge>
                          </TableCell> */}
                          {mockExams[0].subjects.map((subject) => (
                            <TableCell key={subject.code} className="text-center">
                              <GradeBadge score={student.subjects[subject.code]} />
                            </TableCell>
                          ))}
                          <TableCell className="text-center font-medium">{student.totalScore}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-medium">
                              {student.averageScore.toFixed(1)}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-500">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                      {Math.min(currentPage * itemsPerPage, filteredResults.length)} of {filteredResults.length} results
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      {[...Array(totalPages)].map((_, i) => (
                        <Button
                          key={i + 1}
                          variant={currentPage === i + 1 ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(i + 1)}
                          className="w-10"
                        >
                          {i + 1}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
  )
}
