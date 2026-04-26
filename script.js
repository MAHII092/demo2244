const form = document.getElementById("appointmentForm");
const successMsg = document.getElementById("successMsg");

const SUPABASE_URL = "https://uabrmbyuauvoxvusnhrq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhYnJtYnl1YXV2b3h2dXNuaHJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxODMxMjEsImV4cCI6MjA5Mjc1OTEyMX0.0iU-RR-aoRZbtwXp50JaEu5_7_wYRnML-tFbCoXgXn8";
const APPOINTMENTS_API = `${SUPABASE_URL}/rest/v1/appointments`;

async function saveAppointmentToSupabase(appointment) {
  const response = await fetch(APPOINTMENTS_API, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation"
    },
    body: JSON.stringify(appointment)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return await response.json();
}

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.innerText = "Saving...";

  const appointment = {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    doctor: document.getElementById("doctor").value,
    department: document.getElementById("department").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    message: document.getElementById("message").value.trim(),
    payment_status: "Unpaid",
    appointment_status: "Pending",
    admin_note: ""
  };

  try {
    await saveAppointmentToSupabase(appointment);

    successMsg.innerText = "अपॉइंटमेंट book झाली ✅ Admin app मध्ये live दिसेल.";
    successMsg.style.display = "block";
    form.reset();
    setTimeout(() => successMsg.style.display = "none", 5000);
  } catch (error) {
    console.error("Supabase save error:", error);
    alert("Appointment save झाली नाही. Supabase table/policies check करा.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = "Submit Appointment";
  }
});
