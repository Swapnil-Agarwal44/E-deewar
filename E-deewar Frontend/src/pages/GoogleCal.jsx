const GoogleCalendar = () => {
  return (
    <div className="container mt-4">
      <h2>📅 Google Calendar</h2>
      <iframe 
        src="https://calendar.google.com/calendar/embed?src=your_calendar_id&ctz=UTC" 
        style={{ border: 0, width: "100%", height: "600px" }} 
        frameBorder="0" 
        scrolling="no">
      </iframe>
    </div>
  );
};

export default GoogleCalendar;
