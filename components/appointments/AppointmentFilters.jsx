import { APPOINTMENT_STATUSES } from '@/constants/appointmentStatus';
import { Icons } from '@/components/shared/Icons';

export default function AppointmentFilters({ 
  filterConfig, 
  setFilterConfig 
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 bg-white p-6 rounded-xl border-[1.5px] border-[var(--stone)] shadow-sm">
      <div className="search-box" style={{ flex: '1', maxWidth: '100%' }}>
        <Icons.search className="w-4 h-4 text-[var(--stone-dark)]" />
        <input
          type="text"
          placeholder="Search by name, email, or date"
          value={filterConfig.search}
          onChange={(e) => setFilterConfig(prev => ({ ...prev, search: e.target.value }))}
          className="w-full"
        />
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <select
          value={filterConfig.status}
          onChange={(e) => setFilterConfig(prev => ({ ...prev, status: e.target.value }))}
          className="w-full sm:w-40 px-4 py-3 text-sm font-medium border border-[var(--stone)] rounded-lg focus:outline-none focus:border-[var(--gold)] bg-white appearance-none cursor-pointer"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23888\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
        >
          <option value="All">All Statuses</option>
          {Object.values(APPOINTMENT_STATUSES).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select
          className="w-full sm:w-40 px-4 py-3 text-sm font-medium border border-[var(--stone)] rounded-lg focus:outline-none focus:border-[var(--gold)] bg-white appearance-none cursor-pointer"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23888\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1rem' }}
        >
          <option>Sort by Date</option>
          <option>Sort by Name</option>
          <option>Recently Added</option>
        </select>
      </div>
    </div>
  );
}

