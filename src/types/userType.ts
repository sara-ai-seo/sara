interface Profile {
        avatar: string;
        createdAt: string; // ISO date string
        id: number;
        phone: string | null; // Phone can be a string or null
        role: string
        status: "ACTIVE" | string; // Assuming "ACTIVE" is a possible status, but allowing for other statuses
        updatedAt: string; // ISO date string
        userId: number;
}


interface User {
    id: number;
    email: string;
    fullName: string;
    account_type: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    location: {
        code: number
    };
    profile: Profile;
}

export interface UserType {
    message?: string;
    user: User;
    token: string;
}
