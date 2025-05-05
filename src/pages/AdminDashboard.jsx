import { useState, useEffect } from 'react';
import './Admin.css';

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  
  // Fetch applications data
  useEffect(() => {
    // Make an API call to get the applications
    fetch('http://localhost:5000/api/admin/applications')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setApplications(data.applications);
        } else {
          console.error("Error fetching applications:", data.message);
        }
      });
  }, []);
  
  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Graduation</th>
              <th className="border px-4 py-2">Company</th> {/* Display company name */}
              <th className="border px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id}>
                <td className="border px-4 py-2">{application.userId.name}</td> {/* Name from User model */}
                <td className="border px-4 py-2">{application.userId.email}</td> {/* Email from User model */}
                <td className="border px-4 py-2">{application.userId.phone}</td> {/* Phone from User model */}
                <td className="border px-4 py-2">{application.userId.graduation}</td> {/* Graduation from User model */}
                <td className="border px-4 py-2">{application.company}</td> {/* Company name */}
                <td className="border px-4 py-2">{new Date(application.date).toLocaleDateString()}</td> {/* Date */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
