import axiosClient from "./axiosClient"
export const getAppointmentsByChild = (childId) =>
  axiosClient.get(`/Appointments/child/${childId}`)

export const createAppointment = (data) =>
  axiosClient.post("/Appointments", data)

export const cancelAppointment = (id) =>
  axiosClient.post(`/Appointments/${id}/cancel`)