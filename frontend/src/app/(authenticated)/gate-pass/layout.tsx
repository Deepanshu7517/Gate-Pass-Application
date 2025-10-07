import { Stepper } from "../../../components/stepper";

const steps = [
  { name: "Basic Details" },
  { name: "Company Details" },
  { name: "Photograph" },
  { name: "Identity Proof" },
  { name: "Equipment" },
  { name: "Add Member" },
  { name: "NDA" },
  { name: "Visit Area" },
  { name: "Print Badge" },
];

const stepPaths = [
  "/gate-pass/basic-details",
  "/gate-pass/company-details",
  "/gate-pass/photograph",
  "/gate-pass/identity-proof",
  "/gate-pass/equipment",
  "/gate-pass/add-members",
  "/gate-pass/nda-signing",
  "/gate-pass/place-to-visit",
  "/gate-pass/print-badge",
];

import { useLocation } from "react-router-dom";
import AppLayout from "../layout";

export default function GatePassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const pathname = location.pathname;
  const currentStep = stepPaths.indexOf(pathname);

  return (
    <AppLayout>
      <div className="flex w-full flex-col items-center justify-start">
        {/* Inner container with max width and vertical spacing (max-w-7xl, space-y-8) */}
        <div className="w-full max-w-7xl space-y-8">
          <Stepper steps={steps} currentStep={currentStep} />

          {/* Content area with horizontal padding and centering (px-4) */}
          <div className="flex justify-center px-4">{children}</div>
        </div>
      </div>
    </AppLayout>
  );
}
