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
    files: File[];
    files_counts: number;
    comments: Comment[];
    comments_count: number;
    created_at: Date;
    updated_at: Date | null;
}

export interface File {
    id: number;
    post_id: number;
    user_id: number;
    path: string;
    is_submitted: boolean;
    created_at: Date;
    updated_at: Date | null;
}

export interface Comment {
    id: number;
    user_id: number;
    post_id: number;
    content: string;
    replies_count: number;
    user: User;
    created_at: Date;
    updated_at: Date | null;
}

export interface Reply {
    id: number;
    user_id: number;
    comment_id: number;
    content: string;
    user: User;
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
