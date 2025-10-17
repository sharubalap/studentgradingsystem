const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function seedUsers() {
  try {
    await mongoose.connect('mongodb://localhost:27017/student-grading', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: 'admin1' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit();
    }

    // Sample admin
    const admin = { username: 'admin1', password: 'pass123', role: 'admin' };

    const hashedAdminPassword = await bcrypt.hash(admin.password, 10);
    const adminUser = new User({
      username: admin.username,
      password: hashedAdminPassword,
      role: admin.role,
    });
    await adminUser.save();
    console.log(`Created admin: ${admin.username}`);

    console.log('Sample admin created successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
}

seedUsers();
