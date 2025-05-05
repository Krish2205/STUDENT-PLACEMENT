import { useNavigate } from "react-router-dom";
import './Home.css';

const companies = [
  { id: 1, name: "Google", logo: "https://logo.clearbit.com/google.com" },
  { id: 2, name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
  { id: 3, name: "Facebook", logo: "https://logo.clearbit.com/facebook.com" },
  { id: 4, name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
  { id: 5, name: "Apple", logo: "https://logo.clearbit.com/apple.com" },
  { id: 6, name: "Netflix", logo: "https://logo.clearbit.com/netflix.com" },
  { id: 7, name: "Tesla", logo: "https://logo.clearbit.com/tesla.com" },
  { id: 8, name: "Airbnb", logo: "https://logo.clearbit.com/airbnb.com" },
  { id: 9, name: "Uber", logo: "https://logo.clearbit.com/uber.com" },
  { id: 10, name: "Spotify", logo: "https://logo.clearbit.com/spotify.com" },
  { id: 11, name: "Salesforce", logo: "https://logo.clearbit.com/salesforce.com" },
  { id: 12, name: "Adobe", logo: "https://logo.clearbit.com/adobe.com" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container p-8 bg-gray-100 min-h-screen">
      <h2 className="home-heading">Companies Currently Hiring</h2>
    

      <div className="home-grid">
        {companies.map((company) => (
          <div key={company.id} className="company-card bg-white p-6 rounded-xl shadow text-center flex flex-col items-center">
            <img
              src={company.logo}
              alt={company.name}
              className="company-logo h-20 w-20 object-contain mb-4 rounded-full bg-gray-50 border border-gray-200"
            />
            <h3 className="company-name font-semibold text-lg mb-2">{company.name}</h3>
            <button
              onClick={() => navigate(`/company/${company.id}`)}
              className="view-details-btn mt-auto bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      <h2 className="news-heading text-3xl font-bold mb-4">Job News</h2>
      <ul className="news-list list-disc ml-8 space-y-3">
        <li>Google opens new batch for software internships.</li>
        <li>Amazon hiring backend engineers in Hyderabad.</li>
      </ul>
    </div>
  );
}
