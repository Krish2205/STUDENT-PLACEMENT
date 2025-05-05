import { useEffect, useState } from "react";
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    // Get the user data from localStorage
    const storedUser = localStorage.getItem("user");

    // Only parse if storedUser is not null or undefined
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // Load skills if saved previously for this user
        const savedSkills = JSON.parse(localStorage.getItem(`skills_${parsedUser.email}`)) || [];
        setSkills(savedSkills);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);

      // Save the updated skills to localStorage
      if (user) {
        localStorage.setItem(`skills_${user.email}`, JSON.stringify(updatedSkills));
      }
      setNewSkill("");
    }
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <header className="profile-header">
          {/* Dynamically load the user's profile details */}
          <img src="https://via.placeholder.com/100" alt="Profile" className="profile-pic" />
          <div className="profile-info">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-email">{user.email}</p>
            <p className="profile-phone">{user.phone}</p>
            <p className="profile-graduation">{user.graduation}</p>
          </div>
        </header>

        <section className="profile-skills">
          <h3 className="skills-title">Skills</h3>
          <div className="skills-list">
            {/* Display the list of skills */}
            {skills.map((skill, i) => (
              <span key={i} className="skill-item">{skill}</span>
            ))}
          </div>
          <div className="add-skill-section">
            <input
              type="text"
              className="add-skill-input"
              placeholder="Add a skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button onClick={handleAddSkill} className="add-skill-button">
              Add
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
