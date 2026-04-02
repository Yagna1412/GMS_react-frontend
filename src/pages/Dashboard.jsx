import { user, serviceHistory, spendingHistory, serviceBreakdown, notifications } from '../components/Dashboard_components/data/mockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CalendarCheck, Clock, CheckCircle2, CreditCard, CalendarDays, Receipt, Activity, HeadphonesIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  "In Progress": { background: "#DBEAFE", color: "#2563EB" },
  "Completed":   { background: "#D1FAE5", color: "#10B981" },
  "Booked":      { background: "#FEF3C7", color: "#D97706" },
};

function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #BFDBFE',
        borderRadius: 16,
        padding: 24,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 28px rgba(37,99,235,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {children}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 24, maxWidth: '1400px', margin: '0 auto' }}>

      {/* ── Welcome Banner ── */}
      <div style={{
        background: 'linear-gradient(135deg,#2563EB,#06B6D4)',
        borderRadius: 20, padding: '36px 40px', color: '#fff',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        minHeight: 160,
      }}>
        <div>
          <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.5px' }}>
            Welcome back, {user.name.split(' ')[0]}!
          </h2>
          <p style={{ marginTop: 8, opacity: .9, fontSize: 15 }}>
            You have <b>{user.upcomingAppointments} upcoming appointment(s)</b> and <b>{user.activeJobs} active job(s)</b>.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 22 }}>
            <button
              onClick={() => navigate('/bookservice')}
              style={{ background: '#fff', color: '#2563EB', border: 'none', padding: '10px 22px', borderRadius: 9, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
            >
              Book Service
            </button>
            <button
              onClick={() => navigate('/Myjobs')}
              style={{ background: 'transparent', color: '#fff', border: '2px solid #fff', padding: '10px 22px', borderRadius: 9, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
            >
              Track Status
            </button>
          </div>
        </div>

        {/* Vehicle Card */}
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 16, padding: '20px 28px',
          minWidth: 200, textAlign: 'center',
        }}>
          <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>My Vehicle</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>{user.vehicle.model}</div>
          <div style={{
            display: 'inline-block', marginTop: 8,
            background: 'rgba(0,0,0,0.2)', borderRadius: 6,
            padding: '3px 12px', fontSize: 13, letterSpacing: 2, fontWeight: 600,
          }}>
            {user.vehicle.plate}
          </div>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        {[
          { label: 'Upcoming',       value: user.upcomingAppointments, icon: CalendarCheck, color: '#3B82F6', bg: '#EFF6FF' },
          { label: 'Active Jobs',    value: user.activeJobs,           icon: Clock,         color: '#F59E0B', bg: '#FFFBEB' },
          { label: 'Loyalty Points', value: user.loyaltyPoints,        icon: CheckCircle2,  color: '#10B981', bg: '#ECFDF5' },
          { label: 'Total Spent',    value: `$${user.totalSpent}`,     icon: CreditCard,    color: '#8B5CF6', bg: '#F5F3FF' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} style={{ padding: '22px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ background: bg, borderRadius: 12, padding: 12, flexShrink: 0 }}>
                <Icon size={26} color={color} />
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>{label}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#1E3A8A', marginTop: 2 }}>{value}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>

        {/* Spending Chart */}
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E3A8A', marginBottom: 16 }}>📈 Spending History</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={spendingHistory} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 5, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Service Breakdown */}
        <Card style={{ padding: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E3A8A', marginBottom: 16 }}>Service Type Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={serviceBreakdown} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {serviceBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 10 }}>
            {serviceBreakdown.map(s => (
              <span key={s.name} style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ background: s.color, borderRadius: '50%', display: 'inline-block', width: 9, height: 9 }} />
                {s.name}
              </span>
            ))}
          </div>
        </Card>

        {/* Notifications */}
        <Card style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E3A8A' }}>Notifications</h3>
            <span style={{ fontSize: 12, color: '#3B82F6', cursor: 'pointer', fontWeight: 600 }}>Mark all read</span>
          </div>
          {notifications.map(n => (
            <div key={n.id} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid #EFF6FF', alignItems: 'flex-start' }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: n.read ? '#CBD5E1' : '#EF4444', marginTop: 4, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13.5, color: '#1E3A8A', fontWeight: 500 }}>{n.text}</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{n.time}</div>
              </div>
            </div>
          ))}
          <div style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: '#3B82F6', cursor: 'pointer', fontWeight: 600 }}>
            View All Notifications
          </div>
        </Card>
      </div>

      {/* ── Recent Service History + Quick Actions ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>

        {/* Service History Table */}
        <Card style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18, alignItems: 'center' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E3A8A' }}>Recent Service History</h3>
            <span
              onClick={() => navigate('/reports')}
              style={{ color: '#3B82F6', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}
            >
              View All
            </span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
            <thead>
              <tr style={{ color: '#64748B', textAlign: 'left' }}>
                {['DATE', 'SERVICE', 'BRANCH', 'AMOUNT', 'STATUS'].map(h => (
                  <th key={h} style={{ padding: '8px 10px', fontWeight: 700, fontSize: 11.5, borderBottom: '1px solid #EFF6FF', letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {serviceHistory.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F8FAFF' }}>
                  <td style={{ padding: '13px 10px', color: '#1E3A8A', fontWeight: 600 }}>{row.date}</td>
                  <td style={{ padding: '13px 10px', color: '#334155' }}>{row.service}</td>
                  <td style={{ padding: '13px 10px', color: '#64748B' }}>{row.branch}</td>
                  <td style={{ padding: '13px 10px', fontWeight: 700, color: '#1E3A8A' }}>${row.amount}</td>
                  <td style={{ padding: '13px 10px' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                      ...statusColors[row.status]
                    }}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Quick Actions + Promo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card style={{ padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E3A8A', marginBottom: 16 }}>Quick Actions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'Book Now',    icon: CalendarDays,   color: '#3B82F6', bg: '#EFF6FF', path: '/bookservice'     },
                { label: 'Pay Invoice', icon: Receipt,        color: '#10B981', bg: '#ECFDF5', path: '/invoice' },
                { label: 'Job Status',  icon: Activity,       color: '#8B5CF6', bg: '#F5F3FF', path: '/Myjobs'     },
                { label: 'Support',     icon: HeadphonesIcon, color: '#F59E0B', bg: '#FFFBEB', path: '/feedback' },
              ].map(({ label, icon: Icon, color, bg, path }) => (
                <button
                  key={label}
                  onClick={() => navigate(path)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    padding: '18px 8px', border: '1.5px solid #BFDBFE', borderRadius: 12,
                    background: '#FAFCFF', cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(37,99,235,0.15)';
                    e.currentTarget.style.background = bg;
                    e.currentTarget.style.borderColor = color;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = '#FAFCFF';
                    e.currentTarget.style.borderColor = '#BFDBFE';
                  }}
                >
                  <div style={{ background: bg, borderRadius: 10, padding: 10 }}>
                    <Icon size={22} color={color} />
                  </div>
                  <span style={{ fontSize: 12.5, color: '#1E3A8A', fontWeight: 600 }}>{label}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Promo Banner */}
          <div style={{
            background: 'linear-gradient(135deg,#7C3AED,#4F46E5)',
            borderRadius: 16, padding: '22px 24px', color: '#fff',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'pointer',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 28px rgba(124,58,237,0.35)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, background: 'rgba(255,255,255,.2)', display: 'inline-block', padding: '3px 10px', borderRadius: 5, marginBottom: 10, letterSpacing: 1 }}>PROMO</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>Get 20% Off</div>
            <div style={{ fontSize: 13, opacity: .85, marginTop: 5 }}>On your next Full Service checkup.</div>
            <button style={{ marginTop: 14, background: 'none', border: '1.5px solid rgba(255,255,255,0.5)', color: '#FCD34D', fontWeight: 700, cursor: 'pointer', padding: '7px 16px', borderRadius: 8, fontFamily: 'inherit', fontSize: 13 }}>
              Claim Offer →
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}