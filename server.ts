import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Data
  let dentists = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      qualification: "DDS, Orthodontist",
      experience: "12",
      clinicName: "Smile Bright Clinic",
      address: "123 Dental Way, Suite 100",
      location: "Downtown",
      image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviewsCount: 156,
      specialization: "Orthodontist",
      consultationFee: "₹800",
      availability: "Available Today"
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      qualification: "DMD, Periodontist",
      experience: "8",
      clinicName: "Elite Dental Care",
      address: "456 Health St",
      location: "Northside",
      image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviewsCount: 92,
      specialization: "Periodontist",
      consultationFee: "₹600",
      availability: "Available Tomorrow"
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      qualification: "DDS, General Dentist",
      experience: "15",
      clinicName: "Family First Dental",
      address: "789 Care Blvd",
      location: "West End",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviewsCount: 210,
      specialization: "General Dentist",
      consultationFee: "₹500",
      availability: "Available Today"
    },
    {
      id: "4",
      name: "Dr. Rahul Sharma",
      qualification: "DDS, Oral Surgeon",
      experience: "10",
      clinicName: "Advanced Oral Surgery",
      address: "321 Surgery Lane",
      location: "Southside",
      image: "https://images.pexels.com/photos/3845806/pexels-photo-3845806.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      reviewsCount: 78,
      specialization: "Oral Surgeon",
      consultationFee: "₹1200",
      availability: "Available Today"
    },
    {
      id: "5",
      name: "Dr. Anjali Gupta",
      qualification: "DDS, General Dentist",
      experience: "5",
      clinicName: "City Dental",
      address: "101 Main St",
      location: "Downtown",
      image: "https://images.pexels.com/photos/3762443/pexels-photo-3762443.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5,
      reviewsCount: 45,
      specialization: "General Dentist",
      consultationFee: "₹400",
      availability: "Available Today"
    }
  ];

  let appointments = [
    {
      id: "1",
      patientName: "John Doe",
      age: 30,
      gender: "Male",
      appointmentDate: "2026-03-20",
      dentistId: "1",
      dentistName: "Dr. Sarah Johnson",
      clinicName: "Smile Bright Clinic",
      status: "Booked"
    }
  ];

  // API Routes
  
  // --- Dentist APIs ---
  
  // GET all dentists
  app.get("/api/dentists", (req, res) => {
    console.log("GET /api/dentists called");
    res.json(dentists);
  });

  // GET single dentist by ID
  app.get("/api/dentists/:id", (req, res) => {
    console.log(`GET /api/dentists/${req.params.id} called`);
    const dentist = dentists.find(d => d.id === req.params.id);
    if (dentist) {
      res.json(dentist);
    } else {
      res.status(404).json({ message: "Dentist not found" });
    }
  });

  // POST - Add new dentist
  app.post("/api/dentists", (req, res) => {
    const { name, specialization, qualification, experience, clinicName, location, address, image } = req.body;
    
    if (!name || !specialization) {
      return res.status(400).json({ message: "Name and specialization are required" });
    }

    const newDentist = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      specialization,
      qualification: qualification || "N/A",
      experience: experience || "0 years",
      clinicName: clinicName || "General Clinic",
      location: location || "Unknown",
      address: address || "N/A",
      image: image || "",
      rating: 5.0,
      reviewsCount: 0,
      consultationFee: "₹500",
      availability: "Available Today"
    };

    dentists.push(newDentist);
    res.status(201).json(newDentist);
  });

  // --- Appointment APIs ---

  // GET all appointments
  app.get("/api/appointments", (req, res) => {
    console.log("GET /api/appointments called");
    res.json(appointments);
  });

  // POST - Create appointment
  app.post("/api/appointments", (req, res) => {
    const { patientName, age, gender, appointmentDate, date, dentistId, dentistName, clinicName } = req.body;
    
    // Support both 'appointmentDate' (frontend) and 'date' (REST example)
    const finalDate = appointmentDate || date;

    if (!patientName || !age || !gender || !finalDate) {
      return res.status(400).json({ message: "Patient Name, Age, Gender, and Date are required" });
    }

    let dName = dentistName;
    let cName = clinicName;

    // If dentistId is provided, look up details
    if (dentistId) {
      const dentist = dentists.find(d => d.id === dentistId);
      if (dentist) {
        dName = dentist.name;
        cName = dentist.clinicName;
      }
    }

    const newAppointment = {
      id: Math.random().toString(36).substr(2, 9),
      patientName,
      age,
      gender,
      appointmentDate: finalDate,
      dentistId: dentistId || "manual",
      dentistName: dName || "Not Specified",
      clinicName: cName || "Not Specified",
      status: "Booked"
    };

    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
  });

  // PATCH/PUT - Update appointment status
  const updateStatus = (req, res) => {
    const { status } = req.body;
    const index = appointments.findIndex(a => a.id === req.params.id);
    
    if (index !== -1) {
      appointments[index].status = status;
      res.json(appointments[index]);
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  };

  app.patch("/api/appointments/:id", updateStatus);
  app.put("/api/appointments/:id", updateStatus);

  // DELETE - Remove appointment
  app.delete("/api/appointments/:id", (req, res) => {
    const index = appointments.findIndex(a => a.id === req.params.id);
    if (index !== -1) {
      appointments.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
