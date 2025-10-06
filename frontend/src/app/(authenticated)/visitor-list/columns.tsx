import { type ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-preact"

import { Button } from "../../../components/ui/button"

export type Visitor = {
  id: string
  name: string
  email: string
  phone: string
  company: string
  host: string
  purpose: string
  checkIn: string
  checkOut: string
  status: "Checked In" | "Checked Out" | "Expected"
}

export const columns: ColumnDef<Visitor>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="outline"
    className={"text-gray-500"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Visitor ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="pl-4">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
        variant="outline"
        className={"text-gray-500"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="pl-4">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Contact Info",
    cell: ({ row }) => {
      const visitor = row.original;
      return (
        <div>
          <div>{visitor.email}</div>
          <div className="text-gray-500 text-xs ">{visitor.phone}</div>
        </div>
      )
    }
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "host",
    header: "Host",
  },
  {
    accessorKey: "checkIn",
    header: ({ column }) => {
       return (
        <Button
          variant="ghost"
          className={"text-gray-500"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Check-in Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
     cell: ({ row }) => <div className="pl-4">{row.getValue("checkIn")}</div>,
  },
  {
    accessorKey: "checkOut",
    header: "Check Out Time",
    cell: ({ row }) => {
      const checkOut = row.getValue("checkOut");
      return <div>{checkOut ? checkOut : "-"}</div>;
    },
  },
]
