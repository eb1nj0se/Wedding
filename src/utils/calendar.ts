/**
 * Generates calendar files and deep links for betrothal dates
 */

export const BETROTHAL_EVENT = {
  title: 'Betrothal Celebration: Ashik & Teresa',
  description: 'Join us to celebrate the betrothal of Ashik and Teresa. Betrothal Ceremony is at 11:30 AM at Carmalamatha Church, Chettupuzha followed by the Feast at 12:30 PM at St Aloysius College Auditorium in Elthuruth, Thrissur, Kerala.',
  location: 'Carmalamatha Church, G538+QHR, Road, Kanjani, Chettupuzha, Thrissur, Kerala 680012',
  startDate: new Date('2026-12-26T11:30:00+05:30'),
  endDate: new Date('2026-12-26T16:00:00+05:30'),
};

// Kept alias for backwards compatibility
export const WEDDING_EVENT = BETROTHAL_EVENT;

export function getGoogleCalendarUrl(): string {
  const formatTime = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  const start = formatTime(BETROTHAL_EVENT.startDate);
  const end = formatTime(BETROTHAL_EVENT.endDate);
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: BETROTHAL_EVENT.title,
    dates: `${start}/${end}`,
    details: BETROTHAL_EVENT.description,
    location: BETROTHAL_EVENT.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile() {
  const formatTime = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  const start = formatTime(BETROTHAL_EVENT.startDate);
  const end = formatTime(BETROTHAL_EVENT.endDate);
  const now = formatTime(new Date());

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ashik and Teresa Betrothal//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:betrothal-${Date.now()}@ashikteresa.love`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${BETROTHAL_EVENT.title}`,
    `DESCRIPTION:${BETROTHAL_EVENT.description}`,
    `LOCATION:${BETROTHAL_EVENT.location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Ashik-and-Teresa-Betrothal.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
