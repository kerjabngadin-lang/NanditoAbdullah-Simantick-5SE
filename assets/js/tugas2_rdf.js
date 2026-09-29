// Tugas 2
const app = document.getElementById('app');
app.innerHTML = `
<div class="flow"><span>INPUT</span>→<span>PROSES</span>→<span>OUTPUT</span></div>
<div class="pnl"><h3><span class="st">INPUT</span>Masukkan Nilai</h3>
  <div class="row">
    <div><div class="lbl">Nilai A</div><input id="a" type="number" value="21"></div>
    <div><div class="lbl">Nilai B</div><input id="b" type="number" value="44"></div>
  </div>
  <p style="margin:14px 0 0"><button class="btn" id="go">HITUNG &amp; GENERATE RDF</button></p>
</div>
<div id="o"></div>
<div class="pnl"><h3>Tugas &amp; Evaluasi</h3>
  <details><summary>Tugas Praktikum</summary><ol>
    <li>Jalankan file HTML di browser.</li><li>Gunakan A = 21 dan B = 44, catat hasil C.</li>
    <li>Identifikasi Subject, Predicate, Object tiap triple.</li><li>Amati RDF/XML yang dihasilkan.</li>
    <li>Jelaskan hubungan data A, B, proses, dan hasil C.</li>
    <li>Ubah nilai (mis. A = 10, B = 15), amati perubahan output RDF.</li>
    <li>Buat kesimpulan hubungan HTML, JavaScript, dan RDF.</li></ol></details>
  <details><summary>Pertanyaan Evaluasi</summary><ol>
    <li>Apa fungsi HTML pada program ini?</li><li>Apa fungsi JavaScript?</li>
    <li>Bagaimana proses mendapatkan nilai C?</li><li>Apa itu Subject, Predicate, Object?</li>
    <li>Pada “A → memilikiNilai → 5”, mana S, P, O?</li>
    <li>Pada “Perhitungan → memilikiHasil → 11”, apa Subject dan Object-nya?</li>
    <li>Apa fungsi RDF/XML?</li><li>Mengapa kumpulan triple membentuk Knowledge Graph?</li></ol></details>
  <details><summary>Catatan Konseptual</summary>
    <p>JavaScript melakukan operasi A + B = C. RDF bukan mesin penghitung, melainkan cara merepresentasikan fakta dan hubungan hasil proses tersebut.</p></details>
</div>`;

function hitung() {
  const A = +document.getElementById('a').value, B = +document.getElementById('b').value, C = A + B;
  const tr = [
    { s: 'A', p: 'memilikiNilai', o: A },
    { s: 'B', p: 'memilikiNilai', o: B },
    { s: 'Perhitungan', p: 'menggunakanA', o: 'A', res: 1 },
    { s: 'Perhitungan', p: 'menggunakanB', o: 'B', res: 1 },
    { s: 'Perhitungan', p: 'memilikiHasil', o: C }
  ];
  document.getElementById('o').innerHTML = renderOutput(tr,
    `<div class="pnl"><h3><span class="st">PROSES</span>Perhitungan</h3>
     <p style="margin:0">C = A + B → C = ${A} + ${B} → C = ${C}</p><div class="res">${A} + ${B} = ${C}</div></div>`);
  bindCopy();
}
document.getElementById('go').onclick = hitung;
hitung();
