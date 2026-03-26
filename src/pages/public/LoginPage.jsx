import "../../assets/login.css"
import logo from "../../assets/images/logo.png"
import { FaUser, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { FcGoogle } from "react-icons/fc"
import { IoArrowForward } from "react-icons/io5"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login, getChildren } from "../../api/authService"
import { setAuth } from "../../utils/auth"

function LoginPage() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedTab, setSelectedTab] = useState("parent")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {

    if (!email || !password) {
      alert("من فضلك املأ البيانات ❌")
      return
    }

    setLoading(true)

    try {
      const res = await login({ email, password })

      // ✅ حفظ التوكن + الداتا
      setAuth(res.data)

      const role = res.data?.roles?.[0] || ""

      // ✅ التحقق من التاب
      if (selectedTab === "parent" && role !== "Parent") {
        alert("الحساب ليس ولي أمر ❌")
        return
      }

      if (selectedTab === "specialist" && role !== "Specialist") {
        alert("الحساب ليس أخصائي ❌")
        return
      }

      // ✅ التوجيه حسب الدور
      switch (role) {

        case "Parent":
          try {
            const childRes = await getChildren()

            if (childRes.data?.length > 0) {
              // ✅ حفظ childId عشان باقي الصفحات
              localStorage.setItem("childId", childRes.data[0].id)

              navigate("/dashboard/profile")
            } else {
              navigate("/child-info-step1")
            }

          } catch (err) {
            navigate("/child-info-step1")
          }
          break

        case "Admin":
          navigate("/dashboard/admin")
          break

        case "Specialist":
          navigate("/dashboard/specialist")
          break

        default:
          alert("Role غير معروف ❌")
      }

    } catch (err) {
      alert(err.response?.data?.title || "فيه خطأ ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login">

      {/* RIGHT */}
      <div className="login-right">
        <div className="form-box">

          <div className="signup-header">
            <div className="logo-container">
              <div className="logo-circle">
                <img src={logo} alt="logo" />
              </div>
              <span className="logo-text">رفيق</span>
            </div>

            <h2 className="signup-title">مرحبا بعودتك</h2>
            <p className="signup-subtitle">اختر حساب للمتابعه</p>
          </div>

          {/* Tabs */}
          <div className="tabs">
            <button 
              className={`tab ${selectedTab === "parent" ? "active" : ""}`}
              onClick={() => setSelectedTab("parent")}
            >
              <FaUser /> ولي أمر
            </button>

            <button 
              className={`tab ${selectedTab === "specialist" ? "active" : ""}`}
              onClick={() => setSelectedTab("specialist")}
            >
              👨‍⚕️ أخصائي
            </button>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleLogin() }}>

            <div className="input-box">
              <MdEmail className="input-icon" />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="كلمة السر"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="forget" onClick={() => navigate("/forgot-password")}>
              نسيت كلمة السر؟
            </div>

            <button type="submit" className="login-btns" disabled={loading}>
              {loading ? "جاري تسجيل الدخول..." : `تسجيل الدخول ك ${selectedTab === "parent" ? "ولي أمر" : "أخصائي"}`}
              <IoArrowForward />
            </button>

          </form>

          <div className="divider">أو سجل عن طريق</div>

          <div className="social">
            <button>
              <FaFacebook /> فيسبوك
            </button>
            <button>
              <FcGoogle /> جوجل
            </button>
          </div>

          <p className="register">
            ليس لديك حساب؟ 
            <span onClick={() => navigate("/register")}>
              أنشئ حساب جديد مجاناً
            </span>
          </p>

        </div>
      </div>

      {/* LEFT */}
      <div className="login-left">
        <div className="overlay">

          <h2>
            صحة طفلك
            <br />
            في أيدي أمينة.
          </h2>

          <p>
            انضم إلى مجتمع رفيق واستفد من أحدث التقنيات
            في متابعة وعلاج الأطفال.
          </p>

          <div className="features">
            <div className="feature">✔ خطط علاجية معتمدة</div>
            <div className="feature">✔ تواصل مع الأخصائيين</div>
            <div className="feature">✔ تقارير دورية</div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default LoginPage