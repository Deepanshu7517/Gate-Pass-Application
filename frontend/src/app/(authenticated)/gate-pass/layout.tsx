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
  "/gate-pass/add-member",
  "/gate-pass/nda-signing",
  "/gate-pass/add-members",
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
      <div className="flex h-full flex-col items-center justify-start">
        <div className="w-full max-w-4xl space-y-8">
          <Stepper steps={steps} currentStep={currentStep} />
          <div className="flex justify-center">{children}</div>
        </div>
      </div>
    </AppLayout>
  );
}
