import { createContext, useContext, useEffect, useState } from "react"
import { getParentDashboard, getParentProfileImage } from "../api/dashboardService"

const AppContext = createContext()

export const AppProvider = ({ children }) => {

  const [data, setData] = useState({})
  const [profileImage, setProfileImage] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const res = await getParentDashboard()
      setData(res?.data || {})
    } catch {}

    try {
      const img = await getParentProfileImage()
      setProfileImage(img?.data?.url || img?.data?.thumbnailUrl)
    } catch {}
  }

  return (
    <AppContext.Provider value={{ data, profileImage }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)