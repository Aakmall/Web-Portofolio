# Panduan workspace portfolio Akmal

Dokumen ini berdasarkan pembacaan source workspace pada 1 November 2026. Periksa kembali file terkait sebelum mengubahnya; source aktual menjadi acuan jika dokumentasi tertinggal.

## 1. Gambaran umum dan batas perubahan

Portfolio pribadi Akmal Rizki Anapu, dengan fokus Backend Developer dan AI Enthusiast. Halaman utama menampilkan hero, capabilities/skills, selected projects, education/skills/work process, contact, dan footer. Ada halaman terpisah untuk detail project dan CV.

Identitas visual dan struktur yang sudah ada harus dipertahankan. Untuk penambahan project biasa, cukup perbarui data project dan tambahkan aset yang diperlukan. Jangan membangun ulang section Projects, navbar, hero, background, atau halaman detail.

Instruksi pengguna untuk tugas aktif menentukan cakupan pekerjaan. Hindari perubahan di luar cakupan, refactoring sambilan, pemindahan aset asli, atau perubahan dependency/configuration tanpa kebutuhan tugas. Saat tugas hanya dokumentasi, satu-satunya file yang boleh berubah adalah `AGENTS.md`; jangan menjalankan build atau dev server yang dapat menulis output/cache.

## 2. Teknologi dan konfigurasi

- Aplikasi memakai HTML, CSS biasa, dan JavaScript ES modules (`type: module`).
- Vite adalah dev server dan build tool. `package.json` mendeklarasikan `vite: ^5.4.0`; `package-lock.json` mengunci Vite 5.4.21, lockfile version 3. Engine Node yang dinyatakan paket Vite tersebut: `^18.0.0 || >=20.0.0`.
- Tidak ada React, Vue, Next.js, TypeScript, Tailwind, UI library, CSS preprocessor, atau router library pada aplikasi portfolio ini. React/Spring Boot/MySQL/Tailwind/JWT di data FlamingoShop merupakan teknologi project yang dipamerkan, bukan stack portfolio.
- Tidak ditemukan backend aplikasi, database, authentication, atau API project di source portfolio. `fetch()` di `src/main.js` digunakan untuk fallback pemuatan partial HTML.
- Dependency langsung hanya Vite sebagai dev dependency; dependency transitifnya mencakup esbuild, PostCSS, dan Rollup. Jangan mengedit `node_modules/`.
- `vite.config.js`: `base: './'`; build multi-page dengan input `index.html`, `cv.html`, dan `project.html`.
- Plugin lokal `section-html-includes` merakit komentar include menjadi HTML melalui `transformIndexHtml` pada dev/build. Perubahan file HTML mengirim full reload melalui `handleHotUpdate`.
- `.gitignore` mengabaikan `node_modules/`, `dist/`, dan `*.log`.
- Tidak ada `vercel.json` atau `.openai/hosting.json` di root yang diperiksa. Deployment aktual/provider tidak dapat disimpulkan hanya dari source ini.
- Tidak ada script test/lint yang dideklarasikan. Jangan mengklaim adanya test suite atau CI yang belum diperiksa.

## 3. Struktur folder dan file penting

```text
index.html                         Halaman portfolio dan urutan partial
project.html                       Kerangka halaman detail project
cv.html                            Isi halaman CV, ditulis langsung di HTML
package.json / package-lock.json   Script dan dependency terkunci
vite.config.js                     Build tiga halaman dan perakitan partial
README.md                          Dokumentasi lama dan baru yang bercampur
src/
  main.js                          Pemuatan partial dan inisialisasi halaman utama
  data/projects.js                 Satu sumber data card dan detail project
  styles/
    index.css                      Urutan import CSS halaman utama
    global.css                     Reset, token warna, layout, tombol, accessibility
    reading-cards.css              Override dan efek hover/focus permukaan card
  components/
    navigation/                    navigation.html, .css, .js
    background/                    background.html, .css, .js
    footer/                        footer.html, .css
  sections/
    hero/                          hero.html, .css, .js
    services/                      services.html, .css
    work/                          work.html, .css, .js
    about/                         about.html, .css
    contact/                       contact.html, .css
  pages/
    project/                       project.js dan project.css
    cv/                            cv.js dan cv.css
  assets/
    background/frames/             300 JPG: ezgif-frame-001.jpg sampai -300.jpg
    documents/CV no fix.docx        Dokumen CV asli untuk diunduh
public/
  images/projects/
    ai-coding-assistant/           Dua screenshot PNG dan README.txt
    e-commerce/                    Enam screenshot PNG FlamingoShop
dist/                              Output build yang diabaikan Git
node_modules/                      Dependency terpasang yang diabaikan Git
portoWeb/                          Folder kosong saat audit; bukan entry aplikasi
```

