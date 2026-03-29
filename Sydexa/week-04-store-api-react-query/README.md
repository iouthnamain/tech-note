# Tuần 4 - Quản Lý Store + Best Practice Tích Hợp API

[<- Quay lại tổng quan khóa học](../sydexa-react-courses.md)

## Mục tiêu tuần

- Phân tách client state, server state và transport layer rõ ràng.
- Biết khi nào dùng Redux, khi nào dùng Zustand, khi nào không cần global store.
- Hiểu React Query như một cache and synchronization layer thay vì fetch helper.

## Thứ tự học

1. [01 - Lựa Chọn Global Store: Redux vs Zustand](./01-redux-vs-zustand.md)
2. [02 - Thiết Lập Tầng API với Axios](./02-api-layer-with-axios.md)
3. [03 - React Query: Fetching](./03-react-query-fetching.md)
4. [04 - React Query: Mutation](./04-react-query-mutation.md)
5. [05 - React Query: Cache Handling](./05-react-query-cache-handling.md)
6. [06 - React Query: Background Refetch](./06-react-query-background-refetch.md)
7. [07 - React Query: Invalidation và Thực Hành Tích Hợp](./07-react-query-invalidation-practice.md)

## Dự Án Tuần

- [PROJECT.md](./PROJECT.md) - Project Tuần 4 - Workspace Data Layer Playground
- Nên bắt đầu phác thảo sau 2-3 bài đầu, rồi hoàn thiện sau khi kết thúc tuần.

## Kết quả đầu ra

- Thiết kế data layer rõ ràng cho một app frontend thực chiến.
- Kết hợp Axios, store và React Query mà không chồng chéo trách nhiệm.
- Xử lý đúng fetching, mutation, cache và invalidation.

## Nguồn chính

- https://redux.js.org/introduction/getting-started
- https://zustand.docs.pmnd.rs/getting-started/introduction
- https://tanstack.com/query/latest/docs/framework/react/overview
- https://axios-http.com/docs/intro
