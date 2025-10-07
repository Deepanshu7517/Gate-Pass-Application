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
import { useNavigate } from "react-router-dom";
import { type ComponentChildren } from "preact"; 

// --- Types from the Preact logic file ---
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

// --- UI Helpers (Mimicking the structure and applying the desired styles) ---

// Mimics FormItem/Container
const FormItem: React.FC<{ children: ComponentChildren, className?: string }> = ({ children, className }) => (
    <div className={className}>{children}</div>
);

// FormLabel: text-sm (mobile) -> text-base (PC)
const FormLabel: React.FC<{ children: ComponentChildren, htmlFor: string }> = ({ children, htmlFor }) => (
    <label 
        htmlFor={htmlFor} 
        className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
        {children}
    </label>
);

// Mimics FormMessage
const FormMessage: React.FC<{ children: ComponentChildren }> = ({ children }) => (
    <p className="text-sm font-medium text-red-500 mt-1">{children}</p>
);

// --- Component Start ---

export default function BasicDetailsPage() {
  const navigate = useNavigate();
  const { checkinState, updateBasicDetails } = useCheckin();

  // Initialize form data from Redux state
  const [formData, setFormData] = useState<FormData>(checkinState.basicDetails);
  const [errors, setErrors] = useState<FormErrors>({});

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
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
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
      // Update Redux store with the form data
      updateBasicDetails(formData);
      console.log(checkinState);
      
      // Navigate to the next page
      navigate("/visitor-entry-exit/checkin/company-details");
    }
  };

  return (
    // Card size: max-w-2xl (mobile) -> max-w-4xl (PC)
    <Card className="w-full max-w-2xl sm:max-w-4xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          {/* CardTitle: text-2xl (mobile) -> text-3xl (PC) */}
          <CardTitle className="font-headline text-2xl sm:text-3xl">Visitor Basic Details</CardTitle>
          {/* CardDescription: Default (mobile) -> text-lg (PC) */}
          <CardDescription className="text-base sm:text-lg">
            Please enter the visitor's personal information.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="grid gap-6 sm:grid-cols-2">
          
          {/* First Name */}
          <FormItem>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            {/* Input size: h-10 text-sm (mobile) -> h-12 text-base (PC) */}
            <Input
              id="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.currentTarget.value)}
              className={errors.firstName 
                ? "h-10 text-sm sm:h-12 sm:text-base border-red-500" 
                : "h-10 text-sm sm:h-12 sm:text-base"}
            />
            {errors.firstName && <FormMessage>{errors.firstName}</FormMessage>}
          </FormItem>
          
          {/* Last Name */}
          <FormItem>
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input
              id="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.currentTarget.value)}
              className={errors.lastName 
                ? "h-10 text-sm sm:h-12 sm:text-base border-red-500" 
                : "h-10 text-sm sm:h-12 sm:text-base"}
            />
            {errors.lastName && <FormMessage>{errors.lastName}</FormMessage>}
          </FormItem>
          
          {/* Email Address (spans two columns) */}
          <FormItem className="sm:col-span-2">
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.currentTarget.value)}
              className={errors.email 
                ? "h-10 text-sm sm:h-12 sm:text-base border-red-500" 
                : "h-10 text-sm sm:h-12 sm:text-base"}
            />
            {errors.email && <FormMessage>{errors.email}</FormMessage>}
          </FormItem>
          
          {/* Phone Number (spans two columns) */}
          <FormItem className="sm:col-span-2">
            <FormLabel htmlFor="phone">Phone Number</FormLabel>
            <Input
              id="phone"
              type="tel"
              placeholder="(123) 456-7890"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.currentTarget.value)}
              className={errors.phone 
                ? "h-10 text-sm sm:h-12 sm:text-base border-red-500" 
                : "h-10 text-sm sm:h-12 sm:text-base"}
            />
            {errors.phone && <FormMessage>{errors.phone}</FormMessage>}
          </FormItem>
          
        </CardContent>
        {/* CardFooter padding: pt-4 (mobile) -> pt-6 (PC) */}
        <CardFooter className="flex justify-end pt-4 sm:pt-6">
          {/* Button size: size="default" (mobile) -> size="lg" (PC) */}
          <Button 
            type="submit" 
            size="default" 
            // Manually apply size="lg" styles for the PC breakpoint
          >
            Next
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}