import { useParams } from "react-router-dom";
import { useState } from "react";
import "./CompanyDetail.css";

// Mock data for companies (replace with actual data or fetch from backend)
const companyData = {
  1: {
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
    description: "Hiring for various engineering roles across multiple teams including AI, Cloud, and Search.",
    jobs: [
      { title: "Frontend Developer", location: "Remote", deadline: "June 15" },
      { title: "Software Engineer", location: "Bangalore", deadline: "June 20" },
    ],
  },
  2: {
    name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    description: "Looking for freshers and experienced professionals in tech & logistics domains.",
    jobs: [
      { title: "Data Analyst", location: "Hyderabad", deadline: "June 18" },
      { title: "Operations Manager", location: "Mumbai", deadline: "June 25" },
    ],
  },
  3: {
    name: "Facebook",
    logo: "https://logo.clearbit.com/facebook.com",
    description: "Join our social impact engineering teams to build innovative products.",
    jobs: [
      { title: "Backend Developer", location: "Remote", deadline: "June 30" },
      { title: "UI/UX Designer", location: "Delhi", deadline: "July 5" },
    ],
  },
  4: {
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    description: "Innovate with us in cloud computing, AI, and software development.",
    jobs: [
      { title: "Cloud Engineer", location: "Hyderabad", deadline: "June 22" },
      { title: "AI Researcher", location: "Bangalore", deadline: "July 1" },
    ],
  },
  5: {
    name: "Apple",
    logo: "https://logo.clearbit.com/apple.com",
    description: "Work on cutting-edge hardware and software products shaping the future.",
    jobs: [
      { title: "iOS Developer", location: "Bangalore", deadline: "June 28" },
      { title: "Hardware Engineer", location: "Hyderabad", deadline: "July 4" },
    ],
  },
  6: {
    name: "Netflix",
    logo: "https://logo.clearbit.com/netflix.com",
    description: "Be part of the streaming revolution and help create amazing user experiences.",
    jobs: [
      { title: "Content Analyst", location: "Remote", deadline: "June 24" },
      { title: "DevOps Engineer", location: "Mumbai", deadline: "July 6" },
    ],
  },
  7: {
    name: "Tesla",
    logo: "https://logo.clearbit.com/tesla.com",
    description: "Drive the future of sustainable energy and automotive innovation.",
    jobs: [
      { title: "Mechanical Engineer", location: "Pune", deadline: "June 27" },
      { title: "Embedded Systems Engineer", location: "Remote", deadline: "July 3" },
    ],
  },
  8: {
    name: "Airbnb",
    logo: "https://logo.clearbit.com/airbnb.com",
    description: "Shape the way the world travels by building trusted experiences.",
    jobs: [
      { title: "Product Manager", location: "Remote", deadline: "June 29" },
      { title: "QA Engineer", location: "Bangalore", deadline: "July 8" },
    ],
  },
  9: {
    name: "Uber",
    logo: "https://logo.clearbit.com/uber.com",
    description: "Reimagine mobility and logistics through technology and innovation.",
    jobs: [
      { title: "Android Developer", location: "Hyderabad", deadline: "July 2" },
      { title: "Data Scientist", location: "Delhi", deadline: "July 10" },
    ],
  },
  10: {
    name: "Spotify",
    logo: "https://logo.clearbit.com/spotify.com",
    description: "Join our music tech teams to create personalized experiences worldwide.",
    jobs: [
      { title: "Full Stack Developer", location: "Remote", deadline: "July 5" },
      { title: "Audio Engineer", location: "Mumbai", deadline: "July 12" },
    ],
  },
  11: {
    name: "Salesforce",
    logo: "https://logo.clearbit.com/salesforce.com",
    description: "Transform businesses with innovative CRM and cloud solutions.",
    jobs: [
      { title: "CRM Consultant", location: "Remote", deadline: "July 7" },
      { title: "Sales Engineer", location: "Bangalore", deadline: "July 14" },
    ],
  },
  12: {
    name: "Adobe",
    logo: "https://logo.clearbit.com/adobe.com",
    description: "Empower creativity worldwide with industry-leading software.",
    jobs: [
      { title: "Frontend Engineer", location: "Delhi", deadline: "July 9" },
      { title: "Product Designer", location: "Remote", deadline: "July 16" },
    ],
  },
};

export default function CompanyDetail() {
  const { id } = useParams();
  const company = companyData[id];
  const [form, setForm] = useState({ name: "", email: "", resume: null });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.resume) {
      setError("Please fill in all fields and upload your resume.");
      return;
    }

    // Prepare FormData to send the request with the resume file
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("companyId", id);
    formData.append("resume", form.resume);

    try {
      // Send the form data to the server using fetch
      const response = await fetch("http://localhost:5000/api/apply", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setError("");
        setForm({ name: "", email: "", resume: null }); // Reset form
      } else {
        setError(data.message || "There was an error submitting the application.");
      }
    } catch (error) {
      setError("Server error. Please try again.");
      console.error("Application submission error:", error);
    }
  };

  if (!company)
    return (
      <div className="company-detail-container p-8">
        <p className="not-found">Company not found.</p>
      </div>
    );

  return (
    <div className="company-detail-container">
      <div className="company-detail-box">
        <header className="company-header">
          <img
            src={company.logo}
            alt={company.name}
            className="company-logo"
          />
          <h1 className="company-title">{company.name}</h1>
        </header>

        <p className="company-description">{company.description}</p>

        <section className="job-openings">
          <h2>Open Positions</h2>
          <ul>
            {company.jobs.map((job, idx) => (
              <li key={idx} className="job-list-item">
                <span className="job-title">{job.title}</span>
                <span className="job-location">{job.location}</span>
                <span className="job-deadline">Apply by {job.deadline}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="application-form-section">
          <h2>Apply Now</h2>

          {/* Error message */}
          {error && <div className="error-message">{error}</div>}

          {/* Success message */}
          {success && <div className="success-message">Application submitted successfully!</div>}

          <form onSubmit={handleSubmit} className="application-form">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <label htmlFor="resume">Upload Resume</label>
            <input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setForm({ ...form, resume: e.target.files[0] })}
              required
            />

            <button type="submit" className="submit-btn">
              Submit Application
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
