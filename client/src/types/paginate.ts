export type PaginatedResponseType<T> = {
    data: T;
    currentPage: number;
    totalPages: number;
    totalItems: number;
};

export type PaginatedRequestType<T = {}> = {
    limit: number;
    page: number;
    data?: T;
};