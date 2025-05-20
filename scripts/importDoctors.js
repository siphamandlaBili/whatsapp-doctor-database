const mongoose = require('mongoose');
const xlsx = require('xlsx');
const Doctor = require('../models/Doctor');
require('dotenv').config();

async function importDoctors() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    // Read Excel file
    const workbook = xlsx.readFile("./Extracted_Doctor_Info.xlsx");
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // Transform data
    const doctors = data.map(row => ({
      practice_name: row.practice_name || 'practice name missing',
      first_name: row.first_name?.toString() || 'misiing first name number',
      surname: row.surname?.toString() || 'missing surname',
      mp_number: row.mp_number?.toString() || 'mp_number missing',
      practice_number: row.practice_number?.toString() || 'misiing practice number',
      phone_number: row.phone_number?.toString() || '0837721866',
      whatsapp_number: row.whatsapp_number?.toString() || 'whatsapp numebr missing',
      email: row.email?.toString().toLowerCase() || 'dummy@gmail.com',
      specialty: row.specialty?.toString() || 'speciality missing',
      latitude: parseFloat(row.latitude) || 0,
      longitude: parseFloat(row.longitude) || 0,
      booking_link: row.booking_link?.toString() || '',
      isActive: true
    }));

    // Clear existing data
    await Doctor.deleteMany({});
    console.log('Cleared existing doctors');

    // Insert new data
    await Doctor.insertMany(doctors);
    console.log(`Successfully imported ${doctors.length} doctors`);

    process.exit(0);
  } catch (error) {
    console.error('Import error:', error);
    process.exit(1);
  }
}

importDoctors();