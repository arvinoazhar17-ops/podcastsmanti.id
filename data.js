/**
 * Database Episode & Kru Podcast - podcastsmanti.id
 * Edit array di bawah ini untuk menambah episode baru atau mengubah profil host.
 */

const PODCAST_EPISODES = [
  {
    id: "ep-05",
    number: "EP. 05",
    title: "Antara Ekspektasi Kelas XI, Organisasi, dan Tidur yang Terlambat",
    category: "Obrolan Santai",
    date: "08 Nov 2026",
    duration: "34:18",
    featured: true,
    cover: "assets/images/cover-featured.jpg",
    audioUrl: "assets/audio/ep-05.mp3",
    guests: "Host: Raka & Nadya • Tamu: Pengurus OSIS",
    excerpt: "Bincang santai bareng pengurus OSIS dan tim kreatif soal gimana cara membagi waktu tanpa kehilangan kewarasan.",
    description:
      "Masuk tahun kedua di SMA sering kali jadi fase paling padat: tugas mulai menumpuk, kepanitiaan jalan terus, dan persiapan masa depan mulai menghantui. Di episode kelima ini, kita ngobrol jujur tentang realita manajemen waktu anak organisasi dan trik bertahan hidup di jam-jam rawan ngantuk.",
    timestamps: [
      { time: "00:00", label: "Intro & Kabar Minggu Ini" },
      { time: "05:40", label: "Mitos 'Anak Organisasi Pasti Keteteran Pelajaran'" },
      { time: "16:15", label: "Cara Menolak Tugas Tambahan Tanpa Rasa Bersalah" },
      { time: "27:50", label: "Pesan Buat Adik Kelas yang Baru Gabung Ekskul" }
    ]
  },
  {
    id: "ep-04",
    number: "EP. 04",
    title: "Dari Bangku Belakang ke Kampus Impian: Cerita Alumni",
    category: "Inspirasi & Alumni",
    date: "01 Nov 2026",
    duration: "41:05",
    featured: false,
    cover: "assets/images/ep-04.jpg",
    audioUrl: "assets/audio/ep-04.mp3",
    guests: "Host: Raka • Tamu: Kak Dimas (Alumni '24)",
    excerpt: "Perjalanan mengubah kebiasaan menunda belajar di semester akhir hingga akhirnya lolos seleksi perguruan tinggi negeri.",
    description:
      "Nggak semua siswa berprestasi itu rajin sejak hari pertama masuk SMA. Kak Dimas berbagi cerita realistis tentang titik baliknya di kelas XII, strategi tryout yang efektif, dan kesalahan fatal yang sebaiknya dihindari saat memilih jurusan.",
    timestamps: [
      { time: "00:00", label: "Perkenalan & Nostalgia Kantin SMANTI" },
      { time: "09:20", label: "Titik Balik di Semester Ganjil Kelas XII" },
      { time: "22:45", label: "Strategi Belajar Efektif vs Belajar Lama" },
      { time: "35:10", label: "Q&A dari Pertanyaan Followers" }
    ]
  },
  {
    id: "ep-03",
    number: "EP. 03",
    title: "Overthinking Jam 12 Malam Soal Jurusan Kuliah & Masa Depan",
    category: "Keresahan Pelajar",
    date: "25 Okt 2026",
    duration: "29:42",
    featured: false,
    cover: "assets/images/ep-03.jpg",
    audioUrl: "assets/audio/ep-03.mp3",
    guests: "Host: Nadya & Farhan",
    excerpt: "Kenapa sih makin mendekati kelulusan, pertanyaan 'mau jadi apa nanti?' terasa makin berat dijawab?",
    description:
      "Sebuah episode reflektif yang merangkum puluhan curhatan anonim dari kotak suara podcastsmanti.id. Kita membahas tekanan ekspektasi keluarga, fenomena FOMO pencapaian teman sebaya, dan langkah kecil untuk mengenali minat diri sendiri.",
    timestamps: [
      { time: "00:00", label: "Membaca Curhatan Anonim Terpilih" },
      { time: "08:15", label: "Ikut Passion atau Ikut Peluang Kerja?" },
      { time: "19:30", label: "Berhenti Membandingkan Timeline Hidup Orang Lain" }
    ]
  },
  {
    id: "ep-02",
    number: "EP. 02",
    title: "Di Balik Layar Pensi: Drama H-1, Sound System, & Kopi Sachet",
    category: "Behind The Scenes",
    date: "18 Okt 2026",
    duration: "37:50",
    featured: false,
    cover: "assets/images/ep-02.jpg",
    audioUrl: "assets/audio/ep-02.mp3",
    guests: "Host: Farhan • Tamu: Panitia Acara Sekolah",
    excerpt: "Cerita seru dan chaos di balik panggung acara tahunan sekolah yang nggak pernah kelihatan dari kursi penonton.",
    description:
      "Penonton cuma lihat panggung yang megah dan lampu sorot yang keren. Tapi di balik itu semua, ada tim logistik yang lari-larian cari kabel, negosiasi izin yang alot, sampai momen haru saat acara selesai dengan sukses.",
    timestamps: [
      { time: "00:00", label: "Awal Mula Konsep Acara Terbentuk" },
      { time: "11:10", label: "Insiden Teknis Paling Menegangkan H-2 Jam" },
      { time: "28:00", label: "Pelajaran Terbesar Setelah Acara Usai" }
    ]
  },
  {
    id: "ep-01",
    number: "EP. 01",
    title: "Kenapa Kita Bikin Podcast Ini? (Episode Perdana)",
    category: "Obrolan Santai",
    date: "11 Okt 2026",
    duration: "22:14",
    featured: false,
    cover: "assets/images/ep-01.jpg",
    audioUrl: "assets/audio/ep-01.mp3",
    guests: "Tim Inti podcastsmanti.id",
    excerpt: "Perkenalan kru, visi ruang dengar pelajar, dan bocoran segmen seru yang bakal hadir setiap minggunya.",
    description:
      "Selamat datang di episode perdana podcastsmanti.id! Di sini kami bercerita tentang bagaimana ide sederhana dari obrolan istirahat akhirnya berubah menjadi ruang produksi audio mandiri bagi warga SMANTI.",
    timestamps: [
      { time: "00:00", label: "Salam Pembuka & Perkenalan Host" },
      { time: "06:30", label: "Kenapa Memilih Format Audio Podcast?" },
      { time: "15:45", label: "Cara Kirim Ide Topik & Jadi Bintang Tamu" }
    ]
  }
];

const PODCAST_HOSTS = [
  {
    name: "Raka Pratama",
    role: "Lead Host & Producer",
    bio: "Suka memancing obrolan mendalam soal mimpi, kampus, dan dinamika organisasi.",
    avatar: "assets/images/host-raka.jpg"
  },
  {
    name: "Nadya Putri",
    role: "Co-Host & Script Editor",
    bio: "Pendengar yang baik untuk topik keresahan pelajar dan cerita keseharian.",
    avatar: "assets/images/host-nadya.jpg"
  },
  {
    name: "Farhan Kamil",
    role: "Audio Engineer & Creative",
    bio: "Memastikan kualitas vokal tetap jernih dan meracik atmosfer suara tiap episode.",
    avatar: "assets/images/host-farhan.jpg"
  }
];
