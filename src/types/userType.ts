interface User {
    id: number;
    email: string;
    fullName: string;
    account_type: string;
    createdAt: string;
    updatedAt: string;
    name: string;
}

export interface UserType {
    message?: string;
    user: User;
    token: string;
}
