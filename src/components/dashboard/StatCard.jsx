function StatCard({ title, value, subtitle }) {
  return (
    <article className="stat-card">
      <h3 className="stat-card__title">{title}</h3>
      <p className="stat-card__value">{value}</p>
      {subtitle && <p className="stat-card__subtitle">{subtitle}</p>}
    </article>
  );
}

export default StatCard;
