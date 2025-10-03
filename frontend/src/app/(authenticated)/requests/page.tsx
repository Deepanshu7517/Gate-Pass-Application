import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../../components/ui/card";
import { QrCode, ClipboardList } from "lucide-preact";
import AppLayout from "../layout";
export default function RequestsPage() {
  const navigate = useNavigate();
  return (
    <AppLayout>
      <div className="container mx-auto">
        <header className="mb-8">
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            Requests
          </h1>
          <p className="text-muted-foreground text-[#8d7c8b]">
            Manage visitor requests.
          </p>
        </header>
        <Card className={"bg-white border-2 border-[#d4d7de]"}>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Button
              variant="default"
              className={"!h-20"}
              onClick={() => navigate("/gate-pass/basic-details")}
            >
              <div className="flex flex-col items-center">
                <QrCode className="mb-1 h-6 w-6" />
                <span>Gate Pass Generation</span>
              </div>
            </Button>
            <Button
              variant="default"
              className={"!h-20"}
              onClick={() => navigate("/pending-visitor-list")}
            >
              <div className="flex flex-col items-center">
                <ClipboardList className="mb-1 h-6 w-6" />
                <span>Pending Visitor List</span>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
