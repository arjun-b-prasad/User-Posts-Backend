export interface LoginInterface
{
    user: UserData;
    token: string;
}

export interface UserData
{
    id: number;
    name: string;
    email: string;
    isVerified: boolean;
}