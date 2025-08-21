import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import SalesDashboardLayout from "./pages/SalesDasboardLayout";
import AgentDashboardLayout from "./pages/AgentDashboardLayout";
import AdminManagement from "./pages/AdminManagement";
import LeadsPage from "./pages/LeadsPage";
import ClientsPage from "./pages/ClientsPage";
import ClientPage from "./pages/ClientPage";
import TasksPage from "./pages/TasksPage";
import ReportsPage from "./pages/ReportsPage";
import MyTasksPage from "./pages/MyTasksPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import ViewJob from "./pages/ViewJob";
import CandidatePage from "./pages/CandidatePage";
import AdminChat from "./pages/AdminChat";
import SettingsPage from "./pages/SettingsPage";
import DashboardDefault from "./pages/DashboardDefault";
import DashboardPage from "./pages/CandidateSubAdmin/DashboardPage";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import UnauthorizedPage from "./pages/UnAuthorizedPage";
import NotFoundPage from "./pages/NotFoundPage";
import UsersPage from "./pages/UsersPage";
import CandidatesPage from "./pages/CandidateSubAdmin/CandidatesPage";
import CandidateDetailsPage from "./pages/CandidateSubAdmin/CandidateDetailsPage";
import LeadsDetailsPage from "./pages/LeadsDetailsPage";
import JobApplicationsPage from "./pages/CandidateSubAdmin/JobApplicationsPage";
import CandidateLeadsPage from "./pages/CandidateSubAdmin/CandidateLeadsPage";
import CandidateLeadsDetailsPage from "./pages/CandidateSubAdmin/CandidateLeadsDetailsPage";
import CandidateChatsPage from "./pages/CandidateSubAdmin/CandidateChatsPage";
import ScrollToTop from "./components/ScrollToTop";
import CandidateSubAdminReports from "./pages/CandidateSubAdmin/CandidateSubAdminReports";
import CandidateSubAdminMeetingsPage from "./pages/CandidateSubAdmin/CandidateSubAdminMeetingsPage";
import CandidateSubAdminSettings from "./pages/CandidateSubAdmin/CandidateSubAdminSettings";
import AgentDashboardPage from "./pages/AgentSubAdmin/DashboardPage";
import AgentsPage from "./pages/AgentSubAdmin/AgentsPage";
import AgentDetailsPage from "./pages/AgentSubAdmin/AgentDetailsPage";
import AgentLeadsPage from "./pages/AgentSubAdmin/AgentLeadsPage";
import AgentLeadsDetailsPage from "./pages/AgentSubAdmin/AgentLeadsDetailsPage";
import AgentChatsPage from "./pages/AgentSubAdmin/AgentChatsPage";
import AgentSubAdminReports from "./pages/AgentSubAdmin/AgentSubAdminReports";
import AgentSubAdminMeetingsPage from "./pages/AgentSubAdmin/AgentSubAdminMeetingsPage";
import AgentSubAdminSettings from "./pages/AgentSubAdmin/AgentSubAdminSettings";
import AgentJobApplicationsPage from "./pages/AgentSubAdmin/JobApplicationsPage";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["MainAdmin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardDefault />} />
          <Route path="admin" element={<AdminManagement />} />
          <Route path="admin/settings" element={<SettingsPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="clients" element={<ClientPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="admin/users" element={<UsersPage />} />
          <Route path="addjob" element={<AddJob />} />
          <Route path="editjob/:id" element={<EditJob />} />
          <Route path="viewjob" element={<ViewJob />} />
          <Route path="candidatepage" element={<CandidatePage />} />
          <Route path="adminchat" element={<AdminChat />} />
        </Route>

        {/* Sales Dashboard */}
        <Route
          path="/sales-dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["SalesAdmin"]}>
              <SalesDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="candidates" element={<CandidatesPage />} />
          <Route path="candidates/:id" element={<CandidateDetailsPage />} />
          <Route path="applications" element={<JobApplicationsPage />} />
          <Route path="chats" element={<CandidateChatsPage />} />
          <Route path="leads" element={<CandidateLeadsPage />} />
          <Route path="leads/:id" element={<CandidateLeadsDetailsPage />} />
          <Route path="meetings" element={<CandidateSubAdminMeetingsPage />} />
          <Route path="reports" element={<CandidateSubAdminReports />} />
          <Route path="settings" element={<CandidateSubAdminSettings />} />
        </Route>

        {/* Agent Dashboard */}
        <Route
          path="/agent-dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["AgentAdmin"]}>
              <AgentDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AgentDashboardPage />} />
          <Route path="agents" element={<AgentsPage />} />
          <Route path="agents/:id" element={<AgentDetailsPage />} />
          <Route path="applications" element={<AgentJobApplicationsPage />} />
          <Route path="chats" element={<AgentChatsPage />} />
          <Route path="leads" element={<AgentLeadsPage />} />
          <Route path="leads/:id" element={<AgentLeadsDetailsPage />} />
          <Route path="meetings" element={<AgentSubAdminMeetingsPage />} />
          <Route path="reports" element={<AgentSubAdminReports />} />
          <Route path="settings" element={<AgentSubAdminSettings />} />
          <Route path="mytasks" element={<MyTasksPage />} />
          <Route path="client" element={<ClientsPage />} />
          <Route path="candidatepage" element={<CandidatePage />} />
        </Route>

        {/* Unauthorized & 404 */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;