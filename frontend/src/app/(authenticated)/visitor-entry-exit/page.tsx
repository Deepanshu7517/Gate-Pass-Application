import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { LogIn, LogOut } from "lucide-preact";
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
              Visitor Entry & Exit
            </CardTitle>
            <CardDescription className={"text-[#8d7c8b]"}>Select an action to proceed.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 transition-all hover:bg-cyan-100/20 border-[#d4d7de]">
              <LogIn className="h-12 w-12 text-primary text-[#4051b5]" />
              <h3 className="text-xl font-semibold">Visitor Check In</h3>
              <p className="text-center text-muted-foreground text-[#8d7c8b]">
                Start the process to register a new visitor.
              </p>
              <Button
                className="w-full"
                size="default"
                variant="default"
                onClick={() =>
                  navigate("/visitor-entry-exit/checkin/basic-details")
                }
              >
                Check In
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 transition-all hover:bg-cyan-100/20 border-[#d4d7de]">
              <LogOut className="h-12 w-12 text-destructive text-[#ef4444]" />
              <h3 className="text-xl font-semibold">Visitor Check Out</h3>
              <p className="text-center text-muted-foreground text-[#8d7c8b]">
                Process a visitor who is leaving the premises.
              </p>
              <Button onClick={() => navigate("/visitor-entry-exit/checkout")} variant="destructive" className="w-full " size="default">
                Check Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
