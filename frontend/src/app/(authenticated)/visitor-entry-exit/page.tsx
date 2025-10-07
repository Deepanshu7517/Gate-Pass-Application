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
      {/* Container: Added sm:pt-12 for top padding on large screens, kept items-center for horizontal centering */}
      <div className="container mx-auto flex h-full items-center justify-center pt-8 sm:pt-12"> 
        {/* Card size scaling: max-w-2xl (mobile) -> max-w-4xl (PC) */}
        <Card className="w-full max-w-2xl sm:max-w-4xl shadow-lg bg-white border-[#d4d7de]">
          <CardHeader className="text-center">
            {/* CardTitle scaling: text-3xl (mobile) -> text-4xl (PC) */}
            <CardTitle className="font-headline text-3xl sm:text-4xl font-bold">
              Visitor Entry & Exit
            </CardTitle>
            {/* CardDescription scaling: Default (mobile) -> text-lg (PC) */}
            <CardDescription className="text-base sm:text-lg text-[#8d7c8b]">
              Select an action to proceed.
            </CardDescription>
          </CardHeader>
          {/* CardContent spacing: gap-6 (mobile) -> gap-8 (PC) */}
          <CardContent className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            
            {/* --- Visitor Check In Card --- */}
            {/* Padding scaling: p-6 (mobile) -> p-8 (PC) */}
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 sm:p-8 transition-all hover:bg-cyan-100/20 border-[#d4d7de]">
              {/* Icon scaling: h-12 w-12 (mobile) -> h-16 w-16 (PC) */}
              <LogIn className="h-12 w-12 sm:h-16 sm:w-16 text-primary text-[#4051b5]" />
              {/* Title scaling: text-xl (mobile) -> text-2xl (PC) */}
              <h3 className="text-xl sm:text-2xl font-semibold">Visitor Check In</h3>
              {/* Paragraph scaling: text-muted-foreground (mobile) -> text-base (PC) */}
              <p className="text-center text-muted-foreground text-sm sm:text-base text-[#8d7c8b]">
                Start the process to register a new visitor.
              </p>
              {/* Button scaling: size="default" (mobile) -> sm:h-12 sm:text-base (PC) */}
              <Button
                className="w-full sm:h-12 sm:text-base"
                size="default"
                variant="default"
                onClick={() =>
                  navigate("/visitor-entry-exit/checkin/basic-details")
                }
              >
                Check In
              </Button>
            </div>

            {/* --- Visitor Check Out Card --- */}
            {/* Padding scaling: p-6 (mobile) -> p-8 (PC) */}
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border p-6 sm:p-8 transition-all hover:bg-cyan-100/20 border-[#d4d7de]">
              {/* Icon scaling: h-12 w-12 (mobile) -> h-16 w-16 (PC) */}
              <LogOut className="h-12 w-12 sm:h-16 sm:w-16 text-destructive text-[#ef4444]" />
              {/* Title scaling: text-xl (mobile) -> text-2xl (PC) */}
              <h3 className="text-xl sm:text-2xl font-semibold">Visitor Check Out</h3>
              {/* Paragraph scaling: text-muted-foreground (mobile) -> text-base (PC) */}
              <p className="text-center text-muted-foreground text-sm sm:text-base text-[#8d7c8b]">
                Process a visitor who is leaving the premises.
              </p>
              {/* Button scaling: size="default" (mobile) -> sm:h-12 sm:text-base (PC) */}
              <Button 
                onClick={() => navigate("/visitor-entry-exit/checkout")} 
                variant="destructive" 
                className="w-full sm:h-12 sm:text-base" 
                size="default"
              >
                Check Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}