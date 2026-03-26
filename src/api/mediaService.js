import axiosClient from "./axiosClient"

export const uploadProfileImage = (formData) => {
  return axiosClient.post("/Media/upload/image", formData)
}