export const projectStatuses = [
  { value: 'Ongoing', label: 'Ongoing' },
  { value: 'Completed', label: 'Completed' },
  { value: 'On Hold', label: 'On Hold' }
];

const STATUS_LABELS = {
  ongoing: 'Ongoing',
  completed: 'Completed',
  on_hold: 'On Hold',
  'on hold': 'On Hold',
  draft: 'Draft',
};

export function formatProjectStatus(status) {
  if (!status || typeof status !== 'string') return status;
  const trimmed = status.trim();
  const normalized = STATUS_LABELS[trimmed.toLowerCase()];
  if (normalized) return normalized;
  return trimmed
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function normalizeProjectCategories(categoryStr) {
  if (!categoryStr || typeof categoryStr !== 'string') return '';
  const seen = new Set();
  const unique = [];
  for (const raw of categoryStr.split(',')) {
    const trimmed = raw.trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(trimmed);
    }
  }
  return unique.join(', ');
}

export const projectCategories = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'interior', label: 'Interior Design' },
  { value: 'urban_planning', label: 'Urban Planning' }
];

export const countryOptions = [
  { value: 'nigeria', label: 'Nigeria' },
  { value: 'ghana', label: 'Ghana' },
  { value: 'south_africa', label: 'South Africa' },
  { value: 'united_kingdom', label: 'United Kingdom' },
  { value: 'united_states', label: 'United States' }
];
