
// 🕒 CLOCK
setInterval(() => {
  document.getElementById("clock").innerText =
    new Date().toLocaleTimeString();
}, 1000);


// 🌍 WEATHER AUTO LOCATION
navigator.geolocation.getCurrentPosition(async (pos) => {

  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  const res = await fetch(url);
  const data = await res.json();

  document.getElementById("weather").innerText =
    `Temp: ${data.current_weather.temperature}°C | Wind: ${data.current_weather.windspeed} km/h`;

});


// 🤖 AI TUTOR (FIXED GEMINI)
async function askAI() {

  try {

    let input = document.getElementById("aiInput").value;
    document.getElementById("aiBox").innerText = "Thinking... 🤖";

    const apiKey = "AIzaSyAj4mwHOade4mbhJmts_Pz0w7MdWhcr9Bc";

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{
                text: "You are a study tutor. Explain simply: " + input
              }]
            }
          ]
        })
      }
    );

    const data = await res.json();

    let reply = "No response";

    const c = data?.candidates?.[0];
    if (c?.content?.parts?.length > 0) {
      reply = c.content.parts[0].text;
    }

    document.getElementById("aiBox").innerText = reply;

  } catch (err) {
    document.getElementById("aiBox").innerText = "AI Error 😢";
    console.log(err);
  }
}