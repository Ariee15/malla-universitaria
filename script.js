const materias = document.querySelectorAll('.materia');

// inicializar bloqueo
function actualizarBloqueos() {
  materias.forEach(materia => {
    const prereq = materia.dataset.prereq;

    if (!prereq) return;

    const prereqs = prereq.split(',');
    const cumplidos = prereqs.every(id => {
      const mat = document.querySelector(`[data-id="${id.trim()}"]`);
      return mat && mat.classList.contains('aprobada');
    });

    if (!cumplidos && !materia.classList.contains('aprobada')) {
      materia.classList.add('bloqueada');
    } else {
      materia.classList.remove('bloqueada');
    }
  });
}

// click en materias
materias.forEach(materia => {
  materia.addEventListener('click', () => {
    if (materia.classList.contains('bloqueada')) return;

    materia.classList.toggle('aprobada');
    materia.classList.remove('pendiente');
    actualizarBloqueos();
  });
});

actualizarBloqueos();
