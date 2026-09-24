import { useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  LogIn,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    /* =========================================
       EMAIL VALIDATION
    ========================================= */

    if (!email.trim()) {
      setError("Please enter email.");
      return;
    }

    /* =========================================
       PASSWORD VALIDATION
    ========================================= */

    if (!password) {
      setError("Please enter password.");
      return;
    }

    setLoading(true);

    try {
      /* =========================================
         BACKEND ADMIN LOGIN API
      ========================================= */

      const response = await fetch(
  "import.meta.env.VITE_API_URL/api/admin/login",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      /* =========================================
         LOGIN SUCCESS
      ========================================= */

      if (response.ok && data.success) {
        localStorage.setItem(
          "kas_admin_token",
          data.token
        );

        localStorage.setItem(
          "kas_admin_logged_in",
          "true"
        );

        navigate("/admin/dashboard");

        return;
      }

      /* =========================================
         LOGIN FAILED
      ========================================= */

      setError(
        data.message ||
          "Email or password is incorrect"
      );
    } catch (error) {
      console.error(
        "Admin login error:",
        error
      );

      setError(
        "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">

      {/* =========================================
          LEFT SIDE
      ========================================= */}

      <section className="admin-login-brand">

        <div className="admin-login-brand-overlay"></div>

        <div className="admin-login-brand-content">

          <img
            src="/assets/images/kaslogo.png"
            alt="KAS Foundation"
            className="admin-login-logo"
          />

          <span className="admin-login-brand-label">
            KHEL AUR SHIKSHA FOUNDATION
          </span>

          <h1>
            KAS Foundation
          </h1>

          <p>
            Manage your foundation website,
            galleries and content from one
            powerful admin panel.
          </p>

        </div>

      </section>


      {/* =========================================
          RIGHT SIDE
      ========================================= */}

      <section className="admin-login-section">

        <div className="admin-login-card">

          <div className="admin-login-icon">
            <LockKeyhole size={28} />
          </div>

          <div className="admin-login-heading">

            <span>
              ADMIN PANEL
            </span>

            <h2>
              Welcome Back
            </h2>

            <p>
              Sign in to access the KAS Foundation
              administration panel.
            </p>

          </div>


          {/* =========================================
              ERROR
          ========================================= */}

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}


          {/* =========================================
              FORM
          ========================================= */}

          <form
            className="admin-login-form"
            onSubmit={handleSubmit}
          >

            {/* =====================================
                EMAIL
            ===================================== */}

            <div className="admin-login-field">

              <label htmlFor="admin-email">
                Email
              </label>

              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter email"
                autoComplete="email"
                disabled={loading}
              />

            </div>


            {/* =====================================
                PASSWORD
            ===================================== */}

            <div className="admin-login-field">

              <label htmlFor="admin-password">
                Password
              </label>

              <div className="admin-password-wrapper">

                <input
                  id="admin-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter password"
                  autoComplete="current-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>


            {/* =====================================
                FORGOT PASSWORD
            ===================================== */}

            <div className="admin-login-forgot">

              <Link to="/admin/forgot-password">
                Forgot Password?
              </Link>

            </div>


            {/* =====================================
                LOGIN BUTTON
            ===================================== */}

            <button
              type="submit"
              className="admin-login-button"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="admin-login-loader"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={19} />
                  Sign In
                </>
              )}

            </button>

          </form>


          {/* =========================================
              FOOTER
          ========================================= */}

          <div className="admin-login-footer">
            © {new Date().getFullYear()} Khel Aur
            Shiksha Foundation
          </div>

        </div>

      </section>

    </main>
  );
}

export default AdminLogin;