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
