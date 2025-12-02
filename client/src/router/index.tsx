import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "../pages/LandingPage";
import AutomationsPage from "../pages/AutomationsPage";
import AutomationDetailPage from "../pages/AutomationDetailPage";
import OrderPage from "../pages/OrderPage";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import ContactPage from "../pages/ContactPage";
import PricingPage from "../pages/PricingPage";
import LeadCaptureDemoPage from "../pages/demos/LeadCaptureDemoPage";
import SupportInboxDemoPage from "../pages/demos/SupportInboxDemoPage";
import AppointmentSetterDemoPage from "../pages/demos/AppointmentSetterDemoPage";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminAutomationsPage from "../pages/admin/AdminAutomationsPage";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";
import AdminOrderDetailPage from "../pages/admin/AdminOrderDetailPage";
import AdminDemoLeadsPage from "../pages/admin/AdminDemoLeadsPage";
import AdminDemoLeadDetailPage from "../pages/admin/AdminDemoLeadDetailPage";
import AdminHomePage from "../pages/admin/AdminHomePage";
import AdminRoute from "../components/admin/AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "automations", element: <AutomationsPage /> },
      { path: "automations/:id", element: <AutomationDetailPage /> },
      { path: "order/:automationId", element: <OrderPage /> },
      { path: "order-success", element: <OrderSuccessPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "pricing", element: <PricingPage /> },
      { path: "demo/lead-capture", element: <LeadCaptureDemoPage /> },
      { path: "demo/support-inbox", element: <SupportInboxDemoPage /> },
      {
        path: "demo/appointment-setter",
        element: <AppointmentSetterDemoPage />,
      },
    ],
  },
  { path: "/admin/login", element: <AdminLoginPage /> },
  {
    path: "/admin",
    element: <AdminRoute />,
    children: [
      {
        element: <AdminDashboardPage />,
        children: [
          { index: true, element: <AdminHomePage /> },
          { path: "automations", element: <AdminAutomationsPage /> },
          { path: "orders", element: <AdminOrdersPage /> },
          { path: "orders/:id", element: <AdminOrderDetailPage /> },
          { path: "demo-leads", element: <AdminDemoLeadsPage /> },
          { path: "demo-leads/:id", element: <AdminDemoLeadDetailPage /> },
        ],
      },
    ],
  },
]);
