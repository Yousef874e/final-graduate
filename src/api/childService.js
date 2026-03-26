import axiosClient from "./axiosClient"

export const createChild = (data) => {
  return axiosClient.post("/Children", data)
}

export const getChildProfile = (childId) => {
  return axiosClient.get(`/Children/${childId}`)
}

export const updateChildProfile = (childId, data) => {
  return axiosClient.put(`/Children/${childId}`, data)
}

// ✅ مهم
export const uploadChildImage = (childId, formData) => {
  return axiosClient.post(`/Media/upload/image?childId=${childId}`, formData)
}