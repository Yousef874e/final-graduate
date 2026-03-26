import axiosClient from "./axiosClient"

// 🔥 جلب الأخصائيين
export const getSpecialists = (params) => {
  return axiosClient.get("/Specialists", { params })
}