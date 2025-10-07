import { type ColumnDef } from "@tanstack/react-table"
import { Button } from "../../../components/ui/button"
import { useCheckin } from "../../../context/checkin-context"
import { useNavigate } from "react-router-dom"
export type PendingVisitor = {
  id: string
  name: string
  email: string
  company: string
  host: string
  purpose: string
  // Adding the fields to populate the context
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

export const columns: ColumnDef<PendingVisitor>[] = [
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const visitor = row.original
      const { dispatch } = useCheckin();
      const navigate = useNavigate();

      const handleApprove = () => {
        // Populate the check-in context with the visitor's data
        dispatch({
            type: 'UPDATE_STATE',
            payload: {
                basicDetails: {
                    firstName: visitor.firstName,
                    lastName: visitor.lastName,
                    email: visitor.email,
                    phone: visitor.phone,
                },
                companyDetails: {
                    companyName: visitor.company,
                    address: visitor.address,
                    hostName: visitor.host,
                    purposeOfVisit: visitor.purpose,
                }
            }
        });

        // Navigate to the next step in the check-in process
        navigate('/gate-pass/photograph');
      }
 
      return (
        <div className="space-x-2">
            <Button size="sm" variant="outline" className="bg-green-500 hover:bg-green-600 text-white" onClick={handleApprove}>Approve</Button>
            <Button className={"text-white hover:opacity-80 bg-[#ef4444]"} size="sm" variant="destructive">Decline</Button>
        </div>
      )
    },
  },
]
