export interface ExamTypes {
  id: string;
  _id: string;
  name: string;
  status: boolean;
  description: string;
  createdAt: Date;
}

export interface ExamDataTypes {
  doc: ExamTypes[];
}
