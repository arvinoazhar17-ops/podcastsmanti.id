const SITE_CONFIG = {
  namaOrganisasi: "PODCAST SMANTI",
  tagline: "SUARA & CERITA SEKOLAH",
  periodeKepengurusan: "2026/2027",
  shareUrl: window.location.href
};

const SOCIAL_MEDIA_LINKS = [
  { platform: "YouTube", handle: "PODCAST SMANTI Official", url: "https://youtube.com/@podcastsmanti", iconType: "youtube" },
  { platform: "Instagram", handle: "@podcasmanti", url: "https://www.instagram.com/podcasmanti?vrfl=MTNjZmp4d2M0c21meA==", iconType: "instagram" },
  { platform: "Spotify", handle: "PODCAST SMANTI", url: "https://open.spotify.com", iconType: "spotify" },
  { platform: "TikTok", handle: "@podcastsmanti", url: "https://tiktok.com/@podcastsmanti", iconType: "tiktok" }
];

const PENGURUS_INTI_DATA = [
  { nama: "Hanif Ihsan", jabatan: "KETUA PODCAST", kelas: "XII.7", peranSingkat: "Koordinator Utama & Host", isKetua: true },
  { nama: "Rafi Pratama", jabatan: "WAKIL KETUA", kelas: "XII.3", peranSingkat: "Manajemen Produksi & Konten", isKetua: false }
];

const ANGGOTA_BIASA_DATA = [
  { nama: "Nabil Putra A", label: "ANGGOTA", kelas: "XI.1" },
  { nama: "Alya Putri", label: "ANGGOTA", kelas: "XI.4" },
  { nama: "Zahra Nabila", label: "ANGGOTA", kelas: "XI.2" },
  { nama: "Dimas Saputra", label: "ANGGOTA", kelas: "XI.6" },
  { nama: "Kayla Maharani", label: "ANGGOTA", kelas: "X.5" },
  { nama: "Fajar Nugroho", label: "ANGGOTA", kelas: "X.8" }
];

const VALID_TABS = ["beranda", "profil", "anggota"];
let activeTab = "beranda";

window.switchTab = function(tabName, updateHash = true) {
  if (!VALID_TABS.includes(tabName)) tabName = "beranda";
  activeTab = tabName;
  VALID_TABS.forEach(name => {
    const panel = document.getElementById(`tab-${name}`);
    if (panel) {
      if (name === tabName) panel.classList.remove("hidden");
      else panel.classList.add("hidden");
    }
  });
  document.querySelectorAll(".nav-tab-btn").forEach(btn => {
    const target = btn.getAttribute("data-tab-target");
    const isDesktopBtn = !btn.classList.contains("mobile-nav-link");
    const badge = btn.querySelector(".tab-badge");
    if (isDesktopBtn) {
      btn.className = target === tabName ? "nav-tab-btn px-4 py-2 rounded-full transition-all bg-smanti-pink text-smanti-black font-extrabold shadow-sm" : "nav-tab-btn px-4 py-2 rounded-full transition-all text-gray-300 hover:text-smanti-pink hover:bg-white/10 font-semibold";
    } else {
      if (target === tabName) {
        btn.classList.add("text-smanti-pink", "font-extrabold");
        btn.classList.remove("text-gray-200");
        if (badge) { badge.className = "tab-badge text-xs font-bold px-2.5 py-0.5 rounded-full bg-smanti-gradient text-white"; badge.textContent = "Aktif"; }
      } else {
        btn.classList.remove("text-smanti-pink", "font-extrabold");
        btn.classList.add("text-gray-200");
        if (badge) {
          const idxMap = { beranda: "01", profil: "02", anggota: "03" };
          badge.className = "tab-badge text-xs font-mono px-2 py-0.5 rounded-full text-smanti-pink/70";
          badge.textContent = idxMap[target] || "";
        }
      }
    }
  });
  closeMobileDrawer();
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (updateHash) history.replaceState(null, "", `#${tabName}`);
};

