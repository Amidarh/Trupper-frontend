"use client"

import DashboardLayout from "@/core/commons/layout/dashboardLayout";
import { StatsCard } from "@/modules/dashboard/components/card/statsCard";
import { UserSignupChart } from "@/modules/dashboard/components/chart/usersSignupBarChart";
import { Users } from "lucide-react";
import { DailyActivityBarChart } from "@/modules/dashboard/components/chart/dailyBarchart";

const DashboardPage = () => {
    return (
        <DashboardLayout
            pageTitle="Dashboard"
            subHeading=""
        >
            <main>
                <p>Overview of entire school management platform</p>
                
                <section className="mt-4 grid grid-cols-3 gap-4 ">
                   <StatsCard
                        Icon={Users}
                        title="Total Users"
                        stat={1000}
                   />
                   <StatsCard
                        Icon={Users}
                        title="Total Exams"
                        stat={1000}
                   />
                   <StatsCard
                        Icon={Users}
                        title="Total Questions"
                        stat={1000}
                   />
                   <StatsCard
                        Icon={Users}
                        title="Total Questions"
                        stat={1000}
                   />
                   <StatsCard
                        Icon={Users}
                        title="Total Questions"
                        stat={1000}
                   />
                   <StatsCard
                        Icon={Users}
                        title="Total Questions"
                        stat={1000}
                   />
                </section>

                {/* Charts */}

                <section className="mt-7">
                    <UserSignupChart/>
                </section>
                <section className="mt-6 grid grid-cols-2 gap-4">
                    <DailyActivityBarChart/>
                    <DailyActivityBarChart/>
                </section>
            </main>
        </DashboardLayout>
    )
};

export default DashboardPage;