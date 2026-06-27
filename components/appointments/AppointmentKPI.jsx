import { motion } from 'framer-motion';

export default function AppointmentKPI({ kpis }) {
  const cards = [
    { id: 'pending', label: 'Pending Requests', value: kpis.pending, color: 'var(--gold)' },
    { id: 'approved', label: 'Approved Today', value: kpis.approvedToday, color: 'var(--green)' },
    { id: 'upcoming', label: 'Upcoming This Week', value: kpis.upcomingThisWeek, color: 'var(--blue)' },
    { id: 'rejected', label: 'Rejected This Month', value: kpis.rejectedThisMonth, color: 'var(--red)' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="bg-white p-4 rounded border border-[rgba(0,0,0,0.05)] shadow-sm flex flex-col justify-between"
        >
          <div className="text-[11px] uppercase tracking-wider text-[var(--ink-light)] font-bold mb-2">
            {card.label}
          </div>
          <div className="text-2xl font-bold" style={{ color: card.color }}>
            {card.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
