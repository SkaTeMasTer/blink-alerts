/**
 * Google Apps Script — Blink Motion Calendar Event Creator
 * 
 * Deploy as Web App:
 * 1. Open script.google.com
 * 2. Paste this code
 * 3. Deploy > New deployment > Web app
 * 4. Execute as: Me | Who has access: Anyone
 * 5. Copy the URL → set as APPS_SCRIPT_URL secret in GitHub
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var camera = data.camera || "Outdoor 4 - D1QG";
    var location = data.location || "Reimerdes Hill, Brookfield CT";
    
    var now = new Date();
    var end = new Date(now.getTime() + 20 * 60 * 1000); // +20 minutes
    
    var calendar = CalendarApp.getDefaultCalendar();
    var event = calendar.createEvent(
      "🚨📸 Blink Motion: " + camera,
      now,
      end,
      {
        description: "Motion detected by Blink camera.\n" +
                     "Camera: " + camera + "\n" +
                     "Location: " + location + "\n" +
                     "Pipeline: IFTTT → GitHub Actions → Google Calendar",
        location: location
      }
    );
    
    // Set color to Tomato (red) — color ID 11
    event.setColor(CalendarApp.EventColor.TOMATO);
    
    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok", eventId: event.getId() })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", service: "blink-motion-calendar" })
  ).setMimeType(ContentService.MimeType.JSON);
}
