document.addEventListener("DOMContentLoaded", () => {
  const materias = document.querySelectorAll(".materia");
  const aprobadas = JSON.parse(localStorage.getItem("materiasAprobadas")) || [];

  materias.forEach(materia => {
    if (aprobadas.includes(materia.dataset.id)) {
      materia.classList.add("aprobada");
    }
  });

  function actualizarBloqueos() {
    materias.forEach(materia => {
      const prereq = materia.dataset.prereq;

      // 🔒 SI TIENE PREREQUISITOS
      if (prereq) {
        const requisitos = prereq.split(",");

        const cumplidos = requisitos.every(req =>
          document
            .querySelector(`[data-id="${req.trim()}"]`)
            ?.classList.contains("aprobada")
        );

        if (!cumplidos) {
          materia.classList.remove("aprobada", "desbloqueada");
          materia.classList.add("bloqueada");
          return;
        }
      }

      // 🔓 SI LLEGÓ AQUÍ, NO ESTÁ BLOQUEADA
      materia.classList.remove("bloqueada");
    });
  }

  actualizarBloqueos();

  materias.forEach(materia => {
    materia.addEventListener("click", () => {
      if (materia.classList.contains("bloqueada")) return;

      materia.classList.toggle("aprobada");

      let guardadas = JSON.parse(localStorage.getItem("materiasAprobadas")) || [];
      const id = materia.dataset.id;

      if (materia.classList.contains("aprobada")) {
        if (!guardadas.includes(id)) guardadas.push(id);
      } else {
        guardadas = guardadas.filter(m => m !== id);
      }

      localStorage.setItem("materiasAprobadas", JSON.stringify(guardadas));
      actualizarBloqueos();
    });
  });
});
