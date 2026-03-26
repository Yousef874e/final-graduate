import axiosClient from "./axiosClient"

// 🔐 تغيير كلمة السر
export const changePassword = (data) => {
  return axiosClient.post("/Account/change-password", data)
}

// 🖼 رفع صورة
export const uploadProfileImage = (formData) => {
  return axiosClient.post("/Media/upload/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}