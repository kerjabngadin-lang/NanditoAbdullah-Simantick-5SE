// nah disnin bisa lebih banyak, tpi sekarang sikok bagi duo dulu.
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const rid = s => String(s).trim().replace(/[^A-Za-z0-9_]/g, '_');

// Triple = { s: Subject, p: Predicate, o: Object, res: true jika Object berupa resource }
function toXML(tr) {
  const g = {};
  tr.forEach(x => (g[x.s] = g[x.s] || []).push(x));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\n         xmlns:simatic="http://simatic.web/ns#">\n` +
    Object.entries(g).map(([s, a]) => `  <rdf:Description rdf:about="#${rid(s)}">\n` +
      a.map(x => x.res
        ? `    <simatic:${x.p} rdf:resource="#${rid(x.o)}"/>`
        : `    <simatic:${x.p}>${esc(x.o)}</simatic:${x.p}>`).join('\n') +
      `\n  </rdf:Description>`).join('\n') + `\n</rdf:RDF>`;
}

function tripleTable(tr) {
  return `<div class="sc"><table><tr><th>Subject</th><th>Predicate</th><th>Object</th></tr>` +
    tr.map(x => `<tr><td><b>${esc(x.s)}</b></td><td>${x.p}</td><td>${esc(x.o)}</td></tr>`).join('') + `</table></div>`;
}

function drawGraph(tr) {
  const names = [...new Set(tr.flatMap(x => [x.s, x.o]))], lay = {};
  const objs = new Set(tr.map(x => x.o));
  names.filter(n => !objs.has(n)).forEach(n => lay[n] = 0);
  for (let i = 0; i < 6; i++) tr.forEach(x => { if (lay[x.s] != null) lay[x.o] = Math.max(lay[x.o] || 0, lay[x.s] + 1); });
  const cols = [];
  names.forEach(n => (cols[lay[n] || 0] = cols[lay[n] || 0] || []).push(n));
  const W = Math.max(620, cols.length * 230), H = Math.max(...cols.map(c => c ? c.length : 0)) * 70 + 40, pos = {};
  cols.forEach((c, i) => c && c.forEach((n, j) =>
    pos[n] = [70 + i * (W - 140) / Math.max(cols.length - 1, 1), H / (c.length + 1) * (j + 1)]));
  const lit = new Set(tr.filter(x => !x.res).map(x => x.o));
  return `<div class="sc"><svg viewBox="0 0 ${W} ${H}" width="100%" style="min-width:620px"><defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#94a3b8"/></marker></defs>` +
    tr.map(x => {
      const [a, b] = pos[x.s], [c, d] = pos[x.o], dx = c - a, dy = d - b, L = Math.hypot(dx, dy) || 1;
      return `<line x1="${a + dx / L * 34}" y1="${b + dy / L * 24}" x2="${c - dx / L * 36}" y2="${d - dy / L * 26}" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ar)"/><text class="el" x="${(a + c) / 2}" y="${(b + d) / 2 - 5}" text-anchor="middle">${x.p}</text>`;
    }).join('') +
    names.map(n => {
      const [x, y] = pos[n], isLit = lit.has(n) && !tr.some(t => t.s == n);
      return isLit
        ? `<rect x="${x - 32}" y="${y - 18}" width="64" height="36" rx="6" fill="#fef3c7" stroke="#f59e0b"/><text x="${x}" y="${y + 4}" text-anchor="middle" style="fill:#78350f">${esc(n).slice(0, 10)}</text>`
        : `<ellipse cx="${x}" cy="${y}" rx="36" ry="24" fill="#dbe7ff" stroke="#2456d6" stroke-width="1.5"/><text x="${x}" y="${y + 4}" text-anchor="middle" style="fill:#1e3a8a;font-weight:700">${esc(n).slice(0, 11)}</text>`;
    }).join('') + `</svg></div>`;
}

function renderOutput(tr, extra = '') {
  return extra +
    `<div class="pnl"><h3><span class="st">OUTPUT</span>RDF Triple</h3>${tripleTable(tr)}</div>
     <div class="pnl"><h3><span class="st">OUTPUT</span>RDF/XML <button class="btn sm" id="cp" style="margin-left:auto">SALIN RDF/XML</button></h3><pre id="xm">${esc(toXML(tr))}</pre></div>
     <div class="pnl"><h3><span class="st">OUTPUT</span>Knowledge Graph</h3>${drawGraph(tr)}</div>`;
}

function bindCopy() {
  const b = document.getElementById('cp');
  if (!b) return;
  b.onclick = () => {
    const t = document.getElementById('xm').textContent;
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).catch(() => {
      const r = document.createRange(); r.selectNode(document.getElementById('xm'));
      getSelection().removeAllRanges(); getSelection().addRange(r); document.execCommand('copy');
    });
    b.textContent = 'TERSALIN ✓';
    setTimeout(() => b.textContent = 'SALIN RDF/XML', 1500);
  };
}
