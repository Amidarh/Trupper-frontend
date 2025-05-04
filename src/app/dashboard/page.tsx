"use client"

import DashboardLayout from "@/core/commons/layout/dashboardLayout";
import { StatsCard } from "@/modules/dashboard/components/card/statsCard";
import { UserSignupChart } from "@/modules/dashboard/components/chart/usersSignupBarChart";
import { Users } from "lucide-react";
import { DailyActivityBarChart } from "@/modules/dashboard/components/chart/dailyActiveStatusChart";
import { UserCategoryChart } from "@/modules/dashboard/components/chart/userCategoryChart";
import { ExamTable } from "@/modules/dashboard/components/table/examsTable";
import { UserCategoryTable } from "@/modules/dashboard/components/table/userCategoryTable";

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
                        title="Total Admins"
                        stat={5}
                   />
                   <StatsCard
                        Icon={Users}
                        title="Total User Categories"
                        stat={12}
                   />
                   <StatsCard
                        Icon={Users}
                        title="Total Exam Types"
                        stat={5}
                   />
                   <StatsCard
                        Icon={Users}
                        title="Total Subjects"
                        stat={50}
                   />
                   <StatsCard
                        Icon={Users}
                        title="Total Questions"
                        stat={53000}
                   />
                </section>

                {/* Charts */}

                <section className="mt-7">
                    <UserSignupChart/>
                </section>
                <section className="mt-6 grid grid-cols-2 gap-4">
                    <DailyActivityBarChart/>
                    <UserCategoryChart/>
                </section>

                <section className="mt-7 grid grid-cols-2 gap-4">
                    <ExamTable/>
                    <UserCategoryTable/>
                </section>
                
            </main>
        </DashboardLayout>
    )
};

export default DashboardPage;