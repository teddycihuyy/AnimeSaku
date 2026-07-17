const genres = ["Action","Isekai","Romance","Comedy","Horror","Slice of Life","Fantasy","Drama","Historical","Ecchi","Psychological","Music"];
const days = ["Senin","Selasa","Rabu","Kamis","Jumat","Sabtu","Minggu"];
const db = [
  {id:1, title:"Spy X Family Season 3", img:"https://cdn.myanimelist.net/images/anime/1441/122795l.jpg", year:2025, status:"Completed", ep:12, genre:["Action","Slice of Life"], day:"Sabtu", sinopsis:"Keluarga mata-mata palsu demi misi dunia.", eps:[{n:1,url:"-", dl:{ "360p":["-"] }}]},
  {id:2, title:"Solo Leveling Season 2", img:"Solo_Leveling_Season_2.jpeg", year:2025, status:"Completed", ep:12, genre:["Action","Fantasy"], day:"Sabtu", sinopsis:"Sung Jinmok jadi hunter terkuat.", eps:[{n:1,url:"-", dl:{ "360p":["-"] }}]},
  {id:3, title:"Demon Slayer", img:"https://cdn.myanimelist.net/images/anime/1286/99889l.jpg", year:2019, status:"Completed", ep:26, genre:["Action","Fantasy"], day:"Minggu", sinopsis:"Tanjiro berburu iblis buat nyembuhin adiknya.", eps:[{n:1,url:"https://wa.me/+6283845075307", dl:{ "720p":["https://wa.me/+6283845075307"] }}]},
  {id:4, title:"Sousou no Frieren", img:"Sousou_no_Frieren.webp", year:2025, status:"Completed", ep:12, genre:["Action","Fantasy"], day:"Sabtu", sinopsis:"Perjalanan mY istri setelah mengalahkan raja iblis.", eps:[{n:1,url:"-", dl:{ "360p":["https://wa.me/+6283845075307"] }}]},
  {id:5, title:"Tensei Shitara Slime Datta Ken Season 1", img:"Tensei_Shitara_Slime_Datta_Ken_Season_1.jpg", year:2025, status:"Completed", ep:12, genre:["Action","Fantasy"], day:"Sabtu", sinopsis:"Manusia bereinkarnasi jadi slime di dunia isekai.", eps:[{n:1,url:"-", dl:{ "360p":["-"] }}]},
  {id:6, title:"Attack on Titan Season 1", img:"Attack_on_Titan_Season_1.jpeg", year:2025, status:"Completed", ep:12, genre:["Action","Fantasy"], day:"Sabtu", sinopsis:"Manusia melawan para Titan.", eps:[{n:1,url:"-", dl:{ "360p":["-"] }}]},
  {id:7, title:"Kono Subarashii Sekai ni Shukufuku wo! Season 1", img:"Kono_Suba_Season_1.jpeg", year:2025, status:"Completed", ep:12, genre:["Action","Fantasy","Comedy"], day:"Sabtu", sinopsis:"Komedi isekai paling kocak ygy.", eps:[{n:1,url:"-", dl:{ "360p":["-"] }}]},
  {id:8, title:"Super no Ura de Yani Suu Futari", img:"Super_no_Ura_de_Yani_Suu_Futari.jpeg", year:2025, status:"Ongoing", ep:1, genre:["Action","Slice of Life"], day:"Jumat", sinopsis: "Kisah 2 hamakk yang suka ngerokok di belakang supermarket.", eps:[{n:1,url:"https://www.mp4upload.com/embed-rbf8n4ldd607.html", dl:{ "360p":["https://drive.google.com/file/d/1foP1VIk5RkKb2cRw9HIR5cQ30qYfWG1V/view"], "720p":[""] }}]},
];

const perPage = 6;
let currentPage = 1;
let activeGenre = null;
let activeDay = "Senin";

function goHome() { setActiveNav(0); showPage('homePage'); renderHome(); }
function goPage(p) {
  setActiveNav(p==='animelist'?1:p==='jadwal'?2:0);
  showPage(p+'Page');
  if(p==='animelist') renderAnimeList();
  if(p==='jadwal') renderJadwal();
}

