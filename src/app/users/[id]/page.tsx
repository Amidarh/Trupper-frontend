"use client";

import DashboardLayout from "@/core/commons/layout/dashboardLayout";
import { UserPage } from "@/modules/users/layouts/user";

const UserDetailsPage = () => {
    return (
        <DashboardLayout
            pageTitle="Wisdom Woke"
            subHeading="Manage your users here"
        >
            <UserPage />
        </DashboardLayout>
    )
};

export default UserDetailsPage;