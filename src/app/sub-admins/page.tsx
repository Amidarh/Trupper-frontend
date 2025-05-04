"use client"

import DashboardLayout from "@/core/commons/layout/dashboardLayout";
import { AdminTable } from "@/modules/subAdmin/components/table/adminTable";

const DashboardPage = () => {
    return (
        <DashboardLayout
            pageTitle="My Users"
            subHeading="Manage your users here"
        >
            <AdminTable/>
        </DashboardLayout>
    )
};

export default DashboardPage;