function getPodcastLogoHTML() {
  return `
    <svg viewBox="0 0 120 120" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="smantiTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FF2E93"/>
          <stop offset="50%" stop-color="#D91B74"/>
          <stop offset="100%" stop-color="#FF7043"/>
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="#FF2E93"/>
      <path d="M18 42 H102 V80 H92 L97 91 L82 80 H18 Z" fill="#FDF8F2" stroke="#141115" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M56 37 L59 31 L62 40 L65 28 L68 41 L71 33 L74 38" fill="none" stroke="#FF2E93" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="23" y="59" font-family="Plus Jakarta Sans, sans-serif" font-weight="900" font-size="17" fill="url(#smantiTextGrad)" letter-spacing="-0.5">POD</text>
      <text x="61" y="57" font-family="Plus Jakarta Sans, sans-serif" font-weight="800" font-size="10.5" fill="#FF7043">CAST</text>
      <text x="23" y="75" font-family="Plus Jakarta Sans, sans-serif" font-weight="900" font-size="18.5" fill="url(#smantiTextGrad)" letter-spacing="0.5">SMANTI</text>
    </svg>
  `;
}

function getSocialIconSVG(type) {
  const icons = {
    youtube: `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    instagram: `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    spotify: `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
    tiktok: `<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>`,
    default: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>`
  };
  return icons[type] || icons.default;
}

let toastTimeout;
function showToast(msg) {
  const box = document.getElementById("toast-box");
  const text = document.getElementById("toast-message");
  text.textContent = msg;
  box.classList.remove("opacity-0", "-translate-y-2");
  box.classList.add("opacity-100", "translate-y-0");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    box.classList.remove("opacity-100", "translate-y-0");
    box.classList.add("opacity-0", "-translate-y-2");
  }, 2800);
}

function initApp() {
  document.getElementById("navbar-logo-container").innerHTML = getPodcastLogoHTML();
  document.getElementById("hero-logo-container").innerHTML = getPodcastLogoHTML();
  document.getElementById("footer-logo-container").innerHTML = getPodcastLogoHTML();
  document.getElementById("periode-title").innerHTML = `Struktur Kepengurusan <span class="text-smanti-gradient">${SITE_CONFIG.periodeKepengurusan}</span>`;
  document.getElementById("footer-year").textContent = new Date().getFullYear();

  const activeSocials = SOCIAL_MEDIA_LINKS.filter(item => item.url && item.url.trim() !== "");
  document.getElementById("stat-total-members").textContent = PENGURUS_INTI_DATA.length + ANGGOTA_BIASA_DATA.length;
  document.getElementById("stat-total-socials").textContent = activeSocials.length;

  renderSocialLinks();
  renderPengurusInti();
  renderAnggotaBiasa();
  setupNavigation();

  const initialHash = window.location.hash.replace("#", "").toLowerCase();
  if (VALID_TABS.includes(initialHash)) {
    switchTab(initialHash, false);
  } else {
    switchTab("beranda", false);
  }
}

function renderSocialLinks() {
  const profilContainer = document.getElementById("social-links-profil");
  const activeSocials = SOCIAL_MEDIA_LINKS.filter(item => item.url && item.url.trim() !== "");
  profilContainer.innerHTML = activeSocials.map(soc => `
    <a href="${soc.url}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3.5 p-4 rounded-2xl bg-smanti-charcoal border border-white/15 hover:border-smanti-pink hover:bg-smanti-charcoalSoft transition-all group">
      <div class="w-11 h-11 rounded-xl bg-smanti-pink text-smanti-black group-hover:bg-smanti-gradient group-hover:text-white flex items-center justify-center shrink-0 transition-all font-bold">
        ${getSocialIconSVG(soc.iconType)}
      </div>
      <div class="min-w-0 flex-1">
        <p class="font-display font-bold text-sm text-white group-hover:text-smanti-pink transition-colors truncate">${soc.platform}</p>
        <p class="text-xs text-gray-400 truncate">${soc.handle}</p>
      </div>
    </a>
  `).join("");
}

