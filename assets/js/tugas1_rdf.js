// Tugas 1
const app = document.getElementById('app');
app.innerHTML = `
<div class="pnl"><h3><span class="st">INPUT</span>Data Mahasiswa</h3>
  <div class="row">
    <div><div class="lbl">Nama</div><input id="n" value="Nandito Abdullah"></div>
    <div><div class="lbl">NIM</div><input id="m" value="241055201025"></div>
    <div><div class="lbl">Program Studi</div><input id="p" value="TEknik Informatika"></div>
    <div><div class="lbl">Mata Kuliah</div><input id="k" value="Siamtik Web"></div>
  </div>
  <p style="margin:14px 0 0"><button class="btn" id="go">GENERATE RDF</button></p>
</div>
<div id="o"></div>`;

function generate() {
  const v = id => document.getElementById(id).value;
  const n = v('n') || 'Mahasiswa';
  const tr = [
    { s: n, p: 'memilikiNIM', o: v('m') },
    { s: n, p: 'belajarDi', o: v('p'), res: 1 },
    { s: n, p: 'mengambil', o: v('k'), res: 1 },
    { s: v('p'), p: 'menyelenggarakan', o: v('k'), res: 1 }
  ];
  document.getElementById('o').innerHTML = renderOutput(tr);
  bindCopy();
}
document.getElementById('go').onclick = generate;
generate();
