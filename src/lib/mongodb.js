import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(async (mongooseInstance) => {
      // Seed super admin if not exists
      try {
        // We import dynamically to avoid circular dependencies during initialization
        const UserModule = await import('../models/User.js');
        const User = UserModule.default;
        
        const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || 'superadmin@raktseva.org';
        const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD || 'SuperAdminSecurePass123!';
        
        const superAdminExists = await User.findOne({ role: 'super_admin' });
        if (!superAdminExists) {
          const hashedPassword = await bcrypt.hash(superAdminPassword, 10);
          await User.create({
            name: 'Super Admin',
            email: superAdminEmail,
            password: hashedPassword,
            phone: '0000000000',
            role: 'super_admin'
          });
          console.log('Seeded initial super_admin account successfully');
        }

        // Initialize blood stock collection with all blood groups if it's empty
        const BloodStockModule = await import('../models/BloodStock.js');
        const BloodStock = BloodStockModule.default;
        const stockCount = await BloodStock.countDocuments();
        if (stockCount === 0) {
          const bloodGroups = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
          await BloodStock.insertMany(
            bloodGroups.map(bg => ({ blood_group: bg, units_available: 0 }))
          );
          console.log('Seeded initial empty BloodStock collection');
        }
      } catch (err) {
        console.error('Error seeding DB initialization:', err);
      }
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