Seluruh file aplikasi yang ditemukan sudah dibaca: 8 partial HTML, 13 CSS, 8 JavaScript di `src/`, ditambah ketiga HTML root dan konfigurasi. Folder generated/dependency tidak menjadi sumber perubahan aplikasi.

## 4. Arsitektur komponen dan alur halaman

### Halaman utama

`index.html` memuat `src/styles/index.css` dan modul `src/main.js`. Delapan partial dimasukkan dalam urutan:

1. Background canvas.
2. Navbar.
3. Di dalam `main#scroll-container`: hero, services, work, about, contact, footer.

Sintaks include adalah `<!-- include:src/sections/work/work.html -->`. Jangan menggantinya dengan framework atau menyalin isi partial ke banyak file.

`loadSectionPartials()` mencari komentar include yang masih tersisa, melakukan fetch terhadap file terkait, memasukkannya melalui elemen `template`, lalu menunggu seluruh partial siap. Fallback ini mendukung static server seperti Live Server; saat Vite sudah merakit HTML, tidak ada partial yang perlu di-fetch.

Setelah itu `initPortfolio()` memanggil, berurutan: `initHero()`, `initProjects()`, `initNavigation()`, `initBackground()`. Inisialisasi bergantung pada ID/class dari partial. Error inisialisasi dicatat ke console dan menambahkan pesan bantuan menjalankan Vite.

### Navbar dan navigasi

- `navigation.html`: logo gembok inline SVG dan teks AKMAL, Home `#hero`, Skills `#services`, Projects `#work`, About `#about`, Contact `#contact`, serta tombol Contact Me.
- Navbar memakai `position: sticky; top: 0; z-index: 100`, bukan fixed. Desktop memakai grid `1fr auto 1fr`; min-height 77px.
- `navigation.js` menambahkan `.is-scrolled` saat `window.scrollY > 0`; background navbar berubah dari transparan menjadi `#090909`.
- Section aktif adalah `.section` terakhir yang sudah melewati posisi scroll + tinggi navbar + 24px. Class `.active` dan `aria-current="location"` mengikuti hash link.
- Scroll listener pasif dan update dijadwalkan dengan `requestAnimationFrame`. `ResizeObserver` navbar memperbarui `scroll-padding-top` menjadi tinggi navbar + 20px.
- Pertahankan ID anchor dan perhitungan offset agar heading tidak tertutup navbar, termasuk layout dua baris pada mobile.

### Hero

- `#hero`: status Available for Work, headline Backend Developer, perkenalan, specialty Backend Developer | AI Enthusiast, tombol View Projects dan View CV, serta nama Akmal berukuran besar.
- Susunan akhir desktop memakai flex dengan dua sisi; deklarasi grid di awal `hero.css` telah dioverride di bagian berikutnya.
- View Projects adalah anchor `#work`. `initHero()` memastikan View CV membuka `./cv.html` di tab yang sama, tanpa atribut download/target.
- Nama menggunakan `--name-size: clamp(84px, 24.5vw, 310px)`, alpha warna `--name-opacity: .55`, dan opacity tambahan `--name-scroll-opacity`.
- Nama memudar sesuai scroll sampai progress 70% tinggi hero; perhitungan mempertimbangkan posisi hero dan tinggi navbar. Ada observer/listener scroll dan resize, tanpa animation library.

### Skills / Capabilities

