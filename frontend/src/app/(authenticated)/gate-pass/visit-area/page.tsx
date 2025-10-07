import { Building2, Factory, ArrowLeft } from 'lucide-preact';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'preact/hooks';
import { useCheckin } from '../../../../hooks/useCheckIn';

export default function GatePassPlaceToVisitPage() {
  const { checkinState, updatePlaceToVisit } = useCheckin();
  const navigate = useNavigate();

  // Define valid areas for type safety
  const VALID_AREAS: Array<"Office" | "Shop floor"> = ["Office", "Shop floor"];
  
  // FIX: Initialize state by checking if the stored placeToVisit is a valid option.
  const [SelectedArea, setSelectedArea] = useState<"Office" | "Shop floor" | null>(
    checkinState.placeToVisit && VALID_AREAS.includes(checkinState.placeToVisit as "Office" | "Shop floor")
      ? (checkinState.placeToVisit as "Office" | "Shop floor")
      : null
  );

  const handleNext = () => {
    if (SelectedArea === null) {
      // Typically a toast or error message would go here
      return;
    }
    updatePlaceToVisit(SelectedArea);
    console.log(checkinState);
    navigate("/gate-pass/print-badge");
  };

  const isSelected = (area: "Office" | "Shop floor") => SelectedArea === area;

  return (
    // Card size: max-w-2xl (mobile) -> max-w-4xl (PC)
    <Card className="w-full max-w-2xl sm:max-w-4xl shadow-lg">
      <CardHeader className="text-center">
        {/* CardTitle: text-3xl (mobile) -> text-4xl (PC) */}
        <CardTitle className="font-headline text-3xl sm:text-4xl">Select Area of Visit</CardTitle>
        {/* CardDescription: Default (mobile) -> text-lg (PC) */}
        <CardDescription className="text-base sm:text-lg">
          {SelectedArea === null ? "Please select an area to proceed." : `Selected Area: ${SelectedArea}`}
        </CardDescription>
      </CardHeader>

      {/* CardContent: Increased grid gap and vertical padding for PC */}
      <CardContent className="grid gap-6 sm:grid-cols-2 sm:gap-8 p-6 sm:p-8">
        {/* Office option */}
        <div
          className={`flex cursor-pointer flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed p-8 sm:p-12 transition-all 
            ${isSelected('Office') 
              // Active State: Thicker primary border, solid background
              ? 'border-none bg-accent/50 ring-2 ring-[#4051b5]' 
              // Inactive State: Default border, hover effect
              : 'border-[#d4d7de] hover:border-[#919499] hover:bg-accent/50'
            }`}
          onClick={() => setSelectedArea('Office')}
        >
          {/* Icon size: h-16 w-16 (mobile) -> h-20 w-20 (PC) */}
          <Building2 className="h-16 w-16 sm:h-20 sm:w-20 text-[#4051b5]" />
          {/* Text size: text-2xl (mobile) -> text-3xl (PC) */}
          <h3 className="text-2xl sm:text-3xl font-semibold">Office</h3>
        </div>

        {/* Shop floor option */}
        <div
          className={`flex cursor-pointer flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed p-8 sm:p-12 transition-all 
            ${isSelected('Shop floor') 
              // Active State
              ? 'border-none bg-accent/50 ring-2 ring-[#4051b5]' 
              // Inactive State
              : 'border-[#d4d7de] hover:border-[#919499] hover:bg-accent/50'
            }`}
          onClick={() => setSelectedArea('Shop floor')}
        >
          {/* Icon size: h-16 w-16 (mobile) -> h-20 w-20 (PC) */}
          <Factory className="h-16 w-16 sm:h-20 sm:w-20 text-[#4051b5]" />
          {/* Text size: text-2xl (mobile) -> text-3xl (PC) */}
          <h3 className="text-2xl sm:text-3xl font-semibold">Shop floor</h3>
        </div>
      </CardContent>

      {/* CardFooter: Added padding top for large screens */}
      <CardFooter className={"flex justify-between pt-4 sm:pt-6"}>
        {/* Back Button scaling */}
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          size="default" 
          className="sm:h-12 sm:px-6 sm:text-base"
        >
          Back
        </Button>
        {/* Next Button scaling */}
        <Button 
          variant="default" 
          onClick={handleNext} 
          disabled={SelectedArea === null}
          size="default" 
          className="sm:h-12 sm:px-6 sm:text-base"
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}