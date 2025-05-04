"use client"

import DashboardLayout from "@/core/commons/layout/dashboardLayout";
import { SubjectsByExams } from "@/modules/subjects/layouts/subjectsByExams";

const SubjectsByExamsPage = () => {
    return (
        <DashboardLayout
            pageTitle="Exams"
            subHeading="Manage your exam types here"
        >
            <SubjectsByExams/>
        </DashboardLayout>
    )
};

export default SubjectsByExamsPage;