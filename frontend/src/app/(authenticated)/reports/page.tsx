import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import AppLayout from "../layout";

export default function ReportsPage() {
  return (
    <AppLayout>
      <div className="container mx-auto">
        <header className="mb-8">
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            Reports
          </h1>
          <p className="text-muted-foreground">
            Generate and view visitor reports.
          </p>
        </header>
        <Card>
          <CardHeader>
            <CardTitle>Visitor Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This feature is not yet implemented.</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}