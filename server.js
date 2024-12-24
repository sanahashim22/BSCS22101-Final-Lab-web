import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 5000;

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error("Error: JWT_SECRET is not set in the .env file.");
    process.exit(1);
  }

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/task', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', UserSchema);
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        //JWT Token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token, user: { name: user.name, email: user.email } });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


const AdminPropertySchema = new mongoose.Schema({
  name: String,
  date: String,
  description: String,
});

const AdminProperty = mongoose.model('AdminProperty', AdminPropertySchema);

// http://localhost:5000/api/admin/listings
app.get('/api/admin/listings', async (req, res) => {
  try {
      const adminProperties = await AdminProperty.find();
      res.status(200).json(adminProperties);
  } catch (err) {
      console.error('Error fetching admin listings:', err);
      res.status(500).json({ message: 'Failed to fetch admin listings' });
  }
});
//http://localhost:5000/api/admin/listings
app.post('/api/admin/listings', async (req, res) => {
  try {
      const { name,date, description } = req.body;
      const newAdminProperty = new AdminProperty({ name,date, description });
      await newAdminProperty.save();
      const adminProperties = await AdminProperty.find();
      res.status(201).json(adminProperties);  
  } catch (err) {
      console.error('Error adding admin listing:', err);
      res.status(500).json({ message: 'Failed to add admin listing' });
  }
});

app.delete('/api/admin/listings/:id', async (req, res) => {
  try {
      const adminProperty = await AdminProperty.findByIdAndDelete(req.params.id);
      if (!adminProperty) {
          return res.status(404).json({ message: 'Admin listing not found' });
      }
      res.status(200).json({ message: 'Admin listing deleted successfully' });
  } catch (err) {
      console.error('Error deleting admin listing:', err);
      res.status(500).json({ message: 'Failed to delete admin listing' });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
