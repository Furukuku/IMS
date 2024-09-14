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

export interface Link {
    active: boolean;
    label: string;
    url: string | null;
}

export interface PaginatedUsers {
    data: User[];
    links: Link[];
    current_page: number;
    first_page_url: string;
    last_page: number;
    last_page_url: string;
    per_page: number;
    prev_page_url: string | null;
    next_page_url: string;
    path: string;
    from: number;
    to: number;
    total: number;
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
    unique_name: string;
    orig_name: string;
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

export interface Conversation {
    id: number;
    name: string | null;
    pivot?: ConversationUser;
    conversation_user?: ConversationUser;
    latest_message: Message | null;
    messages?: Message[];
    created_at: Date | null;
    updated_at: Date;
}

export interface ConversationUser {
    conversation_id: number;
    user_id: number;
    client_id: number;
    client_name: string | null;
    created_at: Date;
    updated_at: Date | null;
}

export interface Message {
    id: number;
    user_id: number;
    conversation_id: number;
    content: string;
    created_at: Date;
    updated_at: Date | null;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    flash: {
        message?: string;
        token?: string;
    }
};
