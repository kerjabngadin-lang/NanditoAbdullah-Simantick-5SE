// Daftar tugas. Tambah tugas baru cukup dengan menambah satu objek di sini.
// status: "done" = sudah selesai (bisa dibuka), "soon" = belum tersedia (kartu nonaktif)
const TASKS = [
  { id: 1, title: "Tugas 1 - RDF Knowledge Graph",
    desc: "Praktikum RDF: input data mahasiswa, pembentukan Subject-Predicate-Object, RDF/XML, dan visualisasi Knowledge Graph.",
    tags: ["RDF", "RDF/XML", "Knowledge Graph", "JavaScript"], href: "pages/tugas1_rdf_graph.html", status: "done" },
  { id: 2, title: "Tugas 2 - MINI RDF",
    desc: "Praktikum Mini RDF - PERHITUNGAN A + B = C. Alur Input → Proses → Output.",
    tags: ["RDF", "RDF/XML", "Knowledge Graph", "JavaScript"], href: "pages/tugas2_mini_rdf.html", status: "done" },
  { id: 3, title: "Tugas 3",
    desc: "Akan tersedia pada Pertemuan ke-4.",
    tags: ["Segera Hadir"], href: null, status: "soon" },
  { id: 4, title: "Tugas 4",
    desc: "Akan tersedia pada Pertemuan ke-5.",
    tags: ["Segera Hadir"], href: null, status: "soon" }
];

const $ = id => document.getElementById(id);

function render() {
  const k = $('q').value.toLowerCase();
  const list = TASKS.filter(t => (t.title + t.desc + t.tags.join()).toLowerCase().includes(k));
  const done = TASKS.filter(t => t.status === 'done').length;
  $('cnt').textContent = done + ' dari ' + TASKS.length + ' tugas selesai';
  $('grid').innerHTML = list.map(t => {
    const isDone = t.status === 'done';
    const badge = isDone ? '<span class="badge">Selesai</span>' : '<span class="badge soon">Segera</span>';
    const action = isDone
      ? `<a class="btn" href="${t.href}">Buka Tugas →</a>`
      : `<button class="btn disabled" disabled>Belum Tersedia</button>`;
    return `
    <div class="card">
      <div class="top"><span class="num">0${t.id}</span>${badge}</div>
      <h3>${t.title}</h3><p>${t.desc}</p>
      <div>${t.tags.map(x => `<span class="tag">${x}</span>`).join('')}</div>
      <div>${action}</div>
    </div>`;
  }).join('') || '<p>Tidak ada tugas ditemukan.</p>';
}

$('q').oninput = render;
render();