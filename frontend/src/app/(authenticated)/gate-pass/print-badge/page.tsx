import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../../../store";
import { updateState } from "../../../../store/slices/checkinSlice";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Printer } from "lucide-preact";
import { useToast } from "../../../../hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function GatePassPrintBadgePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Access Redux state
  const state = useSelector((state: RootState) => state.checkin);

  const handlePrint = () => {
    // Standard browser print function
    window.print();
  };

  const handleFinish = () => {
    toast({
      title: "Check-in Complete!",
      description: `${state.basicDetails.firstName} ${state.basicDetails.lastName} has been checked in.`,
    });

    console.log("Visitor Check-in Complete:", state);

    // Reset Redux state (Logic from first component)
    dispatch(
      updateState({
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
          electrical: [],
          mechanical: [],
        },
        nda: {
          signature: "",
          date: "",
          name: "",
          company: "",
          address: "",
          accepted: false,
        },
        members: [],
        currentMemberIndex: null,
        id: null,
      })
    );

    // Navigate to the final route specified in the logic component
    navigate("/requests"); 
  };

  // --- Incomplete Information Card (Responsive Styling) ---
  if (!state.nda.accepted) {
    return (
      // Card size: max-w-lg (mobile) -> sm:max-w-xl (PC)
      <Card className="w-full max-w-lg sm:max-w-xl shadow-lg">
        <CardHeader>
          {/* Title scaling */}
          <CardTitle className="font-headline text-2xl sm:text-3xl">
            Incomplete Information
          </CardTitle>
          {/* Description scaling */}
          <CardDescription className="text-base sm:text-lg">
            Visitor information is incomplete. Please start the check-in process
            from the beginning.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          {/* Button scaling */}
          <Button
            className="w-full sm:h-12 sm:text-base"
            variant="default"
            // Route from logic component
            onClick={() => navigate("/gate-pass/basic-details")}
          >
            Go to Start
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // --- Main Print Badge Page (Responsive Styling) ---
  return (
    // Card size: max-w-lg (mobile) -> sm:max-w-xl (PC)
    <Card className="w-full max-w-lg sm:max-w-xl shadow-lg">
      {/* Header section (not printed) */}
      <div className="print:hidden">
        <CardHeader>
          {/* CardTitle scaling */}
          <CardTitle className="font-headline text-2xl sm:text-3xl">
            Print Visitor Badge
          </CardTitle>
          {/* CardDescription scaling */}
          <CardDescription className="text-base sm:text-lg">
            Review the badge details below and then print.
          </CardDescription>
        </CardHeader>
      </div>

      {/* Printable Badge Section */}
      <CardContent className="py-4 sm:py-6">
        <div
          id="badge-to-print"
          // Badge size scaling
          className="mx-auto mt-6 max-w-sm sm:max-w-md rounded-lg border-2 border-dashed p-4 sm:p-6 border-[#d4d7de]"
        >
          <CardHeader className="text-center p-2 sm:p-3">
            {/* Title scaling */}
            <CardTitle className="font-headline text-xl sm:text-2xl">
              VISITOR
            </CardTitle>
          </CardHeader>

          {/* Content scaling */}
          <CardContent className="flex flex-col items-center space-y-4 sm:space-y-6 p-2 sm:p-3">
            {/* Photograph size scaling */}
            <div className="relative h-28 w-28 sm:h-36 sm:w-36 overflow-hidden rounded-full border-4 border-[#4651b5]">
              {state.photograph && (
                <img
                  src={state.photograph}
                  alt="Visitor"
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            {/* Visitor Info text scaling */}
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold">
                {state.basicDetails.firstName} {state.basicDetails.lastName}
              </p>
              <p className="text-sm sm:text-base text-[#8d7c8b]">
                {state.companyDetails.companyName}
              </p>
            </div>

            {/* Host & Date Info text scaling */}
            <div className="w-full text-xs sm:text-sm">
              <div className="flex justify-between border-t pt-2 border-[#d4d7de]">
                <span className="font-semibold">HOST:</span>
                <span className="text-[#8d7c8b]">
                  {state.companyDetails.hostName}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2 border-[#d4d7de]">
                <span className="font-semibold">DATE:</span>
                <span className="text-[#8d7c8b]">{state.nda.date}</span>
              </div>
            </div>
          </CardContent>
        </div>
      </CardContent>

      {/* Footer (hidden when printing) - Responsive layout and button scaling */}
      <CardFooter className="flex flex-col-reverse sm:flex-row sm:justify-between gap-2 sm:gap-4 print:hidden pt-4 sm:pt-6">
        {/* Back Button scaling */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto sm:h-12 sm:px-6 sm:text-base"
        >
          Back
        </Button>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          {/* Print Button scaling */}
          <Button
            variant="default"
            onClick={handlePrint}
            className="w-full sm:w-auto sm:h-12 sm:px-6 sm:text-base"
          >
            <Printer className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Print Badge
          </Button>
          {/* Finish Button scaling */}
          <Button
            variant="outline"
            onClick={handleFinish}
            className="w-full sm:w-auto sm:h-12 sm:px-6 sm:text-base"
          >
            Finish & Check-In
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
