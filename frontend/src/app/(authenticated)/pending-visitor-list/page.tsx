import { data } from "./data";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { CheckinProvider } from "../../../context/checkin-context";
import AppLayout from "../layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export default function PendingVisitorListPage() {
  return (
    // Wrap with CheckinProvider to access the context in the 'Approve' button
    <CheckinProvider>
      <AppLayout>
        <div className="container mx-auto flex h-full flex-col pt-8 sm:pt-12 items-center">
          <Card className={"w-full max-w-4xl sm:max-w-6xl shadow-lg"}>
            <CardHeader>
              {/* CardTitle scaling: text-3xl (mobile) -> text-4xl (PC) */}
              <CardTitle className="font-headline text-3xl sm:text-4xl font-bold">
                Pending Visitor List
              </CardTitle>
              {/* CardDescription scaling: Default (mobile) -> text-lg (PC) */}
              <CardDescription className="text-base sm:text-lg">
                Approve or decline pending visitor list
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={data} />
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </CheckinProvider>
  );
}
