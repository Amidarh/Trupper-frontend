import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Card, CardHeader } from "@/components/ui/card"
import { ExamData } from "@/constants/data"
import Link from "next/link"
import { SquareArrowOutUpRight } from "lucide-react"

  export function ExamTable() {
    return (
        <Card className="w-full">
            <CardHeader
                className="flex flex-row items-center justify-between space-y-0 pl-2 py-0"
            >
                <h1 className="text-2xl">Exams</h1>
                <Link href={'/exams'}>
                    <SquareArrowOutUpRight size={18} className="cursor-pointer"/>
                </Link>
            </CardHeader>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Exam Type</TableHead>
                    <TableHead align="right">Actions</TableHead>
                    {/* <TableHead className="text-right">Amount</TableHead> */}
                </TableRow>
                </TableHeader>
                <TableBody>
                {ExamData.map((invoice) => (
                    <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.name}</TableCell>
                    <TableCell>{invoice.fullName}</TableCell>
                    <TableCell>{invoice.examType}</TableCell>
                    <TableCell>
                        <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                            view
                        </button>
                    </TableCell>
                    {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </Card>
    )
  }
  