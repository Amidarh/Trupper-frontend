import DashboardLayout from "@/core/commons/layout/dashboardLayout"
import { CreateNotifications } from "@/modules/notifications/layouts/createNotification";

const CreateNotificationPage = () => {
    return (
        <DashboardLayout
            pageTitle="Create Notification"
            subHeading="Create notifications for your users"
        >
            <CreateNotifications/>
        </DashboardLayout>
    )
};

export default CreateNotificationPage;