let xp = 0;
let level = 1;

// ======================
// BOOT SYSTEM
// ======================
setTimeout(() => {
  document.getElementById("boot").style.display = "none";
  document.getElementById("app").classList.remove("hidden");
}, 2000);

// ======================
// NOTES SYSTEM
// ======================
function openNote(type) {
  let text = "";

  if (type === "electrical") {
    text = "⚡ Electrical Basics:\nVoltage, Current, Resistance, Ohm's Law";
  }

  if (type === "electronics") {
    text = "🔌 Electronics:\nDiode, Transistor, IC, Microcontroller";
  }

  if (type === "programming") {
    text = "💻 Programming:\nVariables, Loops, Functions, JavaScript";
  }

  document.getElementById("noteBox").innerText = text;

  gainXP();
}

// ======================
// XP SYSTEM
// ======================
function gainXP() {
  xp += 20;

  if (xp >= 100) {
    level++;
    xp = 0;
    alert("🚀 LEVEL UP!");
  }

  document.getElementById("xp").innerText = xp;
  document.getElementById("level").innerText = level;
}

// ======================
// AI FUNCTION (REAL GEMINI)
// ======================
async function askAI() {
  let input = document.getElementById("aiInput").value;

  if (!input) return;

  document.getElementById("aiBox").innerText = "Thinking... 🤖";

  const apiKey = "AIzaSyD602McemRJEc9e1VAmtiS6Yi48h4iRixI"; // 🔴 tukar sini

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: input
                }
              ]
            }
          ]
        })
      }
    );

    const data = await res.json();

    let reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    document.getElementById("aiBox").innerText = reply;

  } catch (error) {
    console.log(error);
    document.getElementById("aiBox").innerText =
      "Error connecting to AI 😢";
  }
}

// ======================
// SEARCH
// ======================
document.addEventListener("input", function (e) {
  if (e.target.id === "search") {
    let val = e.target.value.toLowerCase();
    let cards = document.getElementsByClassName("card");

    for (let c of cards) {
      c.style.display = c.innerText.toLowerCase().includes(val)
        ? "block"
        : "none";
    }
  }
});

// ======================
// THEME TOGGLE
// ======================
function toggleTheme() {
  document.body.classList.toggle("light");
}