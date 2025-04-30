"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StudentManagement } from "@/components/modules/student-management"
import { TeacherManagement } from "@/components/modules/teacher-management"
import { ClassSetup } from "@/components/modules/class-setup"
import { Attendance } from "@/components/modules/attendance"
import { Timetable } from "@/components/modules/timetable"
import { Reports } from "@/components/modules/reports"
import { ParentPortal } from "@/components/modules/parent-portal"
import { HomeworkManager } from "@/components/modules/homework-manager"
import { FeeTracking } from "@/components/modules/fee-tracking"
import { EventCalendar } from "@/components/modules/event-calendar"
import { NotificationLog } from "@/components/modules/notification-log"
import { ReportCardGenerator } from "@/components/modules/report-card-generator"
import { MultiCampusSwitcher } from "@/components/modules/multi-campus-switcher"
import { LessonPlanner } from "@/components/modules/lesson-planner"
import { AnalyticsDashboard } from "@/components/modules/analytics-dashboard"
import { RolePermissionBuilder } from "@/components/modules/role-permission-builder"
import { ComplaintBox } from "@/components/modules/complaint-box"
import { DocumentVault } from "@/components/modules/document-vault"
import { ApiSettings } from "@/components/modules/api-settings"
import { Overview } from "@/components/modules/overview"

export default function Home() {
  const [currentModule, setCurrentModule] = useState("overview")
  const [currentTier, setCurrentTier] = useState(1)
  const [currentRole, setCurrentRole] = useState("administrator")

  const renderModule = () => {
    switch (currentModule) {
      case "overview":
        return <Overview currentTier={currentTier} currentRole={currentRole} />
      case "students":
        return <StudentManagement />
      case "teachers":
        return <TeacherManagement />
      case "classes":
        return <ClassSetup />
      case "attendance":
        return <Attendance />
      case "timetable":
        return <Timetable />
      case "reports":
        return <Reports />
      case "parent-portal":
        return currentTier >= 2 ? <ParentPortal /> : <LockedFeature tier={2} />
      case "homework":
        return currentTier >= 2 ? <HomeworkManager /> : <LockedFeature tier={2} />
      case "fees":
        return currentTier >= 2 ? <FeeTracking /> : <LockedFeature tier={2} />
      case "events":
        return currentTier >= 2 ? <EventCalendar /> : <LockedFeature tier={2} />
      case "notifications":
        return currentTier >= 2 ? <NotificationLog /> : <LockedFeature tier={2} />
      case "report-cards":
        return currentTier >= 2 ? <ReportCardGenerator /> : <LockedFeature tier={2} />
      case "multi-campus":
        return currentTier >= 3 ? <MultiCampusSwitcher /> : <LockedFeature tier={3} />
      case "lesson-planner":
        return currentTier >= 3 ? <LessonPlanner /> : <LockedFeature tier={3} />
      case "analytics":
        return currentTier >= 3 ? <AnalyticsDashboard /> : <LockedFeature tier={3} />
      case "roles":
        return currentTier >= 3 ? <RolePermissionBuilder /> : <LockedFeature tier={3} />
      case "complaints":
        return currentTier >= 3 ? <ComplaintBox /> : <LockedFeature tier={3} />
      case "documents":
        return currentTier >= 3 ? <DocumentVault /> : <LockedFeature tier={3} />
      case "api":
        return currentTier >= 3 ? <ApiSettings /> : <LockedFeature tier={3} />
      default:
        return <Overview currentTier={currentTier} currentRole={currentRole} />
    }
  }

  return (
    <DashboardLayout
      currentModule={currentModule}
      setCurrentModule={setCurrentModule}
      currentTier={currentTier}
      setCurrentTier={setCurrentTier}
      currentRole={currentRole}
      setCurrentRole={setCurrentRole}
    >
      {renderModule()}
    </DashboardLayout>
  )
}

function LockedFeature({ tier }: { tier: number }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <div className="text-6xl mb-4">🔒</div>
      <h3 className="text-xl font-semibold mb-2">Feature Locked</h3>
      <p className="text-gray-500 mb-4 text-center">This feature is only available in Tier {tier} and above</p>
      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md transition-colors">
        Upgrade to Tier {tier}
      </button>
    </div>
  )
}
