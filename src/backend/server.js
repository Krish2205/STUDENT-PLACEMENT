const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure Multer for file uploads (resume upload)
const upload = multer({
  dest: 'uploads/', // save uploaded files to 'uploads' directory
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
      return cb(new Error('Please upload a PDF or DOC file'));
    }
    cb(null, true);
  },
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student_placement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  graduation: String
});

const User = mongoose.model('User', userSchema);

// Define Application Schema and Model
const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true }, // This will store the company name as a string
  date: { type: Date, default: Date.now },
  resumePath: { type: String },
});

const Application = mongoose.model('Application', applicationSchema);


// ---------------------- ROUTES ----------------------

// Register new user
app.post('/api/register', async (req, res) => {
  const { name, email, phone, password, graduation } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already registered" });
    }

    const newUser = new User({ name, email, phone, password, graduation });
    await newUser.save();

    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Login user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Hardcoded admin credentials
  if (email === "krish@gmail.com" && password === "2205") {
    return res.json({ success: true, isAdmin: true, message: "Admin login successful" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.password !== password) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    res.json({ success: true, isAdmin: false, message: "User login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Apply for a job
app.post('/api/apply', upload.single('resume'), async (req, res) => {
  const { name, email, companyId } = req.body;
  const resumePath = req.file ? req.file.path : null;

  if (!name || !email || !companyId || !resumePath) {
    return res.status(400).json({ success: false, message: "Please fill in all fields and upload your resume." });
  }

  try {
    // Assuming you have a 'Company' model, fetch company data
    // If you're just using a string (company name), you can skip this part
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(400).json({ success: false, message: "Invalid company." });
    }

    const newApplication = new Application({
      userId: user._id, // Assuming user is logged in and you have their ID
      company: company.name,
      resumePath: resumePath,
    });

    await newApplication.save();

    res.json({
      success: true,
      message: "Application submitted successfully.",
      application: { name, email, company: company.name, resumePath },
    });
  } catch (error) {
    console.error("Error applying:", error);
    res.status(500).json({ success: false, message: "Error applying" });
  }
});

// Admin route to get all applications
app.get('/api/admin/applications', async (req, res) => {
  try {
    const applications = await Application.find().populate('userId', 'name email phone graduation');
    res.json({ success: true, applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ----------------------------------------------------

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
