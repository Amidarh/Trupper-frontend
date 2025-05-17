"use client"

import DashboardLayout from "@/core/commons/layout/dashboardLayout";
import { MyDashboard } from "@/modules/my-dashboard/layouts/dashboard";
import { useAltStore } from "@/lib/zustand/userStore";

const MyDashboardPage = () => {
     const { organization } = useAltStore()
    return (
        <DashboardLayout
            pageTitle="Hello Wisdom"
            subHeading={`Welcome to your ${organization?.name} dashboard`}
        >
            <MyDashboard/>
        </DashboardLayout>
    )
};

export default MyDashboardPage;