import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { forgotPassword } from "../../api/authService"
import logo from "../../assets/images/logo.png"
import "../../assets/login.css"
import toast from "react-hot-toast"

function ForgotPassword() {

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleSubmit = async () => {

    if (!email) {
      toast.error("من فضلك أدخل البريد الإلكتروني ❌")
      return
    }

    if (!isValidEmail(email)) {
      toast.error("صيغة البريد الإلكتروني غير صحيحة ❌")
      return
    }

    try {
      setLoading(true)

      await forgotPassword({ email })

      toast.success("راجع بريدك الإلكتروني لإعادة تعيين كلمة السر 📧")

      setTimeout(() => {
        navigate("/login")
      }, 1500)

    } catch (err) {
      // نفس الرسالة لأسباب أمنية
      toast.success("راجع بريدك الإلكتروني لإعادة تعيين كلمة السر 📧")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login">

      <div className="login-right">
        <div className="form-box">

          <div className="logo-container">
            <div className="logo-circle">
              <img src={logo} alt="logo" />
            </div>
            <span className="logo-text">رفيق</span>
          </div>

          <h2 className="title">نسيت كلمة السر</h2>
          <p className="subtitle">اكتب بريدك الإلكتروني</p>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>

            <div className="input-box">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="login-btns"
              disabled={loading}
            >
              {loading ? "جاري الإرسال..." : "إرسال"}
            </button>

          </form>

          <p className="register">
            رجوع؟ 
            <span onClick={() => navigate("/login")}>
              تسجيل الدخول
            </span>
          </p>

        </div>
      </div>

    </div>
  )
}

export default ForgotPassword