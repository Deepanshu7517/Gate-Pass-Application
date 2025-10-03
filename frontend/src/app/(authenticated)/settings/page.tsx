import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import AppLayout from "../layout";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="container mx-auto">
        <header className="mb-8">
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Configure application settings.
          </p>
        </header>
        <Card>
          <CardHeader>
            <CardTitle>Application Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This feature is not yet implemented.</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
