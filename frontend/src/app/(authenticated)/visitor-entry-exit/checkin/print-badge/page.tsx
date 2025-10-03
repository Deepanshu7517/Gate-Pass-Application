import { useCheckin } from "../../../../../context/checkin-context";
import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { Printer } from "lucide-preact";
import { useToast } from "../../../../../hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function PrintBadgePage() {
  const navigate = useNavigate();
  const { state, dispatch } = useCheckin();
  const { toast } = useToast();

  const handlePrint = () => {
    window.print();
  };

  const handleFinish = () => {
    console.log("Visitor Check-in Complete:", state);
    toast({
      title: "Check-in Complete!",
      description: `${state.basicDetails.firstName} ${state.basicDetails.lastName} has been checked in.`,
    });

    // Reset state
    dispatch({
      type: "UPDATE_STATE",
      payload: {
        basicDetails: { firstName: "", lastName: "", email: "", phone: "" },
        companyDetails: {
          companyName: "",
          address: "",
          hostName: "",
          purposeOfVisit: "",
        },
        photograph: null,
        identityProof: null,
        equipment: {
          electrical: [{ name: "", quantity: 1 }],
          mechanical: [{ name: "", quantity: 1 }],
        },
        nda: {
          signature: "",
          date: "",
          name: "",
          company: "",
          accepted: false,
        },
      },
    });

    navigate("/");
  };

  if (!state.nda.accepted) {
    return (
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle>Incomplete Information</CardTitle>
          <CardDescription className={"text-[#8d7c8b]"}>
            Visitor information is incomplete. Please start the check-in process
            from the beginning.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            variant={"default"}
            className="w-full "
            onClick={() => {
              console.log(state);
              navigate("/visitor-entry-exit/checkin/basic-details");
            }}
          >
            Go to Start
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <div className="print:hidden">
        <CardHeader>
          <CardTitle className="text-2xl">Print Visitor Badge</CardTitle>
          <CardDescription>
            Review the badge details below and then print.
          </CardDescription>
        </CardHeader>
      </div>

      {/* This is the printable badge area */}
      <CardContent>
        <div
          id="badge-to-print"
          className="mx-auto mt-6 max-w-sm rounded-lg border-2 border-dashed p-4 border-[#d4d7de]"
        >
          <CardHeader className="text-center p-2">
            <CardTitle className="font-headline text-xl">VISITOR</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4 p-2">
            {/* Visitor Photograph */}
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-primary border-[#4651b5]">
              {state.photograph && (
                <img
                  src={state.photograph}
                  alt="Visitor"
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="text-center">
              <p className="text-xl font-bold">
                {state.basicDetails.firstName} {state.basicDetails.lastName}
              </p>
              <p className="text-sm text-muted-foreground text-[#8d7c8b]">
                {state.companyDetails.companyName}
              </p>
            </div>
            <div className="w-full text-xs">
              <div className="flex justify-between border-t pt-2 border-[#d4d7de]">
                <span className="font-semibold">HOST:</span>
                <span className={"text-[#8d7c8b]"}>
                  {state.companyDetails.hostName}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2 border-[#d4d7de]">
                <span className="font-semibold">DATE:</span>
                <span className={"text-[#8d7c8b]"}>{state.nda.date}</span>
              </div>
            </div>
          </CardContent>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col-reverse sm:flex-row sm:justify-between gap-2 print:hidden">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto"
        >
          Back
        </Button>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="default" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print Badge
          </Button>
          <Button size="default" variant="outline" onClick={handleFinish}>
            Finish & Check-In
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
