"use client"

import DashboardLayout from "@/core/commons/layout/dashboardLayout";
import { AdminTable } from "@/modules/subAdmin/components/table/adminTable";

const DashboardPage = () => {
    return (
        <DashboardLayout
            pageTitle="My Sub Admins"
            subHeading="Manage your sub admins here"
        >
            <AdminTable/>
        </DashboardLayout>
    )
};

export default DashboardPage;