const SESSION_KEY = 'spw_session';

// tutor caro baut akun cekcek
// pakek f12
//   ektik await hashText("password_baru")
// asbis tu salin, pass kebawah.
const USERS = [
  {
    username: 'nandito',
    name: 'Nandito Abdullah',
    nim: '241055201025',
    prodi: 'Teknik Informatika',
    passHash: '5e2804236a0543b079ab61f2ca56628e6029283a019c30a3811468d15854fcf4' // default: 241055201025
  }
];

async function hashText(text) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function attemptLogin(username, password) {
  const u = USERS.find(x => x.username.toLowerCase() === String(username).trim().toLowerCase());
  if (!u) return { ok: false, message: 'Username tidak ditemukan.' };
  const hash = await hashText(password);
  if (hash !== u.passHash) return { ok: false, message: 'Password salah.' };
  return { ok: true, session: { username: u.username, name: u.name, nim: u.nim, prodi: u.prodi, loginAt: Date.now() } };
}

function saveSession(session, remember) {
  const data = JSON.stringify(session);
  if (remember) localStorage.setItem(SESSION_KEY, data);
  else sessionStorage.setItem(SESSION_KEY, data);
}

function getSession() {
  const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
  try { return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
}

function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
}

// Menampilkan bar "Masuk sebagai ... [Keluar]" di elemen bertarget.
function renderSessionBar(targetId, loginPath) {
  loginPath = loginPath || 'login.html';
  const el = document.getElementById(targetId);
  const s = getSession();
  if (!el || !s) return;
  el.innerHTML = `<div class="session-bar-outer"><div class="session-bar w">
      <span>Masuk sebagai <b>${s.name}</b> &middot; ${s.nim}</span>
      <button class="btn o sm" id="logoutBtn" type="button">Keluar</button>
    </div></div>`;
  document.getElementById('logoutBtn').onclick = () => { logout(); location.href = loginPath; };
}