- Menu Skills mengarah ke `#services`, bukan ke skills cluster dalam About.
- HTML statis berisi empat card: Backend Applications, AI-powered Applications, Web Development, Development & Deployment.
- Tiap card memakai `.glass-card`, nomor, judul, deskripsi, dan `.card-tags`.
- Tidak ada JavaScript khusus services. Desktop 4 kolom; <=1000px 2 kolom, dan tetap 2 kolom pada <=640px.

### Selected Projects

- `#work` menyediakan heading, tautan profil GitHub, track kosong `#projects-list`, status posisi `#project-position`, panah Previous/Next, dan pesan noscript.
- Card dan navigasi carousel dibuat oleh `work.js` dari data bersama. Detail lengkap ada di halaman terpisah; lihat bagian 6.

### About

- `#about`: tiga area Education & Skills, Work Process, dan kutipan/signature.
- Pendidikan Universitas Klabat dan undergraduate thesis; skills cluster Java, SQL, Git, Linux, Docker, Jenkins, CI/CD, Backend Development.
- Lima tahap proses: Discover, Research, Strategy, Build, Deliver. Nomor dalam lingkaran merah dihubungkan garis putus-putus.
- Grid desktop `1.05fr 1.05fr .9fr`; tablet dua kolom dengan kutipan sepanjang baris; mobile satu kolom.
- Tidak ada JavaScript khusus. Beberapa pemisah tanggal di `about.html` saat audit berisi karakter `?`; catat sebagai kondisi source, jangan memperbaikinya di luar tugas yang diminta.

### Contact

- `#contact`: heading Let's Work Together, ajakan kolaborasi, link kembali ke hero, email melalui `mailto:`, GitHub, LinkedIn, lokasi, dan CTA email.
- Tidak ada form submit/contact API.
- Ilustrasi laptop, ponsel, dan mug adalah elemen HTML + CSS (`.workspace-art`), bukan file gambar atau screenshot. Atribut `role="img"` dan `aria-label` memberi deskripsi ilustrasi.
- Desktop dua kolom `.8fr 1.5fr`; <=1000px `1fr 1.3fr`; <=640px satu kolom. Panel kode dekoratif disembunyikan pada <=1000px.

### Footer

- `footer.html`: copyright 2026 Akmal dan Back to Top `#hero`.
- Flex horizontal, teks abu-abu, padding `22px 5%`, background transparan. Ukuran akhir teks 12px karena override paling bawah stylesheet.

### Halaman CV

- `cv.html` berdiri sendiri; tidak memakai partial/navbar utama atau `src/styles/index.css`.
- Berisi ringkasan, pengalaman project, pendidikan, kemampuan, serta link kontak. Isi ini tidak otomatis disinkronkan dengan `projects.js` atau DOCX.
- `src/pages/cv/cv.js` mengubah href download menggunakan `new URL('../../assets/documents/CV no fix.docx', import.meta.url)` agar Vite menangani aset development/production.
- CSS CV memiliki tema gelap, container resume max-width 896px, navbar max-width 960px, aksen oranye, aturan mobile <=640px, dan `@media print` untuk tampilan putih/cetak.

## 5. Identitas visual dan cascade CSS

### Warna, typography, spacing

| Elemen | Nilai/aturan aktual |
| --- | --- |
| Background global | `#090909`; section dan footer transparan |
| Teks utama | `#e9e9e9`, dengan variasi putih/abu-abu per komponen |
| Token aksen | `--red: #dc3038` |
| Teks muted / separator | `--muted: #999`, `--line: #292929` |
| Navbar | Aksen `#e42e3b`; border tombol `#8f2530` |
| Hero CTA/status | Oranye `#ff792d`, hover `#ff9456`; lingkaran panah putih |
| Font global | `Inter, Arial, sans-serif` |
| Lebar halaman utama | `main` max-width 1440px, margin auto |
| Section umum | Padding `56px 5%`, border-bottom 1px, scroll-margin-top 10px |
| Section mobile <=640px | Padding `36px 6%`, dengan override khusus hero/about/contact |
| Heading umum section | Services 30px; Work/About 22px; Contact 30px |
| Teks pendukung akhir | Umumnya 14-15px; tag sekitar 11px; metadata project 12px |

