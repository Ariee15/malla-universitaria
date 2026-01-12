document.addEventListener("DOMContentLoaded", () => {
  const materias = document.querySelectorAll(".materia");

  // cargar progreso guardado
  const aprobadas = JSON.parse(localStorage.getItem("materiasAprobadas")) || [];

  materias.forEach(materia => {
    const id = materia.dataset.id;

    // restaurar aprobadas
    if (aprobadas.includes(id)) {
      materia.classList.add("aprobada");
    }
  });

  // función para verificar bloqueos
  function actualizarBloqueos() {
  materias.forEach(materia => {
    const prereq = materia.dataset.prereq;

    // materias sin prerequisitos nunca se bloquean
    if (!prereq) {
      materia.classList.remove("bloqueada", "desbloqueada");
      return;
    }

    const requisitos = prereq.split(",");

    const cumplidos = requisitos.every(req =>
      document
        .querySelector(`[data-id="${req.trim()}"]`)
        ?.classList.contains("aprobada")
    );

    if (!cumplidos) {
      // 🔒 BLOQUEADA = bloqueada y SIN desbloqueada
      materia.classList.add("bloqueada");
      materia.classList.remove("desbloqueada");
    } else {
      // 🔓 desbloqueo visual SOLO si no está aprobada
      materia.classList.remove("bloqueada");

      if (!materia.classList.contains("aprobada")) {
        materia.classList.add("desbloqueada");

        setTimeout(() => {
          materia.classList.remove("desbloqueada");
        }, 900);
      }
    }
  });
}

  actualizarBloqueos();

  materias.forEach(materia => {
    materia.addEventListener("click", () => {
      if (materia.classList.contains("bloqueada")) return;

      materia.classList.toggle("aprobada");

      const id = materia.dataset.id;

      let guardadas = JSON.parse(localStorage.getItem("materiasAprobadas")) || [];

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
