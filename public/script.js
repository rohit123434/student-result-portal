const API = "http://localhost:5000/api/results/short/";

document.getElementById("searchBtn").addEventListener("click", async () => {
  const id = document.getElementById("shortId").value.trim();
  const errorEl = document.getElementById("error");
  const card = document.getElementById("resultCard");
  card.classList.add("hidden");
  errorEl.textContent = "";

  if (!id) return (errorEl.textContent = "Please enter an ID");

  try {
    const res = await fetch(API + id);
    if (!res.ok) throw new Error("Result not found");
    const data = await res.json();
    card.innerHTML = renderResult(data);
    card.classList.remove("hidden");
  } catch (err) {
    errorEl.textContent = err.message;
  }
});

function renderResult(d) {
  const subjectsRows = d.subjects
    .map(s => `<tr><td>${s.name}</td><td>${s.mark}</td></tr>`)  
    .join("");
  return `
    <h2>${d.studentName} (${d.rollNo})</h2>
    <p>Class: ${d.class}</p>
    <table>
      <thead><tr><th>Subject</th><th>Mark</th></tr></thead>
      <tbody>${subjectsRows}</tbody>
    </table>
    <p><strong>Total:</strong> ${d.total}</p>
    <p><strong>Percentage:</strong> ${d.percentage.toFixed(2)}%</p>
    <p><strong>Grade:</strong> ${d.grade}</p>
  `;
}
