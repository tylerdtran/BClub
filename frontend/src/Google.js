export default function Google() {
    const accessToken = "ya29.a0AVvZVsp5WQt9NJa0DE3A1ryVnCkWiUCzgCFz4J1VTPZQaIRKTnUkPZLzhihln6_XZ45RIUOFRjUdvOVH2jH-374VCbut0ITeSvcQSBOwgE2lDiiFSgCr1nuqi42ontgNCCA35nThzH8ETkvvQc6ZXnWw_FB1ygaCgYKARoSARMSFQGbdwaIg-dW6OlJC7OBqjjCC9cIJA0165";
    const calendarId = "par4007@g.ucla.edu";
    
    fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
}