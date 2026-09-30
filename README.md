# Portfolio Akmal

## Menjalankan proyek

- `npm install`: memasang dependensi.
- `npm run dev`: membuka server pengembangan di http://127.0.0.1:3000.
- `npm run build`: menghasilkan website siap hosting di `dist/`.
- `npm run preview`: memeriksa hasil build.

Edit file di `src/`, bukan `dist/`. Folder dist dibuat ulang saat build.

## Peta file

| Bagian | Lokasi | Yang dapat diubah |
| --- | --- | --- |
| Hero | src/sections/hero/ | Teks pengantar, nama, tombol proyek/CV, ukuran tulisan |
| Services | src/sections/services/ | Layanan dan kartu kemampuan |
| Work | src/sections/work/ | Preview proyek, detail, tombol buka/tutup |
| About | src/sections/about/ | Pendidikan, skills, proses kerja, kutipan |
| Contact | src/sections/contact/ | Kontak dan mockup perangkat |
| Navigation | src/components/navigation/ | Menu dan penanda section aktif |
| Footer | src/components/footer/ | Copyright dan tautan kembali ke atas |
| Background | src/components/background/ | Canvas dan animasi mengikuti scroll |
| Gambar animasi | src/assets/background/frames/ | 300 frame asli, urut berdasarkan nama |
| CV | src/assets/documents/ | Dokumen CV yang ditautkan dari hero |
| Gaya bersama | src/styles/global.css | Font, warna, tombol bersama, layout section |
| Urutan stylesheet | src/styles/index.css | Import CSS global dan komponen |
| Inisialisasi | src/main.js | Menjalankan fungsi setiap komponen |

Setiap section memiliki file HTML untuk konten dan CSS untuk tampilannya. JavaScript hanya ditambahkan pada bagian yang memiliki interaksi.

## Mencari fungsi

- `initHero` di hero.js: menghubungkan tombol CV ke aset dokumen.
- `initProjects` / `setProjects` di work.js: membuka dan menutup detail proyek.
- `initNavigation` / `updateActiveNav` di navigation.js: menandai menu sesuai posisi scroll.
- `initBackground` di background.js: memuat frame dan memasang event animasi.
- `drawFrame`: menggambar frame dengan ukuran cover.
- `animateBackground`: menghaluskan perpindahan frame.
- `syncBackgroundScroll`: menghitung frame dari posisi scroll.
- `resizeBackground`: menyesuaikan resolusi canvas.

## Menambah section

1. Buat folder di src/sections/ beserta HTML dan CSS.
2. Tambahkan penanda include di index.html seperti section lainnya.
3. Import CSS-nya di src/styles/index.css.
4. Jika perlu interaksi, buat fungsi init dan panggil di src/main.js.

Vite menyatukan partial HTML melalui vite.config.js, sehingga HTML produksi tetap berisi seluruh konten. Gunakan server Vite untuk preview, bukan membuka index.html langsung melalui file explorer.

## Preview melalui Live Server

Live Server dapat membuka index.html di root proyek. src/main.js memuat partial HTML sebelum menjalankan fungsi komponen. Vite tetap disarankan melalui npm run dev. Jangan membuka halaman melalui file:// karena modul dan fetch memerlukan server HTTP.

## Halaman CV

Tombol View CV membuka cv.html di tab yang sama. Edit konten CV di cv.html, tampilannya di src/pages/cv/cv.css, dan tautan unduhan CV di src/pages/cv/cv.js. Dokumen asli tetap disimpan di src/assets/documents/. Halaman web tidak otomatis tersinkron dengan dokumen Word.

## Mengubah proyek (satu sumber data)

Edit **src/data/projects.js** untuk judul, kategori, periode, deskripsi, fitur, tags, tautan, dan gambar. Renderer berada di src/sections/work/work.js; layout berada di work.css.

- published: true menampilkan proyek; false menyimpan draft tersembunyi. Tiga proyek lainnya masih draft kosong.
- description: ringkasan proyek. features: daftar fitur di detail yang bisa dibuka.
- images: urutan galeri; setiap gambar memiliki src, alt, caption.
- Simpan screenshot di public/images/projects/ai-coding-assistant/home.png dan editor.png. File public disalin Vite ke dist tanpa mengubah namanya.
- Gunakan path images/projects/... di data, tanpa awalan public/. Format JPG/WebP juga boleh; sesuaikan ekstensi di src.
- links.demo dan links.repository: biarkan kosong bila belum tersedia. Tombol hanya muncul setelah URL diisi.
- Klik screenshot untuk membukanya dalam ukuran penuh. Gambar dimuat secara lazy.
- Data proyek yang belum dipublikasikan tidak ditampilkan, tetapi tetap ada di source publik; jangan menaruh informasi rahasia.

Konten pendidikan dan skills berada di about.html, kontak di contact.html, kemampuan di services.html. IPK belum ditampilkan karena dokumen CV mencantumkan dua nilai berbeda.

## Slider proyek dan View More

Keempat proyek sekarang tampil. Desktop menampilkan 3 kartu, tablet 2, dan HP 1; gunakan panah atau geser horizontal. View More membuka deskripsi di dalam kartu dengan animasi.

- Edit semua konten di src/data/projects.js. Gambar pertama (images[0]) menjadi sampul, gambar berikutnya muncul pada detail.
- Screenshot skripsi: public/images/projects/ai-coding-assistant/unklab-aicode1.png dan unklab-aicode2.png.
- Proyek dengan images: [] menampilkan Gambar belum ditambahkan; deskripsi kosong diberi penanda.
- Isi links.repository dengan URL repository proyek. Selama kosong, tautan berlabel GitHub Profile menuju profil Aakmall.
- Ukuran/jumlah kartu dan durasi animasi: src/sections/work/work.css. Interaksi slider dan View More: work.js.

## Halaman detail proyek (terbaru)

View Project kini membuka project.html?id=ID_PROYEK, bukan memperpanjang kartu. Slider tetap menampilkan 3 kartu desktop, 2 tablet, dan 1 mobile. Sampul pertama, nomor merah, judul, dan kategori mengikuti tampilan referensi.

- Data bersama untuk kartu dan halaman detail: src/data/projects.js.
- Tampilan kartu/slider: src/sections/work/work.css dan work.js.
- Halaman detail: project.html, src/pages/project/project.js, dan project.css.
- Gambar sampul menggunakan images[0]; halaman detail menampilkan semua gambar.
- GitHub Repository muncul saat links.repository diisi; jika kosong, GitHub Profile tetap tersedia.
- ID tidak ditemukan menampilkan pesan dengan tautan kembali ke daftar proyek.
