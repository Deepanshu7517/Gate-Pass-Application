import { data } from "./data";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { CheckinProvider } from "../../../context/checkin-context";
import AppLayout from "../layout";

export default function PendingVisitorListPage() {
  return (
    // Wrap with CheckinProvider to access the context in the 'Approve' button
    <CheckinProvider>
      <AppLayout>
        <div className="container mx-auto">
          <header className="mb-8">
            <h1 className="font-headline text-4xl font-bold tracking-tight">
              Pending Visitor List
            </h1>
            <p className="text-muted-foreground text-[#8d7c8b]">
              Approve or decline pending visitor gate passes.
            </p>
          </header>
          <DataTable columns={columns} data={data} />
        </div>
      </AppLayout>
    </CheckinProvider>
  );
}
