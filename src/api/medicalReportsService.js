import axiosClient from "./axiosClient"

// 🔹 get reports
export const getMedicalReports = (childId) => {
  return axiosClient.get(`/MedicalReports/child/${childId}`)
}

// 🔹 delete report
export const deleteMedicalReport = (id) => {
  return axiosClient.delete(`/MedicalReports/${id}`)
}