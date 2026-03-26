import axiosClient from "./axiosClient"

export const login = (data) => {
  return axiosClient.post("/Auth/login", data)
}

export const registerParent = (data) => {
  return axiosClient.post("/Auth/register/parent", data)
}

export const registerSpecialist = (data) => {
  return axiosClient.post("/Auth/register/specialist", data)
}

export const forgotPassword = (data) => {
  return axiosClient.post("/Account/forgot-password", data)
}

export const resetPassword = (data) => {
  return axiosClient.post("/Account/reset-password", data)
}

// ✅ مهم
export const getChildren = () => {
  return axiosClient.get("/Children")
}