import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./app/(authenticated)/dashboard/page";
import VisitorListPage from "./app/(authenticated)/visitor-list/page";
import VisitorEntryExitPage from "./app/(authenticated)/visitor-entry-exit/page";
import BasicDetailsPage from "./app/(authenticated)/visitor-entry-exit/checkin/basic-details/page";
import CompanyDetailsPage from "./app/(authenticated)/visitor-entry-exit/checkin/company-details/page";
import PhotographPage from "./app/(authenticated)/visitor-entry-exit/checkin/photograph/page";
import IdentityProofPage from "./app/(authenticated)/visitor-entry-exit/checkin/identity-proof/page";
import EquipmentPage from "./app/(authenticated)/visitor-entry-exit/checkin/equipment/page";
import NdaSigningPage from "./app/(authenticated)/visitor-entry-exit/checkin/nda-signing/page";
import PrintBadgePage from "./app/(authenticated)/visitor-entry-exit/checkin/print-badge/page";
import RequestsPage from "./app/(authenticated)/requests/page";
import GatePassLayout from "./app/(authenticated)/gate-pass/layout";
import GatePassBasicDetailsPage from "./app/(authenticated)/gate-pass/basic-details/page";
import { CheckinLayout } from "./app/(authenticated)/visitor-entry-exit/checkin/layout";
import GatePassCompanyDetailsPage from "./app/(authenticated)/gate-pass/company-details/page";
import PendingVisitorListPage from "./app/(authenticated)/pending-visitor-list/page";
import ReportsPage from "./app/(authenticated)/reports/page";
import SettingsPage from "./app/(authenticated)/settings/page";
import GatePassPhotographPage from "./app/(authenticated)/gate-pass/photograph/page";
import GatePassIdentityProofPage from "./app/(authenticated)/gate-pass/identity-proof/page";
import GatePassEquipmentPage from "./app/(authenticated)/gate-pass/equipment/page";
import GatePassNdaSigningPage from "./app/(authenticated)/gate-pass/nda-signing/page";
import GatePassPrintBadgePage from "./app/(authenticated)/gate-pass/print-badge/page";
import LoginPage from "./app/page";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/visitor-list",
    element: <VisitorListPage />,
  },
  {
    path: "/visitor-entry-exit",
    element: <VisitorEntryExitPage />,
  },
  {
    path: "/visitor-entry-exit/checkin/basic-details",
    element: (
      <CheckinLayout>
        <BasicDetailsPage />
      </CheckinLayout>
    ),
  },
  {
    path: "/visitor-entry-exit/checkin/company-details",
    element: (
      <CheckinLayout>
        <CompanyDetailsPage />
      </CheckinLayout>
    ),
  },
  {
    path: "/visitor-entry-exit/checkin/photograph",
    element: (
      <CheckinLayout>
        <PhotographPage />
      </CheckinLayout>
    ),
  },
  {
    path: "/visitor-entry-exit/checkin/identity-proof",
    element: (
      <CheckinLayout>
        <IdentityProofPage />
      </CheckinLayout>
    ),
  },
  {
    path: "/visitor-entry-exit/checkin/equipment",
    element: (
      <CheckinLayout>
        <EquipmentPage />
      </CheckinLayout>
    ),
  },
  {
    path: "/visitor-entry-exit/checkin/nda-signing",
    element: (
      <CheckinLayout>
        <NdaSigningPage />
      </CheckinLayout>
    ),
  },
  {
    path: "/visitor-entry-exit/checkin/print-badge",
    element: (
      <CheckinLayout>
        <PrintBadgePage />
      </CheckinLayout>
    ),
  },
  {
    path: "/requests",
    element: <RequestsPage />,
  },
  {
    path: "/gate-pass/basic-details",
    element: (
      <GatePassLayout>
        <GatePassBasicDetailsPage />
      </GatePassLayout>
    ),
  },
  {
    path: "/gate-pass/company-details",
    element: (
      <GatePassLayout>
        <GatePassCompanyDetailsPage />
      </GatePassLayout>
    ),
  },
  {
    path: "/gate-pass/photograph",
    element: (
      <GatePassLayout>
        <GatePassPhotographPage />
    </GatePassLayout>
    ),
  },
  {
    path: "/gate-pass/identity-proof",
    element: (
      <GatePassLayout>
        <GatePassIdentityProofPage />
      </GatePassLayout>
    ),
  },
  {
    path: "/gate-pass/equipment",
    element: (
      <GatePassLayout>
        <GatePassEquipmentPage />
      </GatePassLayout>
    ),
  },
  {
    path: "/gate-pass/nda-signing",
    element: (
      <GatePassLayout>
        <GatePassNdaSigningPage />
      </GatePassLayout>
    ),
  },
  {
    path: "/gate-pass/print-badge",
    element: (
      <GatePassLayout>
        <GatePassPrintBadgePage />
      </GatePassLayout>
    ),
  },
  {
    path: "/pending-visitor-list",
    element: <PendingVisitorListPage />,
  },
  {
    path: "/reports",
    element: <ReportsPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);
export const App = () => {
  return <RouterProvider router={routes} />;
};
