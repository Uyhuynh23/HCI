import { format } from 'date-fns';

/**
 * Derives current field status (active/idle), sport, and time remaining from schedules.
 * @param {string} fieldId 
 * @param {Array} schedules 
 * @param {Date} now Current time
 * @returns {Object} { status, sport, timeRemaining, activeSchedule }
 */
export function getFieldStatus(fieldId, schedules, now = new Date()) {
  const today = format(now, 'yyyy-MM-dd');
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const activeSchedule = schedules.find(s => {
    if (s.fieldId !== fieldId || s.date !== today) return false;
    const [sh, sm] = s.startTime.split(':').map(Number);
    const [eh, em] = s.endTime.split(':').map(Number);
    const startMin = sh * 60 + sm;
    const endMin = eh * 60 + em;
    return nowMinutes >= startMin && nowMinutes < endMin;
  });

  if (activeSchedule) {
    const [eh, em] = activeSchedule.endTime.split(':').map(Number);
    const endMin = eh * 60 + em;
    const remainingSeconds = (endMin - nowMinutes) * 60 - now.getSeconds();
    return {
      status: 'active',
      sport: activeSchedule.sport,
      timeRemaining: Math.max(0, remainingSeconds),
      activeSchedule
    };
  }

  return { status: 'idle', sport: null, timeRemaining: null, activeSchedule: null };
}

/**
 * Checks if a new time range overlaps with any existing schedules for a field.
 * @param {string} fieldId 
 * @param {string} date 'yyyy-MM-dd'
 * @param {string} startTime 'HH:mm'
 * @param {string} endTime 'HH:mm'
 * @param {Array} schedules 
 * @param {string} excludeId Optional ID to exclude (e.g. when updating)
 * @returns {Object|null} The overlapping schedule or null
 */
export function getOverlappingSchedule(fieldId, date, startTime, endTime, schedules, excludeId = null) {
  const timeToMinutes = (t) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const startMin = timeToMinutes(startTime);
  const endMin = timeToMinutes(endTime);

  return schedules.find((s) => {
    if (s.id === excludeId) return false;
    if (s.fieldId !== fieldId || s.date !== date) return false;

    const existStart = timeToMinutes(s.startTime);
    const existEnd = timeToMinutes(s.endTime);

    // Overlap formula: (StartA < EndB) && (EndA > StartB)
    return startMin < existEnd && endMin > existStart;
  });
}
