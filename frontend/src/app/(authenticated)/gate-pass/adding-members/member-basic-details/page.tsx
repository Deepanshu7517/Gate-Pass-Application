import { useEffect, useState } from "preact/hooks";
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
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../../hooks/use-toast";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type FormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

export default function GatePassMemberBasicDetailsPage() {
  const { index } = useParams<{ index: string }>();
  const memberIndex = Number(index);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkinState, updateMember, setCurrentMemberIndex } = useCheckin();

  const { currentMemberIndex, members } = checkinState;
  const currentMember = members && members[memberIndex];

  // Initialize form with current member data or empty values
  const [formData, setFormData] = useState<FormData>(
    currentMember?.basicDetails || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    }
  );
  const [errors, setErrors] = useState<FormErrors>({});

  // Sync member index to Redux store on mount
  useEffect(() => {
    if (!isNaN(memberIndex) && memberIndex >= 0) {
      if (currentMemberIndex !== memberIndex) {
        setCurrentMemberIndex(memberIndex);
      }
    }
  }, [memberIndex, currentMemberIndex, setCurrentMemberIndex]);

  // Handle case where member doesn't exist
  useEffect(() => {
    if (!currentMember && members && memberIndex >= 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No member found at this index. Redirecting...",
      });
      navigate("/gate-pass/add-members");
    }
  }, [currentMember, members, memberIndex, navigate, toast]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Update member in Redux store
      updateMember(memberIndex, {
        basicDetails: formData,
      });

      toast({
        title: "Member Details Saved",
        description: `Details for member ${memberIndex + 1} have been saved.`,
      });

      console.log("Current state:", checkinState);

      // Navigate to photograph page for this member
      navigate(`/gate-pass/add-members/${memberIndex}/photograph`);
    }
  };

  // Show loading state while checking member existence
  if (!currentMember && members) {
    return (
      // Applied responsive max-width
      <Card className="w-full max-w-2xl sm:max-w-4xl shadow-lg"> 
        {/* Applied responsive padding */}
        <CardContent className="p-6 sm:p-8 text-center"> 
          <p className="text-lg">Loading member data...</p>
        </CardContent>
      </Card>
    );
  }

  const memberNumber = memberIndex + 1;

  return (
    // Applied responsive max-width
    <Card className="w-full max-w-2xl sm:max-w-4xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          {/* Applied responsive title size */}
          <CardTitle className="font-headline text-2xl sm:text-3xl"> 
            Member #{memberNumber} - Basic Details
          </CardTitle>
          {/* Applied responsive description size */}
          <CardDescription className="text-base sm:text-lg"> 
            Enter the personal information for this team member.
          </CardDescription>
        </CardHeader>
        {/* Applied responsive grid/gap/padding */}
        <CardContent className="grid gap-6 sm:grid-cols-2 sm:gap-8 p-6 sm:p-8">
          {/* First Name Field */}
          <div>
            <label
              htmlFor="firstName"
              // Applied responsive label size
              className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" 
            >
              First Name
            </label>
            <Input
              id="firstName"
              placeholder="Jane"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.currentTarget.value)}
              className={
                errors.firstName
                  ? "h-10 text-sm sm:h-12 sm:text-base border-red-500" // Applied responsive input size and error class
                  : "h-10 text-sm sm:h-12 sm:text-base" // Applied responsive input size
              }
            />
            {errors.firstName && (
              <p className="text-sm font-medium text-red-500 mt-1">
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name Field */}
          <div>
            <label
              htmlFor="lastName"
              // Applied responsive label size
              className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" 
            >
              Last Name
            </label>
            <Input
              id="lastName"
              placeholder="Smith"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.currentTarget.value)}
              className={
                errors.lastName
                  ? "h-10 text-sm sm:h-12 sm:text-base border-red-500" // Applied responsive input size and error class
                  : "h-10 text-sm sm:h-12 sm:text-base" // Applied responsive input size
              }
            />
            {errors.lastName && (
              <p className="text-sm font-medium text-red-500 mt-1">
                {errors.lastName}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              // Applied responsive label size
              className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" 
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="jane.smith@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.currentTarget.value)}
              className={
                errors.email
                  ? "h-10 text-sm sm:h-12 sm:text-base border-red-500" // Applied responsive input size and error class
                  : "h-10 text-sm sm:h-12 sm:text-base" // Applied responsive input size
              }
            />
            {errors.email && (
              <p className="text-sm font-medium text-red-500 mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="sm:col-span-2">
            <label
              htmlFor="phone"
              // Applied responsive label size
              className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" 
            >
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 987-6543"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.currentTarget.value)}
              className={
                errors.phone
                  ? "h-10 text-sm sm:h-12 sm:text-base border-red-500" // Applied responsive input size and error class
                  : "h-10 text-sm sm:h-12 sm:text-base" // Applied responsive input size
              }
            />
            {errors.phone && (
              <p className="text-sm font-medium text-red-500 mt-1">
                {errors.phone}
              </p>
            )}
          </div>
        </CardContent>
        {/* Applied responsive padding to footer */}
        <CardFooter className="flex justify-between pt-4 sm:pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/gate-pass/add-members")}
            // Applied responsive button size
            className="sm:h-12 sm:px-6 sm:text-base"
          >
            Back to Members
          </Button>
          <Button 
            type="submit" 
            variant="default"
            // Applied responsive button size
            className="sm:h-12 sm:px-6 sm:text-base"
          >
            Next Step
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