Inter dimuat lewat Google Fonts hanya di `index.html`, weight 300-900. HTML detail project dan CV tidak mengimpor Google Fonts; CSS tetap menyebut Inter dan dapat memakai fallback lokal Arial/sans-serif. Tidak ditemukan file font lokal atau paket icon. Logo adalah inline SVG; panah/icon lain menggunakan karakter/HTML entities. Quote memakai Georgia dan signature memakai Brush Script MT/cursive.

Ukuran hero role desktop `clamp(27px, 3.5vw, 48px)`; specialty akhir 17px (mobile 16px). Banyak heading/strong/nomor diberi opacity `.88` oleh selector `:where(...)` di global CSS. Jangan menormalkan opacity/warna tanpa permintaan desain.

### Border, radius, hover, dan urutan import

`src/styles/index.css` mengimpor: global -> navigation -> hero -> services -> work -> about -> contact -> footer -> background -> reading-cards. `reading-cards.css` harus tetap dipertimbangkan karena berada terakhir.

- Style utama ringan, separator tipis, card tidak memakai shadow dekoratif besar.
- `.project-cover`: border `1px solid #ffffff50`, radius 2px, background `#08080a`, hover border merah dengan transisi .2s.
- Tombol navbar berbentuk persegi; tombol hero berbentuk pill; panah carousel lingkaran 44px. Jangan menyeragamkan radius antarjenis tombol.
- `.reading-cards.css` memberi `.glass-card` dan `.project-card` pseudo-element permukaan baca: inset -10px (mobile -7px), radius 12px, background `rgb(8 8 12 / 10%)`, blur 3px, mask vertikal, opacity transition 220ms.
- Hover permukaan baca aktif hanya untuk `(hover: hover) and (pointer: fine)`; `focus-within` juga mengaktifkannya. Layer memakai isolation/z-index dan pointer-events none.
- Override border transparan dan `box-shadow: none` berlaku pada selector card/kolom yang disebut di file tersebut. `.project-cover` tidak termasuk selector penghilangan border itu dan tetap berbatas.
- Selector `.project-details` dan `.project-preview` masih ada pada CSS reading cards, tetapi renderer saat ini tidak membuat elemen tersebut. Jangan menyimpulkan fitur accordion/modal masih aktif dari selector sisa.
- Ada deklarasi CSS berulang dan override ukuran teks di bagian bawah beberapa file. Baca sampai akhir; jangan merapikan, menghapus, atau menyatukannya saat hanya menambah konten.
- Link/tombol memiliki `:focus-visible`; pertahankan outline dan akses keyboard. Global reduced motion mematikan CSS transition dan smooth anchor scrolling. Jangan mengklaim seluruh animasi JS sudah menghormati reduced motion; background dan fade hero tidak memeriksanya.

### Background animasi

- `background.html` hanya canvas `#animation-canvas`, `aria-hidden="true"`.
- Canvas fixed fullscreen, z-index 0, tidak menangkap pointer; `#scroll-container` relative z-index 1; navbar z-index 100.
- Terdapat tepat 300 JPG bernama berurutan, sekitar 6.37 MB total. Sampel frame awal/tengah/akhir memperlihatkan portrait gelap dengan perubahan arah kepala.
- `background.js` membentuk URL frame dengan `new URL(..., import.meta.url)`, memuatnya sebagai `Image`, dan menggambar dengan skala cover (`Math.max`) serta centering.
- Target frame dihitung dari rasio scroll seluruh dokumen. Easing `current += difference * .15` melalui requestAnimationFrame, berhenti saat target tercapai; device pixel ratio dibatasi maksimal 2.
- Scroll/resize dan ResizeObserver container menyelaraskan animasi saat panjang konten berubah. Menambah konten dapat mengubah distribusi frame sepanjang halaman secara alami.
- Pertahankan nama, urutan, aset, layering, dan perilaku scroll ini. Jangan menggantinya dengan gambar statis/video sebagai bagian dari tugas konten project.

## 6. Sistem Projects secara rinci

