const jobsData = [

  {
    id: 1,
    title: "General Service",
    status: "Booked",
    date: "2026-01-28",
    location: "Hyderabad Auto Care",
    vehicle: "Hyundai i20",
    carNumber: "TS09AB1234",
    customer: "Ganesh Kumar",
    mechanic: "Ramesh",
    amount: 2500,

    services: [
      { name: "Engine Oil Change", price: 1200 },
      { name: "Air Filter Cleaning", price: 500 },
      { name: "Brake Inspection", price: 800 }
    ]
  },

  {
    id: 2,
    title: "Oil Change",
    status: "In Progress",
    date: "2026-02-01",
    location: "Chennai Car Hub",
    vehicle: "Honda City",
    carNumber: "TN10AA2222",
    customer: "Ganesh Kumar",
    mechanic: "Suresh",
    amount: 1200,

    services: [
      { name: "Oil Replacement", price: 900 },
      { name: "Filter Change", price: 300 }
    ]
  },

  {
    id: 3,
    title: "Brake Inspection",
    status: "Completed",
    date: "2026-02-04",
    location: "Bangalore Service Point",
    vehicle: "Maruti Swift",
    carNumber: "KA05XY5555",
    customer: "Ganesh Kumar",
    mechanic: "Mahesh",
    amount: 2000,

    services: [
      { name: "Brake Pads Check", price: 1000 },
      { name: "Brake Fluid Change", price: 1000 }
    ]
  },

  {
    id: 4,
    title: "Full Service",
    status: "Booked",
    date: "2026-03-10",
    location: "Mumbai Auto Garage",
    vehicle: "Tata Nexon",
    carNumber: "MH12CD7890",
    customer: "Ganesh Kumar",
    mechanic: "Ravi",
    amount: 4600,

    services: [
      { name: "Full Body Inspection", price: 2000 },
      { name: "Oil Change", price: 1200 },
      { name: "Wheel Alignment", price: 800 },
      { name: "Interior Cleaning", price: 600 }
    ]
  }

];

export default jobsData;