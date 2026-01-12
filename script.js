const materias = document.querySelectorAll('.materia');

function actualizarBloqueos() {
  materias.forEach(m => {
    const prereq = m.dataset.prereq;
    if (!prereq) return;

    const ids = prereq.split(',');
    const ok = ids.every(id =>
      document.querySelector(`[data-id="${id.trim()}"]`)?.classList.contains('aprobada')
    );

    if (!ok && !m.classList.contains('aprobada')) {
      m.classList.add('bloqueada');
    } else {
      m.classList.remove('bloqueada');
    }
  });
}

materias.forEach(m => {
  m.addEventListener('click', () => {
    if (m.classList.contains('bloqueada')) return;
    m.classList.toggle('aprobada');
    actualizarBloqueos();
  });
});

actualizarBloqueos();
