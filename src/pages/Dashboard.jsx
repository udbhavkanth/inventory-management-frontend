import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import StatCard from '../components/dashboard/StatCard';
import { useDashboard } from '../hooks/useDashboard';
import { formatCurrency } from '../utils/format';

function Dashboard() {
  const { stats, loading, error, refreshStats } = useDashboard();

  return (
    <section className="page">
      <h2 className="page__title">Dashboard Page</h2>

      {loading && <Loader message="Loading dashboard..." />}
      {error && <ErrorMessage message={error} onRetry={refreshStats} />}

      {stats && !loading && (
        <div className="stat-grid">
          <StatCard title="Total Products" value={stats.total_products} />
          <StatCard title="Total Customers" value={stats.total_customers} />
          <StatCard title="Total Orders" value={stats.total_orders} />
          <StatCard title="Low Stock Products" value={stats.low_stock_products} />
          <StatCard
            title="Total Inventory Value"
            value={formatCurrency(stats.total_inventory_value)}
          />
        </div>
      )}
    </section>
  );
}

export default Dashboard;
