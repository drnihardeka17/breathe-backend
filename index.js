const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
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

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// Connect to MongoDB
const mongoUrl = "mongodb+srv://nageshjha654:breathe2024@cluster0.6nwhcbz.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
  console.log("Database connected successfully");
})
.catch((error) => {
  console.error("Error connecting to database:", error);
});
//******************************************************************************************************************************************/
//Routes
app.get("/", (req, res) => {
    res.send("Hello from test App web backend 1");
});
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/appointment',appointmentRoutes);
app.use('/api/testimonial',testimonialRoutes);
app.use('/api/news',newsRoutes);
app.use('/api/gallery',galleryRoutes);
app.use('/api/blogs',blogsRoutes);
app.use('/api/blogscategory',blogscategoryRoutes);
app.use('/api/web',webcontentRoutes);
app.use('/api/samplecollection',sampleRoutes);
//*****************************************************************************************************************************************/
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
