export interface User {
    id: number;
    profile_picture: string | null;
    first_name: string;
    last_name: string;
    company_name: string;
    company_address: string;
    student_no: string;
    email: string;
    email_verified_at: Date | null;
    is_admin: boolean;
    status: string;
    created_at: Date;
    updated_at: Date | null;
}

export interface Post {
    id: number;
    user_id: number;
    title: string;
    description: string;
    is_uploadable: boolean;
    created_at: Date;
    updated_at: Date | null;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    flash: {
        message?: string;
    }
};
