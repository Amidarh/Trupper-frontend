import { Separator } from "@/components/ui/separator"
import { ExamCard } from "../../components/cards/examCard";

export const MainCards = () => {
    return (
        <main>
            <Separator/>
            <section className="mt-3 flex gap-2 flex-row flex-wrap">
                <ExamCard/>
                <ExamCard/>
                <ExamCard/>
                <ExamCard/>
                <ExamCard/>
                <ExamCard/>
            </section>
        </main>
    )
}