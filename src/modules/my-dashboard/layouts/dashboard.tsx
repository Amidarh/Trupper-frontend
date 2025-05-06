import { Card, CardHeader } from "@/components/ui/card";
import { PerformanceBarChart } from "../components/charts/performanceBarChart";
import { StatsCard } from "../components/cards/statsCard";
import { Sparkles, User2, SquareLibrary, PenBox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationsTable } from "../components/tables/notifications";

export const MyDashboard = () => {
    return (
        <main>
            <h1>Quick Overview</h1>
            <section className="mt-4 flex flex-row gap-4">
                <PerformanceBarChart/>
                <Card className="grid grid-cols-2 gap-4 w-full px-4 max-w-xl">
                    <StatsCard
                        Icon={User2}
                        stat={10}
                        title="Total Exam Taken"
                    />
                    <StatsCard
                        Icon={User2}
                        stat={10}
                        title="Total Exam Taken"
                    />
                    <StatsCard
                        Icon={User2}
                        stat={10}
                        title="Total Exam Taken"
                    />
                    <StatsCard
                        Icon={User2}
                        stat={10}
                        title="Total Exam Taken"
                    />
                </Card>
            </section>
            <div className="flex flex-row gap-2 items-center mt-3">
                <Button>
                    <Sparkles scale={16}/>
                    <p>AI Examiner</p>
                </Button>
                <Button>
                    <SquareLibrary scale={16}/>
                    <p>My Exams</p>
                </Button>
                <Button>
                    <PenBox scale={16}/>
                    <p>Mock Exams</p>
                </Button>
            </div>
            <div className="mt-5">
                <NotificationsTable/>
            </div>
        </main>
    )
}