### Data bersama dan urutan

`src/data/projects.js` mengekspor array `projects`. Array ini diimpor oleh `src/sections/work/work.js` dan `src/pages/project/project.js`. Isi minimum setiap objek:

```js
{
  id: 'unique-project-slug',
  published: true,
  title: 'Project title',
  category: '',
  period: '',
  description: '',
  features: [],
  tags: [],
  images: [
    { src: 'images/projects/project-slug/cover.png', alt: 'Describe the screenshot', caption: 'Screenshot caption' },
  ],
  links: { demo: '', repository: '' },
}
```

- `id` harus unik dan stabil: dipakai sebagai ID card dan query halaman detail. Jangan menggantinya hanya karena judul berubah.
- `published: true` menampilkan project; false menyembunyikannya dari card dan pencarian halaman detail. Ini bukan kontrol akses: modul data tetap bisa disajikan ke publik.
- `features`, `tags`, `images` harus selalu array dan `links` harus objek, termasuk bila kosong; renderer membaca `.length`, `images[0]`, dan properti link secara langsung.
- Nomor menggunakan indeks array SETELAH filter published: `String(index + 1).padStart(2, '0')`. Tidak ada field nomor manual.
- Urutan saat audit: 01 AI Coding Assistant; 02 FlamingoShop; 03 Manajemen Stok Apotek; 04 Stunting-Care. Seluruhnya published. Pertahankan urutan ini kecuali pengguna meminta perubahan.
- AI Coding Assistant berisi 2 screenshot, 4 fitur, 3 tag; FlamingoShop 6 screenshot, 7 fitur, 6 tag. Apotek dan Stunting-Care masih tanpa deskripsi/gambar/fitur/tag di data project.
- Perubahan judul/kategori/gambar pertama memengaruhi card dan halaman detail sekaligus. Teks panjang boleh membungkus sesuai CSS yang ada; jangan mengubah ukuran card untuk mengakomodasinya tanpa permintaan.

### Card dan carousel

- `initProjects()` mengganti isi track dengan card hasil `createProject()`.
- Card berupa `article.project-card`, link cover, badge nomor, judul uppercase lewat CSS, kategori, dan link View Project.
- Gambar pertama `images[0]` adalah cover; URL di-resolve relatif `document.baseURI`.
- Cover area tetap `aspect-ratio: 1.45`; gambar `width/height:100%` dan `object-fit:contain` sehingga gambar lengkap proporsional, dengan ruang kosong bila rasio berbeda. Jangan mengganti ke cover/crop tanpa permintaan.
- Gambar memakai lazy loading, async decoding, atribut width 1920/height 976. File kosong atau error memakai placeholder `Gambar belum ditambahkan`.
- Track adalah CSS grid horizontal (`grid-auto-flow: column`), bukan grid baris yang membungkus. Gap 24px, scroll horizontal, scroll snap mandatory, scrollbar tipis.
- Desktop >1000px: lebar tiap card `(100% - 2 * gap) / 3`; <=1000px dua card; <=640px satu card. Jumlah project tambahan memperpanjang track, bukan mengubah jumlah kolom atau mengecilkan semua card.
- Panah menggeser satu lebar card + gap; disabled pada batas track. ArrowLeft/ArrowRight bekerja ketika track sendiri difokuskan (`tabindex=0`).
- Status posisi menghitung card yang beririsan viewport track melalui bounding rect dan menampilkan rentang/total, bukan halaman pagination tetap. Status menggunakan aria-live polite.
- ResizeObserver dan scroll listener memperbarui kontrol. Scroll panah memakai smooth, atau instant saat prefers-reduced-motion aktif.

### Halaman detail

