"use client";

import DashboardLayout from "@/core/commons/layout/dashboardLayout";
import { AdminDetail } from "@/modules/subAdmin/layout/viewSubAdmin";

const AdminDetailPage = () => {
    return (
        <DashboardLayout
            pageTitle="Wisdom Woke"
            subHeading="Manage your admin here"
        >
            <AdminDetail />
        </DashboardLayout>
    )
};

export default AdminDetailPage;