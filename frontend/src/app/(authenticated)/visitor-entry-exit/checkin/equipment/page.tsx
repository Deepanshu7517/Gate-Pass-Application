import { useState } from "preact/hooks";
import { useCheckin } from "../../../../../hooks/useCheckIn";
import { Button } from "../../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { Input } from "../../../../../components/ui/input";
import { Minus, Plus, PlusCircle, Trash2 } from "lucide-preact"; // Added ArrowLeft
import { useNavigate } from "react-router-dom";

type Equipment = {
  name: string;
  quantity: number;
};

type FormData = {
  electrical: Equipment[];
  mechanical: Equipment[];
};

export default function EquipmentPage() {
  const navigate = useNavigate();
  const { checkinState, updateEquipment } = useCheckin();

  // Initialize form data from Redux state, filtering out empty entries
  const [formData, setFormData] = useState<FormData>({
    electrical: checkinState.equipment.electrical.filter((e) => e.name),
    mechanical: checkinState.equipment.mechanical.filter((e) => e.name),
  });

  const handleEquipmentChange = (
    type: "electrical" | "mechanical",
    index: number,
    field: "name" | "quantity",
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].map((item, i) =>
        i === index
          ? {
              ...item,
              [field]:
                field === "quantity" ? Math.max(1, Number(value) || 1) : value,
            }
          : item
      ),
    }));
  };

  const addEquipment = (type: "electrical" | "mechanical") => {
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], { name: "", quantity: 1 }],
    }));
  };

  const removeEquipment = (
    type: "electrical" | "mechanical",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty equipment entries before saving
    const cleanedData = {
      electrical: formData.electrical.filter((item) => item.name.trim()),
      mechanical: formData.mechanical.filter((item) => item.name.trim()),
    };

    // Update Redux store with equipment data
    updateEquipment(cleanedData);
    
    console.log("Current check-in state:", checkinState);
    navigate("/visitor-entry-exit/checkin/add-members");
  };

  const renderEquipmentSection = (
    type: "electrical" | "mechanical",
    title: string,
    placeholder: string
  ) => {
    const equipment = formData[type];

    return (
      // Responsive spacing inside the section
      <div className="space-y-4 sm:space-y-6"> 
        {/* Responsive title size */}
        <h3 className="text-lg sm:text-xl font-semibold">{title}</h3> 
        {equipment.length === 0 ? (
          <p className="text-sm sm:text-base text-gray-500 italic">No equipment added yet</p>
        ) : (
          equipment.map((item, index) => (
            // Responsive gap between items
            <div key={index} className="flex items-end gap-2 sm:gap-4"> 
              <div className="flex-1">
                {/* Responsive label size */}
                {index === 0 && (
                  <label className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Device Name
                  </label>
                )}
                {index > 0 && <label className="sr-only">Device Name</label>}
                <Input
                  placeholder={placeholder}
                  value={item.name}
                  onChange={(e) =>
                    handleEquipmentChange(
                      type,
                      index,
                      "name",
                      e.currentTarget.value
                    )
                  }
                  // Responsive Input height and text size
                  className="h-10 text-sm sm:h-12 sm:text-base"
                />
              </div>

              <div>
                 {/* Responsive label size */}
                {index === 0 && (
                  <label className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Qty
                  </label>
                )}
                {index > 0 && <label className="sr-only">Qty</label>}
                <div className="flex items-center gap-1 sm:gap-2">
                  {/* Quantity control buttons and input size scaling */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 sm:h-9 sm:w-9"
                    onClick={() =>
                      handleEquipmentChange(
                        type,
                        index,
                        "quantity",
                        Math.max(1, item.quantity - 1)
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <Input
                    className="w-12 text-center text-sm sm:text-base [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleEquipmentChange(
                        type,
                        index,
                        "quantity",
                        Number(e.currentTarget.value)
                      )
                    }
                    onFocus={(e) => e.currentTarget.select()}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 sm:h-9 sm:w-9 bg-green-500 text-white hover:bg-green-600"
                    onClick={() =>
                      handleEquipmentChange(
                        type,
                        index,
                        "quantity",
                        item.quantity + 1
                      )
                    }
                  >
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
              </div>

              {/* Trash button size scaling */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 sm:h-12 sm:w-12"
                onClick={() => removeEquipment(type, index)}
                title="Remove equipment"
              >
                <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          ))
        )}
        {/* Add Equipment Button scaling */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="sm:h-10 sm:px-4 sm:text-base"
          onClick={() => addEquipment(type)}
        >
          <PlusCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Add {title.slice(0, -1)} {/* Remove 's' from 'Devices' */}
        </Button>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-4xl sm:max-w-5xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          {/* CardTitle: text-2xl (mobile) -> text-3xl (PC) */}
          <CardTitle className="font-headline text-2xl sm:text-3xl">
            Equipment Details
          </CardTitle>
          {/* CardDescription: Default (mobile) -> text-lg (PC) */}
          <CardDescription className="text-base sm:text-lg">
            List any equipment the visitor is bringing. Leave blank if none.
          </CardDescription>
        </CardHeader>
        {/* CardContent: Increased gap for large screens */}
        <CardContent className="grid gap-8 sm:gap-12 lg:grid-cols-2">
          {renderEquipmentSection("electrical", "Electrical Devices", "Laptop")}
          {renderEquipmentSection(
            "mechanical",
            "Mechanical Devices",
            "Toolkit"
          )}
        </CardContent>
        {/* CardFooter: Added padding top for large screens */}
        <CardFooter className="flex justify-between pt-4 sm:pt-6">
          {/* Back Button scaling */}
          <Button variant="outline" onClick={() => navigate(-1)} size="default" className="sm:h-12 sm:px-6 sm:text-base">
            Back
          </Button>
          {/* Next Button scaling */}
          <Button variant="default" size="default" type="submit" className="sm:h-12 sm:px-6 sm:text-base">
            Next
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}