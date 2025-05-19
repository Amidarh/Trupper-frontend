export interface CategoryTypes {
    id: string;
    name: string;
    status: boolean;
    description: string;
    createdAt: Date;
}

export interface CategoryDataTypes {
    doc: CategoryTypes[]
}