import DashboardLayout from "@/core/commons/layout/dashboardLayout";
import { ViewResultContent } from "@/modules/user-results/layouts/viewResults";

export default function ViewResult(){
    return (
        <DashboardLayout
            pageTitle="O'Level Exam results"
            subHeading="Here is the result of users tha took this exam"
        >
            <ViewResultContent/>
        </DashboardLayout>
    )
}