# KLASIFIKASI SAMPAH v3.1

A web-based trash classification tool utilizing the Hugging Face Inference API (`tribber93/my-trash-classification` model) to identify common waste categories from user-uploaded images. This version features a distinctive Black & White Maximalist design aesthetic with numerous visual effects and provides detailed environmental information for each category.

## Fitur Utama

*   **Klasifikasi Gambar:** Menggunakan model AI via Hugging Face API untuk mengidentifikasi 6 kategori sampah (Kardus, Kaca, Logam, Kertas, Plastik, Sampah Residu).
*   **Input Token API:** Bagian konfigurasi (dapat diciutkan/dibuka) untuk memasukkan token Hugging Face pengguna (disimpan di localStorage).
*   **Unggah Gambar:** Mendukung unggah via tombol dan fungsionalitas Seret & Jatuhkan (Drag and Drop).
*   **Informasi Detail:** Menampilkan deskripsi lengkap untuk setiap kategori, termasuk info lingkungan, tips daur ulang, dan dampak buruk jika tidak dikelola dengan baik.
*   **Ambang Batas Keyakinan (Confidence Threshold):** Memberikan indikasi "KURANG YAKIN" jika skor prediksi model di bawah 60%.
*   **Penanganan Error Lanjut:** Memberikan pesan error yang lebih spesifik untuk masalah umum API (Token salah, Model sedang dimuat, Gagal fetch).
*   **Desain B&W Maximalist:** Tema visual hitam putih yang kuat dengan efek glitch, bayangan tegas, dan font monospace.
*   **Elemen Visual Tambahan:**
    *   Ikon geometris unik untuk setiap hasil kategori.
    *   Latar belakang geometris bergerak.
    *   Overlay Scanline subtil.
    *   Animasi loading kustom.
    *   Efek hover/aktif tombol yang agresif.
*   **Efek Suara:** Efek suara minimalis untuk interaksi (klik, sukses, error).

## Teknologi

*   HTML5
*   CSS3 (Animasi, Flexbox, Custom Properties)
*   JavaScript (Vanilla JS, Fetch API, Drag & Drop API, localStorage)
*   Hugging Face Inference API

## Setup & Penggunaan

1.  **Dapatkan Token Hugging Face:**
    *   Kunjungi [Hugging Face Tokens](https://huggingface.co/settings/tokens) dan login atau daftar akun.
    *   Buat token baru dengan **role "read"**.
    *   Salin token yang dihasilkan (contoh: `hf_xxxxxxxxxxxxxxxxxxxxxx`).
2.  **Masukkan Token di Aplikasi:**
    *   Buka bagian "[+] KONFIGURASI API TOKEN HUGGING FACE".
    *   Tempel token Anda ke dalam input field. Token akan disimpan di `localStorage` browser Anda untuk sesi berikutnya.
3.  **Unggah Gambar:**
    *   Klik tombol `[ UNGGAH ▲ ]` dan pilih file gambar sampah.
    *   Atau, seret file gambar dari komputer Anda dan jatuhkan ke area kotak gambar.
4.  **Lihat Hasil:**
    *   Aplikasi akan menampilkan kategori yang terdeteksi, skor keyakinan, ikon visual, status pengelolaan (mis: DAUR ULANG), dan informasi lingkungan detail.

## Changelog (Perubahan Utama dalam ~6 Jam Terakhir)

*   **Implementasi Ambang Batas Keyakinan:** Menampilkan status "KURANG YAKIN" jika skor < 60%.
*   **Penanganan Error API Lanjut:** Menambahkan deteksi dan pesan spesifik untuk error 401 (Unauthorized) dan 503 (Model Loading).
*   **Fungsionalitas Drag and Drop:** Menambahkan kemampuan unggah gambar dengan seret & jatuhkan.
*   **Efek Visual Tambahan:**
    *   Menambahkan latar belakang geometris bergerak.
    *   Menambahkan overlay scanline.
    *   Membuat animasi loading kustom.
    *   Menambahkan ikon geometris unik untuk tiap hasil kategori.
    *   Membuat state hover/aktif tombol lebih agresif.
*   **Efek Suara:** Mengintegrasikan efek suara untuk klik, sukses, dan error.
*   **Konfigurasi Token Dapat Diciutkan:** Membuat bagian input token API menjadi collapsible (dropdown) untuk menghemat ruang layar.
*   **Informasi Kategori Diperluas:** Menambahkan detail info lingkungan, tips daur ulang/pengelolaan, dan dampak buruk untuk setiap kategori sampah.
*   **Perbaikan Tampilan Gambar:** Memperbaiki masalah di mana gambar tidak langsung tampil setelah file dipilih/dijatuhkan (memastikan `loadingOverlay` disembunyikan *sebelum* gambar ditampilkan).
*   **Refinement UI/UX:** Penyesuaian layout, teks, dan alur interaksi minor.

## Kredit

Dibuat oleh **ARDEL.YO** :: [bit.ly/ardelyo](http://bit.ly/ardelyo)

---