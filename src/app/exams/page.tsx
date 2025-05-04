"use client"

import DashboardLayout from "@/core/commons/layout/dashboardLayout";
import { Exams } from "@/modules/exam/layouts/exam";

const ExamPage = () => {
    return (
        <DashboardLayout
            pageTitle="Exams"
            subHeading="Manage your exam types here"
        >
            <Exams/>
        </DashboardLayout>
    )
};

export default ExamPage;