- Cover dan View Project menuju `./project.html?id=` + `encodeURIComponent(project.id)`, di tab yang sama. Tidak ada modal, accordion, atau View More aktif.
- `project.html` memuat CSS/JS sendiri. Navbar detail hanya Back to projects `./index.html#work` dan GitHub; tidak memakai navbar utama/background canvas.
- `project.js` membaca `URLSearchParams(location.search)`, mencari ID yang published, lalu mengisi `main#project-page`. ID salah/unpublished menampilkan Project not found; navbar Back to projects tetap tersedia.
- Header memuat category (fallback PROJECT), title, period bila terisi, dan tombol link.
- Overview memuat About this project, description (fallback `Deskripsi proyek belum ditambahkan.`), tag bila ada, dan Features bila array berisi.
- Description dirender sebagai satu paragraf textContent; tidak mendukung HTML/Markdown atau pemisahan paragraf khusus.
- Gallery menampilkan SEMUA gambar termasuk cover, masing-masing dalam figure, link ukuran penuh, dan figcaption. Screenshot dibuka tab baru melalui `_blank` + `noopener noreferrer`; gambar error mengganti link dengan teks `Gambar belum tersedia.`.
- Detail tidak membangun konten dari nama file atau repository secara otomatis; semua teks berasal dari data yang diisi.
- Detail CSS: main/nav max-width 1120px; main padding `60px 30px`, header margin-bottom 48px; h1 `clamp(34px,5vw,64px)`, h2 22px; overview max-width 760px, body line-height 1.7, deskripsi 16px.
- Screenshot detail full-width dan height auto, border 1px `#333`, radius 6px. Gallery memiliki margin-top 48px, border-top, padding-top 32px. Aksen detail `#ee5960`; background `#090909`, teks utama `#e8e8e8`.
- Link dan tag flex-wrap; <=640px main padding `36px 20px`, nav `20px`.

### Repository dan demo

- `links.repository` terisi tanpa backendRepository: tombol GitHub Repository.
- `links.repository` kosong: fallback GitHub Profile menuju `https://github.com/Aakmall`.
- `links.backendRepository` opsional: tombol utama dilabeli GitHub Frontend dan tombol tambahan GitHub Backend ditampilkan. Untuk project dua repository, isi kedua URL tersebut; jangan hanya mengisi backendRepository.
- `links.demo` terisi: tombol Live Demo tambahan. Kosong tidak menampilkan tombol demo.
- Semua link eksternal detail menggunakan `_blank` dan `rel="noopener noreferrer"`.
- FlamingoShop saat audit: frontend `https://github.com/Aakmall/project_backend_frontend_g4`, backend `https://github.com/Aakmall/project_backend_g4`; demo kosong.

## 7. Cara menambahkan atau melengkapi project

1. Baca data terbaru dan tentukan project yang dimaksud melalui ID. Bila melengkapi project yang sudah ada, edit objeknya; jangan membuat duplikat dengan ID baru.
2. Gunakan informasi pengguna atau bukti project yang tersedia untuk judul, kategori, periode, deskripsi, teknologi, fitur, dan URL. Jangan mengarang tanggal, stack, demo, repository, atau fitur dari dugaan. Field opsional dapat kosong sambil meminta informasi yang diperlukan.
3. Untuk project baru, tambahkan satu objek ke array dengan struktur lengkap di bagian 6. `published: true` bila project harus terlihat. Tambahkan di akhir secara default agar urutan project yang sudah diminta tidak berubah, kecuali ada instruksi penempatan khusus.
4. Simpan screenshot pada `public/images/projects/<folder-project>/`. Pilih screenshot yang paling representatif sebagai elemen pertama `images`; masukkan screenshot tambahan pada array yang sama.
5. Isi src, alt, caption tiap gambar dan link yang benar. Gunakan `backendRepository` hanya bila ada dua repository frontend/backend.
6. Biarkan work.js/project.js/CSS yang ada melakukan rendering. Penambahan konten biasa tidak memerlukan card baru, stylesheet, section, atau halaman HTML khusus.
7. Periksa urutan published, nomor, semua path gambar, label/link repository, isi detail, dan perilaku desktop/tablet/mobile. Periksa project lama tetap sama.
8. Ubah renderer bersama hanya jika kebutuhan data baru memang tidak didukung struktur sekarang. Batasi perubahan, gunakan helper/komponen yang ada, dan periksa perilaku project dengan data lama/kosong.

## 8. Aturan gambar dan aset

