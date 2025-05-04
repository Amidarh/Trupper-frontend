import DashboardLayout from "@/core/commons/layout/dashboardLayout"
import { CreateQuestion } from "@/modules/questions/layouts/createQuestions";

const CreateQuestionPage = () => {
    return (
        <DashboardLayout pageTitle="New Question" subHeading="Add a new question">
            <CreateQuestion/>
        </DashboardLayout>
    )
}

export default CreateQuestionPage;