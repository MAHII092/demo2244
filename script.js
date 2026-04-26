const form = document.getElementById("appointmentForm");
const successMsg = document.getElementById("successMsg");

const SUPABASE_URL = "https://uabrmbyuauvoxvusnhrq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // tuza full key

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const appointment = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    doctor: document.getElementById("doctor").value,
    department: document.getElementById("department").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    message: document.getElementById("message").value,
    payment_status: "Unpaid",
    appointment_status: "Pending",
    admin_note: ""
  };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/appointments`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": "Bearer " + SUPABASE_KEY,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(appointment)
    });

    if (!res.ok) {
      const error = await res.text();
      console.log(error);
      alert("Error: " + error);
      return;
    }

    successMsg.innerText = "Appointment Book Zali ✅";
    successMsg.style.display = "block";

  } catch (err) {
    console.log(err);
    alert("Connection error");
  }
});
