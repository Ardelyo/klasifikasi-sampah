> [!NOTE]
> Analisis Kategori Sampah Berbasis AI

**Sebuah aplikasi web interaktif untuk mengklasifikasikan jenis sampah umum menggunakan AI, menampilkan antarmuka pengguna bergaya B&W Maximalist yang unik dan kaya fitur.**

---

**[➡️ LIHAT LIVE DEMO ⬅️](https://ardelyo.github.io/klasifikasi-sampah/)** _(Ganti jika URL berbeda)_


---

## Ikhtisar

Aplikasi **Klasifikasi Sampah v3.1** ini memungkinkan pengguna mengunggah gambar sampah dan menerima klasifikasi kategori (Kardus, Kaca, Logam, Kertas, Plastik, Sampah Residu) yang didukung oleh model AI melalui Hugging Face Inference API (`tribber93/my-trash-classification`).

Proyek ini tidak hanya fokus pada fungsionalitas klasifikasi tetapi juga menyajikan informasi lingkungan yang relevan untuk setiap kategori dan mengadopsi gaya desain "Black & White Maximalist" yang menonjol dengan berbagai efek visual dan interaktif.

## ✨ Fitur Utama

*   **🤖 Klasifikasi AI:** Memanfaatkan Hugging Face API untuk identifikasi 6 kategori sampah.
*   **🔑 Input Token API:** Konfigurasi token Hugging Face yang aman (disimpan di localStorage) dan dapat diciutkan (collapsible UI).
*   **⬆️ Unggah Fleksibel:** Mendukung unggah gambar via tombol file chooser dan Drag & Drop.
*   **📚 Informasi Edukatif:** Menyediakan deskripsi mendalam untuk setiap kategori, mencakup:
    *   Info Dampak Lingkungan
    *   Tips Daur Ulang / Pengelolaan Praktis
    *   Dampak Buruk jika Tidak Dikelola Benar
*   **📊 Ambang Batas Keyakinan:** Memberi label "KURANG YAKIN" jika skor prediksi model < 60%.
*   **❗ Penanganan Error Spesifik:** Memberikan feedback jelas untuk error umum (Token tidak valid, Model loading, Gagal fetch).
*   **🎨 Desain B&W Maximalist:** Antarmuka pengguna hitam-putih yang unik dengan:
    *   Efek glitch pada judul.
    *   Latar belakang geometris bergerak.
    *   Overlay scanline CRT-style.
    *   Animasi loading kustom.
    *   Ikon visual geometris untuk tiap kategori hasil.
    *   Efek hover/aktif tombol yang agresif dan interaktif.
*   **🔊 Efek Suara:** Efek audio minimalis untuk feedback interaksi (klik, sukses, error).
*   **📱 Desain Responsif:** Tampilan disesuaikan untuk berbagai ukuran layar.

## 🛠️ Teknologi yang Digunakan

*   **Frontend:** HTML5, CSS3 (Animasi, Flexbox, Grid, Variabel), Vanilla JavaScript (ES6+)
*   **API:** Hugging Face Inference API
*   **Fitur Web:** Fetch API, Drag & Drop API, Web Storage (localStorage)
*   **Lainnya:** Git, GitHub, GitHub Pages

## 🚀 Setup & Penggunaan

Aplikasi ini dirancang untuk dijalankan langsung di browser tanpa perlu build step.

1.  **Akses Aplikasi:**
    *   Buka **[Live Demo](https://ardelyo.github.io/klasifikasi-sampah/)**.
    *   Atau, kloning repositori ini (`git clone https://github.com/Ardelyo/klasifikasi-sampah.git`) dan buka file `index.html` di browser Anda (meskipun beberapa fitur seperti API call mungkin terpengaruh CORS jika dibuka langsung dari `file:///`).
2.  **Konfigurasi Token API:**
    *   Klik tombol `[+] KONFIGURASI API TOKEN HUGGING FACE` untuk membuka bagian konfigurasi.
    *   **Dapatkan Token:** Kunjungi [Hugging Face Tokens](https://huggingface.co/settings/tokens), login/daftar, buat token baru dengan **role "read"**, dan salin token (`hf_...`).
    *   **Masukkan Token:** Tempel token Anda ke dalam input field di aplikasi. Token ini akan disimpan di `localStorage` browser Anda untuk penggunaan selanjutnya. Tutup bagian konfigurasi dengan mengklik tombol lagi.
    *   **Keamanan:** Token disimpan *hanya* di browser Anda. Jangan pernah membagikan token Anda.
3.  **Unggah Gambar Sampah:**
    *   Klik tombol `[ UNGGAH ▲ ]` dan pilih file gambar.
    *   Atau, **seret file gambar** dari komputer Anda dan **jatuhkan** ke area kotak gambar yang ditandai.
4.  **Lihat Hasil Klasifikasi:**
    *   Tunggu animasi loading selesai.
    *   Hasil akan ditampilkan, meliputi: Status Pengelolaan, Nama Kategori, Skor Keyakinan (%), Ikon Visual, dan Deskripsi Lingkungan Detail.

## 📜 Changelog (Perubahan Mayor v3.0 -> v3.1)

*   Implementasi ambang batas keyakinan (Confidence Threshold).
*   Penanganan error API spesifik (401, 503, fetch).
*   Penambahan fitur unggah via Drag & Drop.
*   Penambahan efek visual: latar belakang bergerak, scanline overlay, ikon kategori, animasi loading kustom, state tombol agresif.
*   Integrasi efek suara.
*   Bagian input token dibuat collapsible.
*   Ekspansi informasi lingkungan & pengelolaan untuk tiap kategori.
*   Perbaikan bug tampilan gambar setelah unggah.
*   Refinement UI/UX secara keseluruhan.

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License**. Lihat file `LICENSE` untuk detail lengkap.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🤝 Berkontribusi

Kontribusi, isu (issues), dan permintaan fitur (feature requests) dipersilakan! Jangan ragu untuk membuka isu atau pull request jika Anda memiliki ide untuk perbaikan.

## 👤 Kontak

Dibuat oleh **Ardelyo**

*   **Instagram:** [@ardel.yo](https://www.instagram.com/ardel.yo/)
*   **GitHub:** [Ardelyo](https://github.com/Ardelyo)
