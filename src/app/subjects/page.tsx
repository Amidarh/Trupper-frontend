"use client"

import DashboardLayout from "@/core/commons/layout/dashboardLayout";
import { Subject } from "@/modules/subjects/layouts/subjects";

const SubjectPage = () => {
    return (
        <DashboardLayout
            pageTitle="Subjects"
            subHeading="Manage subjects here"
        >
            <Subject/>
        </DashboardLayout>
    )
};

export default SubjectPage;