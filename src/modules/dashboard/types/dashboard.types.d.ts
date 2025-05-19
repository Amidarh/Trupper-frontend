export interface userSignupAnalytics {
    month: string,
    signups: number
}

export interface doc {
    userCount: number,
    subjectCount: number,
    ExamCategoriesCount: number,
    QuestionsCount: number,
    ExamCount: number,
    userCategoryCount: number,
    userCategoryTwoCount: number,
    ExamTypeCount: number,
    AdminCount: number,
    monthlyUserAnalytics: userSignupAnalytics[]
}

export interface analyticsData {
    doc: doc
}