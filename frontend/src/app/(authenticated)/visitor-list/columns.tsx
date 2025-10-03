import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "../../../components/ui/badge";

export type Visitor = {
  id: string;
  name: string;
  email: string;
  company: string;
  host: string;
  purpose: string;
  checkIn: string;
  checkOut: string;
  status: "Checked In" | "Checked Out" | "Expected";
};

export const columns: ColumnDef<Visitor>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
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
    accessorKey: "purpose",
    header: "Purpose",
  },
  {
    accessorKey: "checkIn",
    header: "Check-in Time",
  },
  {
    accessorKey: "checkOut",
    header: "Check-out Time",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Visitor["status"];
      const variant = {
        "Checked In": "default",
        "Checked Out": "secondary",
        Expected: "outline",
      }[status];
      return (
        <Badge
          variant={variant as any}
        >
          {status}
        </Badge>
      );
    },
  },
];
