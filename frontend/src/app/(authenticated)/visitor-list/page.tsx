import { data } from "./data";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import AppLayout from "../layout";

export default function VisitorListPage() {
  return (
    <AppLayout>
      <div className="container mx-auto">
        <header className="mb-8">
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            Visitor List
          </h1>
          <p className="text-muted-foreground text-[#8d7c8b]">View and manage all visitors.</p>
        </header>
        <DataTable columns={columns} data={data} />
      </div>
    </AppLayout>
  );
}
