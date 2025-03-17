// homepage.js
import "./homepage.css";
import logo from "../../assets/Logo.png";

function Homepage() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="loginsignuppage">
      {/* Header with Logo and Slogan */}
      <div className="logo-container">
        <img src={logo} alt="FitFuel Logo" className="logo2" />
        <p className="slogan2">Where Strength Meets Nutrition</p>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to FitFuel</h1>
        <p>Your personalized fitness and nutrition companion.</p>
        <div className="cta-buttons">
          <a href="/userlogin" className="cta-button">
            Login
          </a>
          <a href="/usersignup" className="cta-button">
            Sign Up
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Why Choose FitFuel?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Calorie Tracking</h3>
            <p>Track your daily calorie intake with precision.</p>
          </div>
          <div className="feature-card">
            <h3>Exercise Library</h3>
            <p>Access a diverse library of exercises tailored to your goals.</p>
          </div>
          <div className="feature-card">
            <h3>Progress Tracking</h3>
            <p>Monitor your progress and stay motivated.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>&copy; {currentYear} FitFuel. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Homepage;
