import axiosClient from "./axiosClient"

export const getExercises = (pageNumber = 1, pageSize = 20) => {
  return axiosClient.get("/Exercises", {
    params: {
      pageNumber,
      pageSize
    }
  })
}