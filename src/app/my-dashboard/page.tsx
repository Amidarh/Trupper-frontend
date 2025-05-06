import DashboardLayout from "@/core/commons/layout/dashboardLayout";
import { MyDashboard } from "@/modules/my-dashboard/layouts/dashboard";

const MyDashboardPage = () => {
    return (
        <DashboardLayout
            pageTitle="Hello Wisdom"
            subHeading="Welcome to your trupper dashboard"
        >
            <MyDashboard/>
        </DashboardLayout>
    )
};

export default MyDashboardPage;