- File dalam `public/` diakses tanpa awalan `public/`: gunakan `images/projects/e-commerce/Flamingo-KoleksiProduk1.png`, bukan path drive Windows atau path ke `src/assets`.
- Pertahankan path relatif yang digunakan renderer (`new URL(image.src, document.baseURI)`); perhatikan case nama file pada hosting.
- Aset public disalin ke output build tanpa penggantian nama oleh pipeline public Vite. Aset di src memakai import/new URL agar bundler dapat menyertakannya.
- Jangan menghapus, memindahkan, mengganti nama, menimpa, atau mengedit screenshot asli hanya untuk menyesuaikan preview. Gunakan aturan proporsi CSS yang sudah ada.
- Sertakan alt yang mendeskripsikan isi gambar serta caption yang akurat. Jangan mengklaim fitur yang tidak terlihat pada caption screenshot tertentu.
- Jangan memperkenalkan carousel galeri, crop, kompresi agresif, atau image library untuk penambahan screenshot biasa.
- Screenshot saat audit: `unklab-aicode1.png`, `unklab-aicode2.png`; FlamingoShop: `Flamingo-KoleksiProduk1.png` (cover), `Beranda-FlamingoShop.png`, `Flamingo-KoleksiProduk2.png`, `Flamingo-HalamanLoginAdmin.png`, `Flamingo-HalamanAdmin.png`, `Flamingo-HalamanAdmin2.png`.
- Frame background merupakan aset terpisah dari screenshot project. Jangan mencampurkan folder/penomorannya.
- Dokumen CV asli dipertahankan. Isi CV HTML tidak otomatis mengikuti DOCX.

## 9. Responsive design dan accessibility

| Area | Desktop | Tablet / <=1000px | Mobile |
| --- | --- | --- | --- |
| Navbar | Grid tiga bagian | Tetap sampai >700px | <=700px logo/CTA baris pertama, nav links baris kedua; tanpa hamburger |
| Hero | Dua sisi flex | Tetap sampai >640px | <=640px kolom; nama 23.2vw, min-height menyesuaikan |
| Capabilities | Empat kolom | Dua kolom | <=640px tetap dua kolom, gap/teks disesuaikan |
| Projects | Tiga card dalam track | Dua card | <=640px satu card, tetap horizontal scroll |
| About | Tiga kolom | Dua kolom + kutipan full-width | <=640px satu kolom |
| Contact | Dua kolom | Rasio kolom berubah; code-window hilang | <=640px satu kolom |
| Detail project | Maksimal 1120px | Mengikuti lebar tersedia | <=640px padding diperkecil; link/tag wrap |
| CV | Resume maksimal 896px | Mengikuti lebar tersedia | <=640px heading entry menjadi kolom |

Jangan menyeragamkan breakpoint semua komponen. Pertahankan touch target 44px pada kontrol Projects, focus-visible, aria-label, aria-live, label gambar, heading semantics, dan pesan noscript. Judul panjang harus mengikuti wrapping saat ini, bukan mengecilkan seluruh layout. Periksa tidak ada overflow halaman; overflow horizontal track Projects memang disengaja.

## 10. Standar coding dan aturan modifikasi

- Gunakan ES modules, fungsi init per area interaktif, const/let, dan pola helper DOM `element()`/`externalLink()` yang sudah ada.
- Data project berupa objek JavaScript dengan single-quoted strings, array, dan trailing comma; pertahankan format sekitar dan encoding UTF-8. HTML entities/Unicode yang ada jangan dirusak oleh encoding shell.
- Renderer mengisi teks melalui `textContent`; jangan menggantinya dengan interpolasi HTML untuk data project. `template.innerHTML` yang ada digunakan khusus partial HTML lokal.
- Pertahankan pemisahan konten/data, rendering JavaScript, serta CSS per section. Tidak perlu dependency/framework baru untuk menambah project.
- Jangan mengubah ID/class yang menjadi kontrak HTML-JS-CSS atau anchor URL lama tanpa kebutuhan eksplisit.
- Jangan menyalin style detail ke halaman utama atau sebaliknya; keduanya memiliki stylesheet dan layout tersendiri.
- Gunakan token/class yang ada dan periksa cascade sebelum menambah aturan. Hindari global selector baru yang berdampak pada section lain.
- Jangan mengubah navbar, hero, background, font/warna/tema, geometri card, hover, animasi, dan susunan responsif karena tugas penambahan konten project.
- Jangan mengedit `dist/` langsung. Jangan mengubah `package.json`, lockfile, atau konfigurasi deployment untuk tugas data/gambar.
- Periksa git status/diff sebelum dan sesudah; pertahankan perubahan pengguna yang sudah ada. Jangan melakukan reset atau membersihkan file pengguna.
- README memuat catatan versi lama: setProjects/View More/detail inline/draft lama tidak mencerminkan renderer saat ini. README screenshot AI juga menyebut nama contoh home/editor yang berbeda dari data aktual. Gunakan source dan path yang benar-benar ada.

