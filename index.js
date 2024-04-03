const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const fileUpload = require('express-fileupload');

const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/adminRoutes');
const doctorRoutes = require('./routes/doctors');
const departmentRoutes = require('./routes/departmentRoutes');
const contactRoutes = require('./routes/contactRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const blogsRoutes = require('./routes/blogRoutes');
const blogscategoryRoutes = require('./routes/blogcategoryRoutes');
const webcontentRoutes = require('./routes/webcontentRoutes');
const sampleRoutes = require('./routes/sampleCollectionRoutes');
const newsRoutes = require('./routes/newsRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const careerRoutes = require('./routes/careerRoutes');
const packagesRoutes = require('./routes/packagesRoutes');
const VideoRoutes= require('./routes/videoRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGODB_URI;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));

// Connect to MongoDB
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
  console.log("Database connected successfully");
})
.catch((error) => {
  console.error("Error connecting to database:", error);
});

// Create a new MongoStore instance using connect-mongo
const MongoStoreInstance = MongoStore.create({
  mongoUrl: mongoUrl,
  collectionName: 'sessions', // Specify the name of the collection for sessions
  mongooseConnection: mongoose.connection,
});

// Express session middleware
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStoreInstance
}));

// Routes
app.get("/", (req, res) => {
    res.send("Hello from test App web backend 1");
});
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/testimonial', testimonialRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/blogscategory', blogscategoryRoutes);
app.use('/api/web', webcontentRoutes);
app.use('/api/samplecollection', sampleRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/apply', applicationRoutes);
app.use('/api/packages',packagesRoutes);
app.use('/api/videos',VideoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