function showPage(id) { // FIX UTAMA DISINI
  document.querySelectorAll('.page,.watch-page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}

function setActiveNav(i) {
  document.querySelectorAll('.nav-link').forEach((a,idx)=>a.classList.toggle('active', idx===i));
}

function renderHome() {
  goLatestPage(1);
  document.getElementById('ongoingList').innerHTML = db.filter(a=>a.status==='Ongoing').map(a=>`
    <div class="anime-row" onclick="play(${a.id},${a.ep})"><div class="anime-thumb"><img src="${a.img}"></div><div class="anime-data"><div class="title">${a.title}</div><div class="meta">${a.year} • ${a.ep} Ep</div><span class="ep-badge">Ep ${a.ep}</span></div></div>
  `).join('');
  document.getElementById('genreList').innerHTML = genres.map(g=>`<a class="genre-item ${activeGenre===g?'active':''}" onclick="filterGenre('${g}')">${g}</a>`).join('');
}

function goLatestPage(p) {
  currentPage = p;
  const data = db.slice((p-1)*perPage, p*perPage);
  renderGrid('latestGrid', data);
  renderPagination('latestPagination', Math.ceil(db.length/perPage), p, 'goLatestPage');
}

function filterGenre(g) { activeGenre = activeGenre===g?null:g; currentPage = 1; goPage('animelist'); }

function renderAnimeList() {
  goAllPage(1);
  document.getElementById('genreFilterList').innerHTML = genres.map(g=>`<a class="genre-item ${activeGenre===g?'active':''}" onclick="filterGenre('${g}')">${g}</a>`).join('');
}

function goAllPage(p) {
  currentPage = p;
  let filtered = activeGenre? db.filter(a=>a.genre.includes(activeGenre)) : db;
  const data = filtered.slice((p-1)*perPage, p*perPage);
  renderGrid('allGrid', data);
  renderPagination('allPagination', Math.ceil(filtered.length/perPage), p, 'goAllPage');
}

function renderJadwal() {
  document.getElementById('jadwalDays').innerHTML = days.map(d=>`<div class="jadwal-day ${activeDay===d?'active':''}" onclick="selectDay('${d}')">${d}</div>`).join('');
  selectDay(activeDay);
}
function selectDay(d) {
  activeDay = d;
  document.querySelectorAll('.jadwal-day').forEach(el=>el.classList.toggle('active', el.textContent===d));
  const list = db.filter(a=>a.day===d);
  document.getElementById('jadwalList').innerHTML = list.length? list.map(a=>`<div class="anime-row" onclick="play(${a.id},1)"><div class="anime-thumb"><img src="${a.img}"></div><div class="anime-data"><div class="title">${a.title}</div><div class="meta">${a.genre.join(', ')}</div></div></div>`).join('') : '<div style="padding:20px;text-align:center">Tidak ada anime rilis hari ini</div>';
}

function renderGrid(id, data) {
  const el = document.getElementById(id);
  if(!el) return;
  if(data.length === 0) return el.innerHTML = '';
  el.innerHTML = data.map(a=>`
    <div class="grid-card" onclick="play(${a.id},1)">
      <div class="grid-thumb"><img src="${a.img}"><div class="grid-status">${a.status}</div></div>
      <div class="grid-title">${a.title}</div>
    </div>
  `).join('');
}

function renderPagination(id, total, current, fnName) {
  if(total <= 1) return document.getElementById(id).innerHTML = '';
  let html = `<button class="page-btn" onclick="${fnName}(${current-1})" ${current===1?'disabled':''}>Prev</button>`;
  for(let i=1; i<=total; i++) html += `<button class="page-btn ${i===current?'active':''}" onclick="${fnName}(${i})">${i}</button>`;
  html += `<button class="page-btn" onclick="${fnName}(${current+1})" ${current===total?'disabled':''}>Next</button>`;
  document.getElementById(id).innerHTML = html;
}

function play(id, n){
  const anime = db.find(x => x.id == id);
  const epData = anime.eps[n-1];

  const playerWrap = document.querySelector('.player-wrap');
  const player = document.getElementById('player');

  // JIKA GAADA LINK NONTON
  if(epData.url === "-") {
    // ganti iframe jadi box tulisan
    playerWrap.innerHTML = `<div style="background:#000; aspect-ratio:16/9; border-radius:4px; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:8px; color:var(--text-dim); font-weight:700; padding:20px; text-align:center;">😅 Link Nonton Belum Tersedia<br><span style="font-size:12px; font-weight:400;">Silakan gunakan link Download di bawah</span></div>`;
  } else {
    // KALAU ADA LINK, BALIKIN JADI IFRAME DULU
    if(playerWrap.querySelector('iframe') === null){
      playerWrap.innerHTML = `<iframe id="player" src="" allow="autoplay" allowfullscreen></iframe>`;
    }
    document.getElementById('player').src = epData.url; 
  }

  document.getElementById('watchTitle').innerText = `${anime.title} - Episode ${n}`;
  document.getElementById('breadcrumb').innerHTML = `Home / ${anime.title} / Ep ${n}`;
  document.getElementById('sinopsisText').innerText = anime.sinopsis || 'Sinopsis belum tersedia';

  let epHtml = '';
  anime.eps.forEach((e, i) => {
    epHtml += `<div class="ep-btn ${i+1 == n? 'active' : ''}" onclick="play(${id}, ${i+1})">Ep ${e.n}</div>`
  });
  document.getElementById('epList').innerHTML = epHtml;

  renderDownload(epData.dl);

  showPage('watchPage');
}

function renderDownload(dlData) {
  const dlBox = document.getElementById('downloadList');
  if(!dlData) return dlBox.innerHTML = 'Belum ada link';

  let html = '';
  for(let quality in dlData) {
    let links = dlData[quality].filter(l => l!== "-");
    if(links.length === 0) continue;
    html += `<div><div class="dl-quality">⬇ ${quality}</div><div class="dl-links">`;
    links.forEach((link, i)=>{
      html += `<a class="dl-btn" href="${link}" target="_blank">Google Drive ${i+1}</a>`;
    });
    html += `</div></div>`;
  }
  dlBox.innerHTML = html || 'Belum ada link';
}

// SEARCH
function doSearch(query) {
  const q = query.toLowerCase().trim();
  if(q === "") { goHome(); return; }
  setActiveNav(-1);
  showPage('searchPage'); // PAKE showPage
  let results = db.filter(a => a.title.toLowerCase().includes(q) || a.genre.some(g => g.toLowerCase().includes(q)));
  document.getElementById('searchTitle').textContent = `Hasil Pencarian: "${query}" (${results.length})`;
  renderGrid('searchGrid', results);
  document.getElementById('searchNotFound').innerHTML = results.length? '' : '😅 Anime tidak ditemukan';
}

document.addEventListener('DOMContentLoaded', () => {
  renderHome();
  document.getElementById('search').addEventListener('input', e => doSearch(e.target.value));
}); 