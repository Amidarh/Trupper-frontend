import DashboardLayout from "@/core/commons/layout/dashboardLayout"
import { Codes } from "@/modules/codes/layouts/codes";

const CodesPage = () => {
    return (
        <DashboardLayout
            pageTitle="Code"
            subHeading="Generate Codes for different use cases"
        >
            <Codes/>
        </DashboardLayout>
    )
};

export default CodesPage;