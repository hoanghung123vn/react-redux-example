import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
const baseQuery = fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/todos/",
    prepareHeaders: (headers, { getState }) => {
        return headers;
    },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const countApi = createApi({
    reducerPath: "countApi",
    baseQuery: baseQueryWithRetry,
    keepUnusedDataFor: 15 * 60,
    endpoints: (builder) => ({
        getTodo: builder.query<Todo, number>({
            query: (id) => `${id}`,
        }),
    }),
});

export const { useGetTodoQuery } = countApi;
