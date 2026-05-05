import "./index.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/customer/dashboard/Sidebar';
import Header from './components/customer/dashboard/Header';
import Dashboard from './pages/customer/Dashboard';
import Feedback from './pages/customer/Feedback';
import Reports from "./pages/customer/Reports";
import BookAndService from "./pages/customer/BookAndService";
import Profile from "./pages/customer/Profile";
import Invoice from "./pages/customer/Invoice";
import MyVehicles from "./pages/customer/Myvehicles";
import MyJobs from "./pages/customer/MyJobs";

const Placeholder = ({ title }) => (
  <div style={{ padding: 40, textAlign: 'center', color: '#64748B', fontSize: 18 }}>
    🚧 <strong>{title}</strong> — Coming Soon
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
     <div style={{ display: 'flex', minHeight: '100vh' }}>
  <Sidebar />
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 240 }}>
          <Header />
          <main style={{ flex: 1, backgroundColor: '#EFF6FF', overflowY: 'auto' }}>
            <Routes>
              <Route path="/"         element={<Dashboard />} />
              <Route path="/feedback" element={<Feedback/>}/>
              <Route path="/reports" element={<Reports/>} />
              <Route path="/bookservice" element={<BookAndService />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/invoice" element={<Invoice/>}/>
              <Route path="/myvehicle" element={<MyVehicles/>}/>
              <Route path="/myjobs" element={<MyJobs/>}/>
              
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}