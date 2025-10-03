import { useState } from "preact/hooks";
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
import { Input } from "../../../../../components/ui/input";
import { PlusCircle, Trash2 } from "lucide-preact";
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
  const { state, dispatch } = useCheckin();

  const [formData, setFormData] = useState<FormData>({
    electrical: state.equipment.electrical.filter((e) => e.name),
    mechanical: state.equipment.mechanical.filter((e) => e.name),
  });

  const handleEquipmentChange = (
    type: 'electrical' | 'mechanical',
    index: number,
    field: 'name' | 'quantity',
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].map((item, i) =>
        i === index
          ? { ...item, [field]: field === 'quantity' ? Math.max(1, Number(value) || 1) : value }
          : item
      )
    }));
  };

  const addEquipment = (type: 'electrical' | 'mechanical') => {
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], { name: "", quantity: 1 }]
    }));
  };

  const removeEquipment = (type: 'electrical' | 'mechanical', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty equipment entries before saving
    const cleanedData = {
      electrical: formData.electrical.filter(item => item.name.trim()),
      mechanical: formData.mechanical.filter(item => item.name.trim()),
    };
    
    dispatch({ 
      type: "UPDATE_STATE", 
      payload: { equipment: cleanedData } 
    });
    console.log(state);
    navigate("/visitor-entry-exit/checkin/nda-signing");
  };

  const renderEquipmentSection = (
    type: 'electrical' | 'mechanical',
    title: string,
    placeholder: string
  ) => {
    const equipment = formData[type];
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {equipment.map((item, index) => (
          <div key={index} className="flex items-end gap-2">
            <div className="flex-1">
              {index === 0 && (
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Device Name
                </label>
              )}
              {index > 0 && (
                <label className="sr-only">Device Name</label>
              )}
              <Input
                placeholder={placeholder}
                value={item.name}
                onChange={(e) => handleEquipmentChange(type, index, 'name', e.currentTarget.value)}
              />
            </div>
            
            <div>
              {index === 0 && (
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Qty
                </label>
              )}
              {index > 0 && (
                <label className="sr-only">Qty</label>
              )}
              <Input
                type="number"
                className="w-20"
                min="1"
                value={item.quantity}
                onChange={(e) => handleEquipmentChange(type, index, 'quantity', e.currentTarget.value)}
              />
            </div>
            
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeEquipment(type, index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addEquipment(type)}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> 
          Add {title.slice(0, -1)} {/* Remove 's' from 'Devices' */}
        </Button>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-4xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Equipment Details
          </CardTitle>
          <CardDescription>
            List any equipment the visitor is bringing. Leave blank if none.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8 md:grid-cols-2">
          {renderEquipmentSection('electrical', 'Electrical Devices', 'Laptop')}
          {renderEquipmentSection('mechanical', 'Mechanical Devices', 'Toolkit')}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            size="default"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Button size="default" variant="default" type="submit">
            Next
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}