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
import { Textarea } from "../../../../../components/ui/textarea";
import { useNavigate } from "react-router-dom";

type FormData = {
  companyName: string;
  address: string;
  hostName: string;
  purposeOfVisit: string;
};

type FormErrors = {
  companyName?: string;
  address?: string;
  hostName?: string;
  purposeOfVisit?: string;
};

export default function CompanyDetailsPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useCheckin();

  const [formData, setFormData] = useState<FormData>(state.companyDetails);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Company name validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Company address is required";
    }

    // Host name validation
    if (!formData.hostName.trim()) {
      newErrors.hostName = "Host name is required";
    }

    // Purpose of visit validation
    if (!formData.purposeOfVisit.trim()) {
      newErrors.purposeOfVisit = "Purpose of visit is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch({
        type: "UPDATE_STATE",
        payload: { companyDetails: formData },
      });
      console.log(state);
      navigate("/visitor-entry-exit/checkin/photograph");
    }
  };

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Company & Visit Details
          </CardTitle>
          <CardDescription>
            Please enter information about the visitor's company and purpose
            of visit.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="companyName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Company Name
            </label>
            <Input
              id="companyName"
              placeholder="Acme Inc."
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.currentTarget.value)}
              className={errors.companyName ? "border-red-500" : ""}
            />
            {errors.companyName && (
              <p className="text-sm font-medium text-red-500 mt-1">{errors.companyName}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Company Address
            </label>
            <Input
              id="address"
              placeholder="123 Main St, Anytown, USA"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.currentTarget.value)}
              className={errors.address ? "border-red-500" : ""}
            />
            {errors.address && (
              <p className="text-sm font-medium text-red-500 mt-1">{errors.address}</p>
            )}
          </div>

          <div>
            <label htmlFor="hostName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Host Name
            </label>
            <Input
              id="hostName"
              placeholder="Jane Doe"
              value={formData.hostName}
              onChange={(e) => handleInputChange('hostName', e.currentTarget.value)}
              className={errors.hostName ? "border-red-500" : ""}
            />
            {errors.hostName && (
              <p className="text-sm font-medium text-red-500 mt-1">{errors.hostName}</p>
            )}
          </div>

          <div>
            <label htmlFor="purposeOfVisit" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Purpose of Visit
            </label>
            <Textarea
              id="purposeOfVisit"
              className="border-[#d4d7de] bg-[#eef0f2] focus:ring-[#4051b5]"
              placeholder="Scheduled meeting to discuss Q3 project."
              value={formData.purposeOfVisit}
              onChange={(e) => handleInputChange('purposeOfVisit', e.currentTarget.value)}
            />
            {errors.purposeOfVisit && (
              <p className="text-sm font-medium text-red-500 mt-1">{errors.purposeOfVisit}</p>
            )}
          </div>
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