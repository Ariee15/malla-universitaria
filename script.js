const materias = document.querySelectorAll(".materia");

function estaDesbloqueada(materia) {
  const prereq = materia.dataset.prereq;
  if (!prereq) return true;

  return prereq.split(",").every(id => {
    const m = document.querySelector(`[data-id="${id.trim()}"]`);
    return m && m.classList.contains("aprobada");
  });
}

materias.forEach(materia => {
  materia.addEventListener("click", () => {
    if (materia.classList.contains("aprobada")) return;

    if (!estaDesbloqueada(materia)) {
      alert("⚠️ No cumples los prerrequisitos");
      return;
    }

    materia.classList.add("aprobada");
  });
});
