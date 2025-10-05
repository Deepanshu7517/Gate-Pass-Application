import { Building2, Factory } from 'lucide-preact';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../../components/ui/card';
import { Button } from '../../../../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'preact/hooks';
import { useCheckin } from '../../../../../hooks/useCheckIn';

export default function PlaceToVisitPage() {
  const { checkinState, updatePlaceToVisit } = useCheckin();
  const navigate = useNavigate();
  const [SelectedArea, setSelectedArea] = useState<"Office" | "Shop floor" | null>(null);
  const handleNext = () => {
    if (SelectedArea===null) {
      return;
    }
    updatePlaceToVisit(SelectedArea);
    console.log(checkinState);
    navigate("/visitor-entry-exit/checkin/print-badge");
  };

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl">Select Area of Visit</CardTitle>
        <CardDescription>{SelectedArea === null ? "Please select an area" : `Selected Area: ${SelectedArea}`}</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6 sm:grid-cols-2">
        {/* Office option */}
        <div
          className="flex cursor-pointer flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed p-8 transition-all hover:border-primary hover:bg-accent/50 border-[#d4d7de] hover:border-[#919499]"
          onClick={() => setSelectedArea('Office')}
        >
          <Building2 className="h-16 w-16 text-[#4051b5]" />
          <h3 className="text-2xl font-semibold">Office</h3>
        </div>

        {/* Shop floor option */}
        <div
          className="flex cursor-pointer flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed p-8 transition-all hover:border-primary hover:bg-accent/50 border-[#d4d7de] hover:border-[#919499]"
          onClick={() => setSelectedArea('Shop floor')}
        >
          <Factory className="h-16 w-16 text-[#4051b5]" />
          <h3 className="text-2xl font-semibold">Shop floor</h3>
        </div>
      </CardContent>

      <CardFooter className={"flex justify-between"}>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="default" onClick={() => handleNext()}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
