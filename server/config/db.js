const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true}).then(() => {
    console.log('Connected to MongoDB');}).catch((e) => {
        console.error('MongoDB connection error:', e);
    });
