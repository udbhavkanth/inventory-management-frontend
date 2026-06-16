import StatCard from '../components/dashboard/StatCard';

const PLACEHOLDER_STATS = [
  { title: 'Total Products', value: 120 },
  { title: 'Total Customers', value: 45 },
  { title: 'Total Orders', value: 350 },
  { title: 'Low Stock Products', value: 8 },
];

function Dashboard() {
  return (
    <section className="page">
      <h2 className="page__title">Dashboard Page</h2>

      <div className="stat-grid">
        {PLACEHOLDER_STATS.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>
    </section>
  );
}

export default Dashboard;
