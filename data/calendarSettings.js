export const initialCalendarSettings = {
  durationPerSlot: 60,
  maxDurationPerReservation: 120,
  availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  timeOption: 'different', // 'same' or 'different'
  daySlots: {
    'Mon': [
      { id: 'm1', start: '09:00', end: '12:00' },
      { id: 'm2', start: '13:00', end: '16:00' }
    ],
    'Tue': [],
    'Wed': [],
    'Thu': [],
    'Fri': [],
    'Sat': [],
    'Sun': []
  },
  sameTimeSlots: []
};
