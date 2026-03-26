import axiosClient from "./axiosClient"
export const getParentDashboard = () =>
  axiosClient.get("/parent/dashboard")
export const getAdminDashboard = () =>
  axiosClient.get("/admin/dashboard")
export const getSpecialistDashboard = () =>
  axiosClient.get("/specialist/dashboard")
export const getParentProfileImage = () =>
  axiosClient.get("/Parent/profile-image")