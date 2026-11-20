const calendarInvite = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Sheila Marie and Mark Joel//Wedding Invitation//EN",
  "CALSCALE:GREGORIAN",
  "METHOD:PUBLISH",
  "BEGIN:VEVENT",
  "UID:sheila-marie-mark-joel-wedding-20261126@invitation",
  "DTSTAMP:20261120T000000Z",
  "DTSTART;VALUE=DATE:20261126",
  "DTEND;VALUE=DATE:20261127",
  "SUMMARY:Sheila Marie & Mark Joel — Wedding",
  "DESCRIPTION:10:30 AM Guest Arrival at 3rd Floor, Mangaladal Municipal Hall\\n11:00 AM Wedding Ceremony at 3rd Floor, Mangaladal Municipal Hall\\n12:00 NN Wedding Reception at Kalye Tres Restaurant",
  "LOCATION:Mangaladal Municipal Hall and Kalye Tres Restaurant",
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");

export async function GET() {
  return new Response(calendarInvite, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="sheila-marie-mark-joel-wedding.ics"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
