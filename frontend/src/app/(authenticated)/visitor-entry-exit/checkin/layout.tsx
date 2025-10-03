import { type ComponentChildren } from "preact";
import { useLocation } from "react-router-dom";
import { CheckinProvider } from "../../../../context/checkin-context";
import { Stepper } from "../../../../components/stepper";
import AppLayout from "../../layout";

const steps = [
  { name: "Basic Details" },
  { name: "Company Details" },
  { name: "Photograph" },
  { name: "Identity Proof" },
  { name: "Equipment" },
  { name: "NDA" },
  { name: "Print Badge" },
];

// Map each step to its route
const stepPaths = [
  "/visitor-entry-exit/checkin/basic-details",
  "/visitor-entry-exit/checkin/company-details",
  "/visitor-entry-exit/checkin/photograph",
  "/visitor-entry-exit/checkin/identity-proof",
  "/visitor-entry-exit/checkin/equipment",
  "/visitor-entry-exit/checkin/nda-signing",
  "/visitor-entry-exit/checkin/print-badge",
];

interface CheckinLayoutProps {
  children: ComponentChildren;
}

export const CheckinLayout: React.FC<CheckinLayoutProps> = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const currentStep = stepPaths.indexOf(pathname);

  return (
    <CheckinProvider>
      <AppLayout>
        <div className="flex h-full flex-col items-center justify-start">
          <div className="w-full max-w-4xl space-y-8">
            <Stepper steps={steps} currentStep={currentStep} />
            <div className="flex justify-center">{children}</div>
          </div>
        </div>
      </AppLayout>
    </CheckinProvider>
  );
};
