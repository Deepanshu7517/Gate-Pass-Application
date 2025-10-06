import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { ClipboardClock, LogIn, LogOut, QrCode } from 'lucide-preact';
import { useNavigate } from "react-router-dom";
import AppLayout from "../layout";

export default function VisitorEntryExitPage() {
  const navigate = useNavigate();
  return (
    <AppLayout>
      <div className="container mx-auto flex h-full items-center justify-center ">
        <Card className="w-full max-w-2xl shadow-lg bg-white border-[#d4d7de]">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl font-bold">
              Requests
            </CardTitle>
            <CardDescription className={"text-[#8d7c8b]"}>Manage visitor requests</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 transition-all hover:bg-cyan-100/20 border-[#d4d7de]">
              <QrCode className="h-12 w-12 text-primary text-[#4051b5]" />
              <h3 className="text-xl font-semibold">Gate Pass Generation</h3>
              <p className="text-center text-muted-foreground text-[#8d7c8b]">
                Generate a gate pass request for visitors.
              </p>
              <Button
                className="w-full"
                size="default"
                variant="default"
                onClick={() =>
                  navigate("/gate-pass/basic-details")
                }
              >
                Generate
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 transition-all hover:bg-cyan-100/20 border-[#d4d7de]">
              <ClipboardClock className="h-12 w-12 text-destructive text-[#ef4444]" />
              <h3 className="text-xl font-semibold">Pending Visitor List</h3>
              <p className="text-center text-muted-foreground text-[#8d7c8b]">
                Manage visitors who needs to be approved.
              </p>
              <Button onClick={() => navigate("/pending-visitor-list")} variant="destructive" className="w-full " size="default">
                Show List
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
