import { type ComponentChildren } from "preact";
import { useLocation } from "react-router-dom";
import { CheckinProvider } from "../../../../context/checkin-context";
import { Stepper } from "../../../../components/stepper";
// Assuming AppLayout is a wrapper component needed for your Preact structure
import AppLayout from "../../layout"; 

// The steps definition from the Preact/React Router version (7 steps)
const steps = [
  { name: "Basic Details" },
  { name: "Company Details" },
  { name: "Photograph" },
  { name: "Identity Proof" },
  { name: "Equipment" },
  { name: "Add Members" },
  { name: "NDA" },
  { name: "Visiting at" },
  { name: "Print Badge" },
];

// Map each step to its route
const stepPaths = [
  "/visitor-entry-exit/checkin/basic-details",
  "/visitor-entry-exit/checkin/company-details",
  "/visitor-entry-exit/checkin/photograph",
  "/visitor-entry-exit/checkin/identity-proof",
  "/visitor-entry-exit/checkin/equipment",
  "/visitor-entry-exit/checkin/add-members",
  "/visitor-entry-exit/checkin/nda-signing",
  "/visitor-entry-exit/checkin/place-to-visit",
  "/visitor-entry-exit/checkin/print-badge",
];

interface CheckinLayoutProps {
  children: ComponentChildren;
}

export const CheckinLayout: React.FC<CheckinLayoutProps> = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  
  // Find the current step index based on the full path
  const currentStep = stepPaths.indexOf(pathname);

  // NOTE: This uses the outer wrapper classes from your Next.js file 
  // (w-full max-w-7xl, space-y-8, px-4) for the desired UI look and feel.
  return (
    <AppLayout>
      <CheckinProvider>
        {/* Main wrapper for the entire content */}
        <div className="flex w-full flex-col items-center justify-start">
          {/* Inner container with max width and vertical spacing (max-w-7xl, space-y-8) */}
          <div className="w-full max-w-7xl space-y-8">
            <Stepper steps={steps} currentStep={currentStep} />
            
            {/* Content area with horizontal padding and centering (px-4) */}
            <div className="flex justify-center px-4">
              {children}
            </div>
          </div>
        </div>
      </CheckinProvider>
    </AppLayout>
  );
};