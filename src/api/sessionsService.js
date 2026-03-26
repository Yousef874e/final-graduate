import axiosClient from "./axiosClient"
export const getSessionsByChild = (childId) =>
  axiosClient.get(`/Sessions/child/${childId}`)

// GET single
export const getSessionById = (id) =>
  axiosClient.get(`/Sessions/${id}`)

// START session
export const startSession = (data) =>
  axiosClient.post("/Sessions/start", data)

// SUBMIT video
export const submitSessionVideo = (sessionId, mediaId) =>
  axiosClient.post(`/Sessions/${sessionId}/submit-video`, {
    mediaId
  })