import { useState } from "react"
import { useNavigate } from "react-router-dom"
import sideImg from "../../assets/images/ggg.png"
import "../../assets/child.css"
import axiosClient from "../../api/axiosClient"

function ChildImage() {

  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (!selected) return

    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const handleSubmit = async () => {

    if (!file) {
      alert("اختار صورة ❌")
      return
    }

    try {

      const formData = new FormData()
      formData.append("file", file)
      formData.append("category", "ProfileImage")

      const uploadRes = await axiosClient.post(
        "/Media/upload/image",
        formData
      )

      console.log("Upload Response:", uploadRes.data)

      const mediaId =
        uploadRes.data?.id ||
        uploadRes.data?.mediaId ||
        uploadRes.data?.data?.id

      if (!mediaId) {
        alert("مشكلة في رفع الصورة ❌")
        return
      }

      const childId = localStorage.getItem("childId")

      if (!childId) {
        alert("مفيش childId ❌")
        return
      }

      await axiosClient.put(
        `/Children/${childId}/profile-image`,
        { mediaId }
      )

      alert("تم رفع الصورة بنجاح ✅")

      navigate("/dashboard/parent")

    } catch (err) {
      console.log(err)
      alert(err.response?.data?.title || "فيه خطأ ❌")
    }
  }

  return (
    <div className="child-container">

      <div className="child-left">
        <img src={sideImg} alt="img" />
        <h3>مجتمع داعم ومتكامل</h3>
        <p>انضم لأكثر من 5000 عائلة تشارك نفس الرحلة والاهتمامات</p>
      </div>

      <div className="child-right">

        <div className="child-box" style={{ textAlign: "center" }}>

          <h2 className="child-title">مرحبًا بك</h2>
          <p className="child-sub">يرجى اختيار صورة واضحة للطفل</p>

          <label className="upload-circle">
            {preview ? (
              <img src={preview} alt="preview" className="preview-img" />
            ) : (
              <span style={{ fontSize: "30px" }}>📷</span>
            )}
            <input type="file" hidden onChange={handleFileChange} />
          </label>

          <p style={{ margin: "10px 0", color: "#fff" }}>
            تحميل الصورة من الجهاز
          </p>

          <button className="child-btn" onClick={handleSubmit}>
           دخول إلى لوحة التحكم →
          </button>

        </div>

      </div>

    </div>
  )
}

export default ChildImage