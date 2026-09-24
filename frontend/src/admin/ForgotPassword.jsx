import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  Send,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    /* =========================================
       EMAIL VALIDATION
    ========================================= */

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      /* =========================================
         FORGOT PASSWORD API
      ========================================= */

      const response = await fetch(
        "http://localhost:5000/api/admin/forgot-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      );

      const data = await response.json();

      /* =========================================
         REGISTERED EMAIL
      ========================================= */

      if (
        response.ok &&
        data.success &&
        data.registered
      ) {
        setSuccess(
          data.message ||
            `Reset link has been sent to your registered email: ${data.email}`
        );

        setEmail("");

        return;
      }

      /* =========================================
         EMAIL NOT REGISTERED
      ========================================= */

      if (
        response.status === 404 &&
        data.registered === false
      ) {
        setError(
          data.message ||
            "This email is not registered."
        );

        return;
      }

      /* =========================================
         OTHER ERROR
      ========================================= */

      setError(
        data.message ||
          "Unable to process password reset request."
      );
    } catch (error) {
      console.error(
        "Forgot password error:",
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
    <main className="forgot-password-page">

      {/* =========================================
          LEFT BRAND SECTION
      ========================================= */}

      <section className="forgot-password-brand">

        <div className="forgot-password-brand-overlay"></div>

        <div className="forgot-password-brand-content">

          <img
            src="/assets/images/kaslogo.png"
            alt="KAS Foundation"
            className="forgot-password-logo"
          />

          <span className="forgot-password-brand-label">
            KHEL AUR SHIKSHA FOUNDATION
          </span>

          <h1>
            KAS Foundation
          </h1>

          <p>
            Securely recover your admin account
            and continue managing your foundation
            website.
          </p>

        </div>

      </section>


      {/* =========================================
          RIGHT FORM SECTION
      ========================================= */}

      <section className="forgot-password-section">

        <div className="forgot-password-card">

          <div className="forgot-password-icon">
            <ShieldCheck size={28} />
          </div>


          <div className="forgot-password-heading">

            <span>
              ACCOUNT RECOVERY
            </span>

            <h2>
              Forgot Password?
            </h2>

            <p>
              Enter your admin email address and
              we will send you a password reset link.
            </p>

          </div>


          {/* =========================================
              ERROR MESSAGE
          ========================================= */}

          {error && (
            <div className="forgot-password-error">

              <XCircle size={18} />

              <span>
                {error}
              </span>

            </div>
          )}


          {/* =========================================
              SUCCESS MESSAGE
          ========================================= */}

          {success && (
            <div className="forgot-password-success">

              <CheckCircle2 size={18} />

              <span>
                {success}
              </span>

            </div>
          )}


          {/* =========================================
              FORM
          ========================================= */}

          <form
            className="forgot-password-form"
            onSubmit={handleSubmit}
          >

            <div className="forgot-password-field">

              <label htmlFor="forgot-email">
                Email
              </label>

              <div className="forgot-password-input-wrapper">

                <Mail size={18} />

                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="Enter admin email"
                  autoComplete="email"
                  disabled={loading}
                />

              </div>

            </div>


            <button
              type="submit"
              className="forgot-password-button"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="forgot-password-loader"></span>
                  Checking...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Reset Link
                </>
              )}

            </button>

          </form>


          {/* =========================================
              BACK TO LOGIN
          ========================================= */}

          <Link
            to="/admin/login"
            className="forgot-password-back"
          >
            <ArrowLeft size={17} />
            Back to Login
          </Link>


          {/* =========================================
              FOOTER
          ========================================= */}

          <div className="forgot-password-footer">
            © {new Date().getFullYear()} Khel Aur
            Shiksha Foundation
          </div>

        </div>

      </section>

    </main>
  );
}

export default ForgotPassword;