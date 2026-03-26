import "../../assets/register.css"
import logo from "../../assets/images/logo.png"
import sideImg from "../../assets/images/ggg.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaUser, FaPhone, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { FcGoogle } from "react-icons/fc"
import { IoArrowForward } from "react-icons/io5"
import { registerParent, registerSpecialist } from "../../api/authService"

function RegisterPage() {

  const navigate = useNavigate()

  const [role, setRole] = useState("parent")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    bio: ""
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegister = async () => {

    if (!form.fullName || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      alert("من فضلك املى كل البيانات ❌")
      return
    }

    if (form.password !== form.confirmPassword) {
      alert("كلمة المرور غير متطابقة ❌")
      return
    }

    setLoading(true)

    try {

      if (role === "parent") {
        await registerParent({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          phoneNumber: form.phone,
          address: "Cairo"
        })
      } else {
        await registerSpecialist({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          specialization: form.specialization || "General",
          bio: form.bio || "Specialist"
        })
      }

      alert("تم إنشاء الحساب بنجاح ✅")

      // ✅ تفريغ الفورم
      setForm({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        specialization: "",
        bio: ""
      })

      navigate("/login")

    } catch (err) {
      alert(
        err.response?.data?.title ||
        err.response?.data?.message ||
        "فيه خطأ ❌"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-container">

      <div className="signup-right">
        <div className="signup-box">

          <div className="signup-header">
            <div className="logo-container">
              <div className="logo-circle">
                <img src={logo} alt="logo" />
              </div>
              <span className="logo-text">رفيق</span>
            </div>

            <h2 className="signup-title">إنشاء حساب جديد</h2>
            <p className="signup-subtitle">ابدأ رحلتك مع رفيق اليوم</p>
          </div>

          {/* ROLE */}
          <div className="role-switch">
            <button
              className={`role-btn ${role === "parent" ? "active" : ""}`}
              onClick={() => setRole("parent")}
            >
              <FaUser /> ولي أمر
            </button>

            <button
              className={`role-btn ${role === "specialist" ? "active" : ""}`}
              onClick={() => setRole("specialist")}
            >
              👨‍⚕️ أخصائي
            </button>
          </div>

          {/* FORM */}
          <div className="field-box">
            <FaUser className="field-icon" />
            <input
              type="text"
              name="fullName"
              placeholder="الاسم الكامل"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="field-box">
            <MdEmail className="field-icon" />
            <input
              type="email"
              name="email"
              placeholder="البريد الإلكتروني"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="field-box">
            <FaPhone className="field-icon" />
            <input
              type="text"
              name="phone"
              placeholder="رقم الجوال"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          {/* 👇 يظهر للأخصائي فقط */}
          {role === "specialist" && (
            <>
              <div className="field-box">
                <input
                  type="text"
                  name="specialization"
                  placeholder="التخصص"
                  value={form.specialization}
                  onChange={handleChange}
                />
              </div>

              <div className="field-box">
                <input
                  type="text"
                  name="bio"
                  placeholder="نبذة عنك"
                  value={form.bio}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="field-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="كلمة المرور"
              value={form.password}
              onChange={handleChange}
            />
            <span className="eye" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="field-box">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="تأكيد كلمة المرور"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <span className="eye" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="main-btn" onClick={handleRegister} disabled={loading}>
            {loading ? "جاري الإنشاء..." : `إنشاء حساب ${role === "parent" ? "ولي أمر" : "أخصائي"}`}
            <IoArrowForward />
          </button>

          <div className="split-line">أو سجل عن طريق</div>

          <div className="social-box">
            <button>
              <FaFacebook /> فيسبوك
            </button>
            <button>
              <FcGoogle /> جوجل
            </button>
          </div>

          <p className="login-redirect">
            لديك حساب؟ 
            <span onClick={() => navigate("/login")}>
              سجل الدخول
            </span>
          </p>

        </div>
      </div>

      <div className="signup-left">
        <img src={sideImg} alt="img" />
        <h3>مجتمع داعم ومتكامل</h3>
        <p>انضم لأكثر من 5000 عائلة تشارك نفس الرحلة والاهتمامات</p>
      </div>

    </div>
  )
}

export default RegisterPage