function renderPengurusInti() {
  const grid = document.getElementById("pengurus-inti-grid");
  grid.innerHTML = PENGURUS_INTI_DATA.map((p) => `
    <div class="bg-smanti-cream rounded-[26px] p-4 border-2 border-smanti-black shadow-card text-smanti-black">
      <div class="relative aspect-[3/4] w-full rounded-[20px] overflow-hidden bg-smanti-pinkSoft border-2 border-smanti-black mb-4 flex flex-col justify-between p-4">
        <div class="flex items-center justify-between z-10">
          <span class="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-smanti-black text-smanti-pink">SMANTI</span>
          <span class="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-white border border-smanti-black">${p.kelas}</span>
        </div>
        <div class="my-auto mx-auto w-20 h-20 rounded-full bg-smanti-black shadow-md ring-4 ring-smanti-pink flex items-center justify-center text-smanti-pink font-extrabold text-2xl">
          ${p.nama.split(' ').map(n => n[0]).slice(0,2).join('')}
        </div>
      </div>
      <div class="mb-2 flex items-center justify-between gap-2">
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${p.isKetua ? 'bg-smanti-gradient text-white' : 'bg-smanti-black text-smanti-pink'}">
          <span>${p.jabatan}</span>
        </span>
      </div>
      <h4 class="font-display font-extrabold text-lg sm:text-xl text-smanti-black leading-snug">${p.nama}</h4>
      <p class="text-xs text-gray-600 font-medium mt-0.5">${p.peranSingkat}</p>
    </div>
  `).join("");
}

function renderAnggotaBiasa() {
  const grid = document.getElementById("anggota-biasa-grid");
  grid.innerHTML = ANGGOTA_BIASA_DATA.map((m) => `
    <div class="bg-smanti-cream rounded-[22px] p-2.5 sm:p-3 border-2 border-smanti-black shadow-sticker text-smanti-black flex flex-col">
      <div class="relative aspect-[3/4] w-full rounded-[16px] overflow-hidden bg-smanti-pinkSoft border border-smanti-black mb-3 flex flex-col justify-between p-2.5">
        <div class="flex items-center justify-between z-10">
          <span class="text-[8px] font-extrabold px-1.5 py-0.5 rounded bg-smanti-black text-smanti-pink">SMANTI</span>
          <span class="text-[10px] font-extrabold bg-white border border-smanti-black px-1.5 py-0.5 rounded-full">${m.kelas}</span>
        </div>
        <div class="my-auto mx-auto w-12 h-12 rounded-full bg-smanti-black border-2 border-smanti-pink flex items-center justify-center text-smanti-pink font-extrabold text-sm">
          ${m.nama.split(' ').map(n => n[0]).slice(0,2).join('')}
        </div>
      </div>
      <h4 class="font-display font-extrabold text-sm text-smanti-black truncate">${m.nama}</h4>
      <p class="text-[11px] font-semibold text-gray-600 truncate">Kelas ${m.kelas}</p>
    </div>
  `).join("");
}

function setupNavigation() {
  const toggleBtn = document.getElementById("menu-toggle-btn");
  const drawer = document.getElementById("mobile-drawer");
  const backdrop = document.getElementById("drawer-backdrop");

  toggleBtn.addEventListener("click", () => {
    drawer.classList.toggle("hidden");
    backdrop.classList.toggle("hidden");
  });

  backdrop.addEventListener("click", () => {
    drawer.classList.add("hidden");
    backdrop.classList.add("hidden");
  });

  document.querySelectorAll(".nav-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab-target");
      if (targetTab) switchTab(targetTab);
    });
  });

  document.getElementById("btn-share-web").addEventListener("click", () => {
    navigator.clipboard?.writeText(SITE_CONFIG.shareUrl);
    showToast("Tautan profil berhasil disalin!");
  });
}

function closeMobileDrawer() {
  document.getElementById("mobile-drawer").classList.add("hidden");
  document.getElementById("drawer-backdrop").classList.add("hidden");
}

window.addEventListener("DOMContentLoaded", initApp);
