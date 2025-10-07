import { useState, useMemo, useRef, useEffect } from "preact/hooks";
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
import { Textarea } from "../../../../../components/ui/textarea";
import { useToast } from "../../../../../hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { type ComponentChildren } from "preact";
import { Check, ChevronsUpDown } from "lucide-preact";
import { cn } from "../../../../../lib/utils";

// employee-data.ts
export const employees = [
  { name: "Jane Doe", post: "Project Manager" },
  { name: "John Smith", post: "Software Engineer" },
  { name: "Emily Johnson", post: "HR Executive" },
  { name: "Michael Brown", post: "UX Designer" },
  { name: "Sarah Wilson", post: "QA Analyst" },
  { name: "David Lee", post: "DevOps Engineer" },
  { name: "Olivia Davis", post: "Product Owner" },
  { name: "James Miller", post: "Backend Developer" },
  { name: "Sophia Taylor", post: "Frontend Developer" },
  { name: "Daniel Anderson", post: "System Administrator" },
];

// --- Types ---
type FormData = {
  companyName: string;
  address: string;
  host: {
    name: string;
    post: string;
  };
  purposeOfVisit: string;
};

type FormErrors = {
  companyName?: string;
  address?: string;
  host?: string;
  purposeOfVisit?: string;
};

// --- UI Helpers ---
const FormItem: React.FC<{
  children: ComponentChildren;
  className?: string;
}> = ({ children, className }) => <div className={className}>{children}</div>;

const FormLabel: React.FC<{ children: ComponentChildren; htmlFor: string }> = ({
  children,
  htmlFor,
}) => (
  <label
    htmlFor={htmlFor}
    className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >
    {children}
  </label>
);

const FormMessage: React.FC<{ children: ComponentChildren }> = ({
  children,
}) => <p className="text-sm font-medium text-red-500 mt-1">{children}</p>;

// --- Component Start ---
export default function CompanyDetailsPage() {
  const navigate = useNavigate();
  const { checkinState, updateCompanyDetails } = useCheckin();
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    companyName: checkinState.companyDetails.companyName || "",
    address: checkinState.companyDetails.address || "",
    host: {
      name: checkinState.companyDetails.host?.name || "",
      post: checkinState.companyDetails.host?.post || "",
    },
    purposeOfVisit: checkinState.companyDetails.purposeOfVisit || "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const comboboxRef = useRef<HTMLDivElement>(null);

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (comboboxRef.current && !comboboxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!formData.address.trim())
      newErrors.address = "Company address is required";
    if (!formData.host.name.trim()) 
      newErrors.host = "Host name is required";
    if (!formData.purposeOfVisit.trim())
      newErrors.purposeOfVisit = "Purpose of visit is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleHostSelect = (employee: typeof employees[0]) => {
    setFormData((prev) => ({
      ...prev,
      host: {
        name: employee.name,
        post: employee.post,
      },
    }));
    if (errors.host) {
      setErrors((prev) => ({ ...prev, host: undefined }));
    }
    setOpen(false);
    setSearch("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      updateCompanyDetails(formData);
      toast({
        title: "Details Saved",
        description: "Company and visit information recorded.",
      });
      console.log(checkinState);
      navigate("/visitor-entry-exit/checkin/photograph");
    }
  };

  const inputClassNames = (field: keyof FormErrors) =>
    errors[field]
      ? "h-10 text-sm sm:h-12 sm:text-base border-red-500"
      : "h-10 text-sm sm:h-12 sm:text-base";

  // Host name filtering
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) =>
      `${emp.name} ${emp.post}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <Card className="w-full max-w-2xl sm:max-w-4xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl sm:text-3xl">
            Company & Visit Details
          </CardTitle>
          <CardDescription className="text-base sm:text-lg">
            Please enter information about the visiting company and purpose of
            visit.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 sm:space-y-6">
          {/* Company Name */}
          <FormItem>
            <FormLabel htmlFor="companyName">Company Name</FormLabel>
            <Input
              id="companyName"
              placeholder="Acme Inc."
              value={formData.companyName}
              onChange={(e) =>
                handleInputChange("companyName", e.currentTarget.value)
              }
              className={inputClassNames("companyName")}
            />
            {errors.companyName && (
              <FormMessage>{errors.companyName}</FormMessage>
            )}
          </FormItem>

          {/* Company Address */}
          <FormItem>
            <FormLabel htmlFor="address">Company Address</FormLabel>
            <Input
              id="address"
              placeholder="123 Main St, Anytown, USA"
              value={formData.address}
              onChange={(e) =>
                handleInputChange("address", e.currentTarget.value)
              }
              className={inputClassNames("address")}
            />
            {errors.address && <FormMessage>{errors.address}</FormMessage>}
          </FormItem>

          {/* Host Name (Combobox Implementation) */}
          <FormItem>
            <FormLabel htmlFor="hostName">Host Name</FormLabel>
            <div ref={comboboxRef} className="relative">
              <Button
                type="button"
                variant="outline"
                className={cn(
                  "w-full justify-between text-left font-normal",
                  !formData.host.name && "text-muted-foreground",
                  inputClassNames("host")
                )}
                onClick={() => setOpen(!open)}
              >
                <div className="flex flex-col items-start">
                  <span>{formData.host.name || "Select or search for a host..."}</span>
                  {formData.host.name && formData.host.post && (
                    <span className="text-xs text-gray-500">{formData.host.post}</span>
                  )}
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>

              {open && (
                <div className="absolute z-50 mt-2 w-full rounded-md border bg-white shadow-lg border-gray-300">
                  <div className="p-2">
                    <Input
                      placeholder="Search host..."
                      value={search}
                      onInput={(e) => setSearch(e.currentTarget.value)}
                      className="h-8 text-sm"
                    />
                  </div>
                  <ul className="max-h-60 overflow-y-auto">
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((emp) => (
                        <li
                          key={emp.name}
                          onClick={() => handleHostSelect(emp)}
                          className={cn(
                            "flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100",
                            formData.host.name === emp.name &&
                              "bg-gray-100 font-medium"
                          )}
                        >
                          <div className="flex flex-col">
                            <span>{emp.name}</span>
                            <span className="text-xs text-gray-500">
                              {emp.post}
                            </span>
                          </div>
                          {formData.host.name === emp.name && (
                            <Check className="h-4 w-4 text-green-600" />
                          )}
                        </li>
                      ))
                    ) : (
                      <li className="px-3 py-2 text-sm text-gray-500">
                        No results found.
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            {errors.host && <FormMessage>{errors.host}</FormMessage>}
          </FormItem>

          {/* Purpose of Visit */}
          <FormItem>
            <FormLabel htmlFor="purposeOfVisit">Purpose of Visit</FormLabel>
            <Textarea
              id="purposeOfVisit"
              placeholder="Scheduled meeting to discuss Q3 project."
              value={formData.purposeOfVisit}
              onChange={(e) =>
                handleInputChange("purposeOfVisit", e.currentTarget.value)
              }
              className={
                errors.purposeOfVisit
                  ? "text-sm sm:text-base border-red-500"
                  : "text-sm sm:text-base"
              }
            />
            {errors.purposeOfVisit && (
              <FormMessage>{errors.purposeOfVisit}</FormMessage>
            )}
          </FormItem>
        </CardContent>

        <CardFooter className="flex justify-between pt-0 sm:pt-6">
          <Button variant="outline" onClick={() => navigate(-1)} size="default">
            Back
          </Button>
          <Button variant="default" type="submit" size="default">
            Next
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}