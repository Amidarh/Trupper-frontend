import { ExamTypes } from "./examTypes.types";


export interface ExamType {
    name: string;
    acronym: string;
    duration: string;
    examType: ExamTypes;
    category?: string;
    image: File;
    maxNoOfSubjects: number;
    minNoOfSubjects: number;
    subjectToBeWritten: number;
    noOfQuestions: number;
    status?: boolean;
    createdAt: Date;
    id:string;
    scoreMultiplier: number
};

export interface ExamDataType {
    doc: ExamType[]
}