## 11. Menjalankan dan memeriksa website

Script yang tersedia:

```text
npm run dev       # Vite di http://127.0.0.1:3000 (dapat memilih port lain jika sibuk)
npm run build     # Membangun ketiga halaman dan aset ke dist/
npm run preview   # Preview output build yang sudah dibuat
```

Dependency sudah tersedia di workspace audit. `npm install` adalah langkah penyiapan jika benar-benar diperlukan; jangan menjalankannya untuk perubahan konten/dokumentasi ketika dependency sudah ada. `npm run build` menulis ulang output dist dan dev server dapat menulis cache; jangan menjalankannya pada tugas yang secara eksplisit hanya mengizinkan satu file dokumentasi berubah.

Website perlu HTTP server untuk ES modules/fetch; jangan membuka lewat `file://`. Live Server didukung fallback partial, tetapi Vite adalah workflow utama. `npm run preview` tidak melakukan build otomatis. Deploy hasil `dist/` melalui workflow hosting pengguna yang memang tersedia; jangan menganggap tugas lokal sebagai izin mempublikasikan situs baru.

Pemeriksaan yang sesuai setelah perubahan aplikasi yang diizinkan:

1. `git diff --check` serta review diff untuk memastikan cakupan.
2. Periksa sintaks JavaScript yang disentuh; verifikasi ID unik, bentuk data, dan seluruh path screenshot.
3. Jalankan `npm run build` untuk perubahan aplikasi/aset bila penulisan output diizinkan. Tidak tersedia script `test` atau `lint` bawaan.
4. Preview halaman utama, `project.html?id=<id>`, tombol kembali, dan CV; periksa console/network bila akses browser tersedia.
5. Periksa navbar aktif/anchor offset; carousel panah, scroll dan keyboard; cover/gallery error fallback; repo frontend/backend/demo; CV dan download.
6. Periksa ukuran di sekitar breakpoint 1000px, 700px, dan 640px, serta mobile sempit. Periksa focus dan reduced motion sesuai dukungan kode yang ada.
7. Laporkan pemeriksaan aktual dan batasannya. Jangan menyatakan browser QA/deployment berhasil berdasarkan build saja.

### Cakupan verifikasi audit ini

Pembacaan dilakukan terhadap seluruh source HTML/CSS/JS, konfigurasi, package/lockfile, README, inventory aset, dan folder root. Sintaks seluruh JavaScript source serta vite.config.js diperiksa dengan `node --check`; ID project unik, file screenshot tersedia, delapan include tersedia, anchor lokal valid, dan urutan 300 frame lengkap. Sampel background awal/tengah/akhir dilihat secara langsung; screenshot project juga telah diperiksa pada pekerjaan sebelumnya dalam sesi ini.

Tidak dilakukan build/dev server atau instalasi pada audit ini untuk menjaga batas hanya `AGENTS.md` yang berubah. Tidak ada verifikasi browser langsung baru, pengukuran computed style pada perangkat nyata, audit internal dependency node_modules, pemeriksaan isi DOCX, atau verifikasi layanan hosting/repository eksternal. Uraian responsive/hover/animasi berdasarkan implementasi CSS/JS dan referensi screenshot pengguna, bukan klaim hasil render ulang seluruh halaman.
