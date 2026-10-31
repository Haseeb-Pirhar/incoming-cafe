// "use server";
// import { serverAction } from "@/api/server-action";
// import {
//   DASHBOARD_STATS,
//   REVIEWS_ENDPOINT,
//   SPLASH_ENDPOINT,
// } from "../endpoints";

// import toast from "react-hot-toast";
// import { ApiError } from "@/types/api";
// import { TotalProductResponse } from "@/types/product";

// // STATS APIs

// export const getTotalProducts = async (page: number) => {
//   try {
//     const response = await serverAction({
//       url: `/dashboard/total-market?page=${page}`,
//       method: "GET",
//     });
//     if (response.state && response.data) {
//       return response.data as TotalProductResponse;
//     }
//   } catch (error) {
//     console.error("Error fetching reviews:", error);
//     return null;
//   }
// };

// export const getReviews = async (page: number, type: string) => {
//   try {
//     const response = await serverAction({
//       url: `/dashboard/reviews?page=${page}&limit=10?status=${type}`,
//       method: "GET",
//     });
//     if (response.state && response.data) {
//       return response.data;
//     }
//   } catch (error) {
//     console.error("Error fetching reviews:", error);
//     return null;
//   }
// };

// export const reviewStatusUpdate = async (id: string, status: string) => {
//   try {
//     const response = await serverAction({
//       url: `${REVIEWS_ENDPOINT}/${id}`,
//       method: "PUT",
//       body: { status },
//     });
//     if (response.state && response.data) {
//       return response.data;
//     }
//   } catch (error) {
//     const apiError = error as ApiError;
//     toast.error(apiError.response?.data?.message || "An error occurred");
//     console.error("Error during submission:", error);
//     return null;
//   }
// };
