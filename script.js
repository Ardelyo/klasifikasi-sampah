// --- DOM Element References ---
const imageContainer = document.getElementById('image-container');
const placeholderText = document.getElementById('placeholder-text');
const uploadedImage = document.getElementById('uploaded-image');
const resultsDisplay = document.getElementById('results-display');
const resultStatus = document.getElementById('result-status');
const resultCategory = document.getElementById('result-category');
const resultScore = document.getElementById('result-score');
const resultDescription = document.getElementById('result-description');
const resultIcon = document.getElementById('result-icon');
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('file-input');
const dropZone = document.getElementById('drop-zone');
const loadingOverlay = document.getElementById('loading-overlay');
const hfTokenInput = document.getElementById('hf-token-input');
const tokenToggleBtn = document.getElementById('token-toggle-btn'); // Token toggle button
const tokenContent = document.getElementById('token-content');   // Token collapsible content
const tokenSection = document.querySelector('.token-section'); // Token section wrapper

// Sound Effects Elements
const sfxClick = document.getElementById('sfx-click');
const sfxSuccess = document.getElementById('sfx-success');
const sfxError = document.getElementById('sfx-error');

// --- CONFIGURATION ---
const HF_API_URL = "https://api-inference.huggingface.co/models/tribber93/my-trash-classification";
const CONFIDENCE_THRESHOLD = 0.60; // 60% threshold

// --- CATEGORY INFORMATION MAPPING (EXPANDED) ---
const categoryInfo = {
    "cardboard": {
        name: "KARDUS",
        description: "<strong>Info Lingkungan:</strong> Kardus berasal dari serat kayu (pohon). Produksinya membutuhkan energi & air. Daur ulang kardus menghemat sumber daya alam, energi (hingga 70%!), dan mengurangi sampah TPA (Tempat Pemrosesan Akhir).<br><strong>Tips Daur Ulang:</strong> Pipihkan kardus untuk menghemat ruang. Pastikan bersih & kering. Hapus lakban berlebih jika memungkinkan. JANGAN masukkan kardus berminyak (mis: bekas pizza) atau berlapis lilin/plastik ke daur ulang kertas biasa.<br><strong>Dampak Buruk:</strong> Kardus di TPA menghasilkan gas metana (gas rumah kaca kuat) saat terurai tanpa oksigen.",
        status: "DAUR ULANG", iconClass: "cardboard"
    },
    "glass": {
        name: "KACA",
        description: "<strong>Info Lingkungan:</strong> Kaca terbuat dari pasir, soda abu, dan batu kapur. Proses pembuatannya sangat intensif energi. Kaca dapat didaur ulang berkali-kali tanpa kehilangan kualitas! Daur ulang 1 botol kaca menghemat energi cukup untuk menyalakan bohlam 100W selama 4 jam.<br><strong>Tips Daur Ulang:</strong> Hanya botol & toples kaca bersih yang biasanya diterima. Bilas sisa produk. Tutup logam/plastik sebaiknya dipisah. JANGAN masukkan: kaca jendela, cermin, pyrex, keramik, atau bohlam lampu; ini mencemari proses daur ulang kaca.<br><strong>Dampak Buruk:</strong> Kaca SANGAT lama terurai di alam (jutaan tahun) dan pecahan bisa berbahaya.",
        status: "DAUR ULANG", iconClass: "glass"
    },
    "metal": {
        name: "LOGAM",
        description: "<strong>Info Lingkungan:</strong> Termasuk kaleng aluminium (minuman) & baja/timah (makanan). Penambangan bijih logam merusak lanskap & butuh banyak energi. Daur ulang logam SANGAT efisien energi (Aluminium: hemat 95% energi!).<br><strong>Tips Daur Ulang:</strong> Bersihkan sisa makanan/minuman. Kaleng aerosol kosong & tanpa tekanan biasanya bisa didaur ulang (cek aturan lokal). Aluminium foil bersih mungkin diterima (gulung jadi bola). Pisahkan tutup logam dari wadah lain jika memungkinkan.<br><strong>Dampak Buruk:</strong> Produksi logam primer menghasilkan polusi udara & air. Logam di TPA adalah pemborosan sumber daya berharga.",
        status: "DAUR ULANG", iconClass: "metal"
    },
    "paper": {
        name: "KERTAS",
        description: "<strong>Info Lingkungan:</strong> Berasal dari pohon, sumber daya terbarukan tapi penebangan hutan berlebih berdampak buruk. Produksi kertas butuh banyak air & energi. Daur ulang kertas mengurangi penebangan pohon, menghemat air & energi, serta mengurangi sampah TPA.<br><strong>Tips Daur Ulang:</strong> Kertas kantor, koran, majalah, buku (tanpa cover keras), kertas kado (tanpa glitter/plastik) biasanya bisa. Pastikan bersih & kering. JANGAN masukkan: kertas berminyak, tisu bekas, kertas thermal (struk), kertas berlapis plastik/lilin, atau kertas foto.<br><strong>Dampak Buruk:</strong> Kertas di TPA menghasilkan metana. Produksi kertas primer bisa mencemari air.",
        status: "DAUR ULANG", iconClass: "paper"
    },
    "plastic": {
        name: "PLASTIK",
        description: "<strong>Info Lingkungan:</strong> Plastik berasal dari minyak bumi (tak terbarukan). Produksinya intensif energi & menghasilkan polusi. Plastik SANGAT sulit terurai di alam (ratusan hingga ribuan tahun!), menyebabkan masalah mikroplastik.<br><strong>Tips Daur Ulang:</strong> Kenali kode daur ulang (♻️ 1-7). PET (1) & HDPE (2) paling umum didaur ulang jadi produk baru. Lainnya lebih sulit/jarang. Bersihkan wadah plastik. Lepas label/tutup jika diminta aturan lokal. HINDARI 'wishcycling' (memasukkan plastik tak bisa didaur ulang). Plastik film/kresek biasanya perlu dikembalikan ke toko/lokasi khusus.<br><strong>Dampak Buruk:</strong> Polusi plastik di laut & darat membahayakan satwa liar & ekosistem. Mikroplastik masuk ke rantai makanan.",
        status: "PERIKSA KODE", iconClass: "plastic"
    },
    "trash": {
        name: "SAMPAH RESIDU",
        description: "<strong>Info Lingkungan:</strong> Ini adalah kategori untuk semua sampah yang TIDAK bisa didaur ulang atau dikomposkan di sistem lokal Anda. Mengurangi produksi sampah residu adalah kunci.<br><strong>Contoh Umum:</strong> Styrofoam kotor, kemasan multi-layer (snack/kopi sachet), popok bekas, pembalut, tisu kotor, puntung rokok, barang rusak tak bisa diperbaiki.<br><strong>Tips Pengelolaan:</strong> Pastikan ini benar-benar tidak bisa didaur ulang/kompos sebelum dibuang. Gunakan kantong sampah yang kuat. Upayakan REDUCE (kurangi) & REUSE (gunakan kembali) barang untuk meminimalkan kategori ini.<br><strong>Dampak Buruk:</strong> Memenuhi TPA, potensial mencemari tanah & air jika TPA tidak dikelola baik.",
        status: "BUANG (RESIDU)", iconClass: "trash" // Status update
    },
    "unknown": {
        name: "TIDAK DIKENAL",
        description: "<strong>Info:</strong> Kategori sampah ini tidak teridentifikasi oleh model AI atau tidak ada dalam daftar informasi kami. Bisa jadi objek non-sampah atau jenis sampah yang belum dikenali.<br><strong>Tindakan:</strong> Coba foto dari sudut lain atau pastikan objek terlihat jelas. Jika ini memang sampah, periksa panduan pemilahan sampah di wilayah Anda untuk cara pembuangan yang benar.",
        status: "INFO", iconClass: "unknown"
    }
};


// --- Utility Functions ---
function playSound(audioElement) { /* Function remains the same */
    audioElement.currentTime = 0;
    audioElement.play().catch(e => console.warn("Audio play failed:", e));
}

// --- Hugging Face API Call Function ---
async function queryHuggingFace(imageFile) { /* Function remains largely the same */
    const userToken = hfTokenInput.value.trim();
    if (!userToken) {
        showResult("GALAT", "TOKEN DIPERLUKAN", 0, "Masukkan token API Anda pada bagian konfigurasi di atas.", categoryInfo.unknown.iconClass);
        resultsDisplay.classList.add('visible');
        playSound(sfxError);
        tokenSection.classList.add('open'); // Auto-open token section if empty
        tokenToggleBtn.setAttribute('aria-expanded', 'true');
        tokenToggleBtn.textContent = tokenToggleBtn.textContent.replace('[+]', '[-]'); // Update button text
        tokenContent.hidden = false;
        hfTokenInput.focus(); // Focus the input
        return null;
    }
     if (!userToken.startsWith('hf_')) {
         showResult("GALAT", "FORMAT TOKEN SALAH", 0, "Token harus dimulai dengan 'hf_'. Silakan periksa kembali.", categoryInfo.unknown.iconClass);
         resultsDisplay.classList.add('visible');
         playSound(sfxError);
         tokenSection.classList.add('open'); // Auto-open token section
         tokenToggleBtn.setAttribute('aria-expanded', 'true');
         tokenToggleBtn.textContent = tokenToggleBtn.textContent.replace('[+]', '[-]');
         tokenContent.hidden = false;
         hfTokenInput.focus();
         return null;
    }

    showLoading(true);
    showResult("ANALISIS", "MEMPROSES...", 0, "Menghubungi server...", categoryInfo.unknown.iconClass);
    resultsDisplay.classList.add('visible');

    try {
        const response = await fetch(
            HF_API_URL,
            { headers: { "Authorization": `Bearer ${userToken}` }, method: "POST", body: imageFile }
        );
        if (!response.ok) { /* Error handling remains the same */
            let errorMsg = `GALAT TIDAK DIKETAHUI (${response.status})`;
            let errorDesc = "Terjadi masalah saat menghubungi server analisis.";
            if (response.status === 401) { errorMsg = "TOKEN API TIDAK VALID"; errorDesc = "Token salah atau tidak punya izin 'read'. Cek di Hugging Face."; }
            else if (response.status === 503) { errorMsg = "MODEL SEDANG DIMUAT"; errorDesc = "Model AI sedang disiapkan. Coba lagi beberapa saat."; }
            else {
                 try { const errorJson = await response.json(); errorMsg = `GALAT API (${response.status}): ${errorJson.error || JSON.stringify(errorJson)}`; }
                 catch (e) { try { const errorText = await response.text(); errorMsg = `GALAT SERVER (${response.status}): ${errorText}`; } catch (textErr) {} }
            }
            throw new Error(errorMsg + "||" + errorDesc);
        }
        const result = await response.json();
        playSound(sfxSuccess);
        return result;
    } catch (error) { /* Error handling remains the same */
        console.error("Galat saat query Hugging Face API:", error);
        playSound(sfxError);
        let displayMsg = error.message.toUpperCase();
        let displayDesc = categoryInfo.unknown.description;
        if (error.message.includes("||")) { const parts = error.message.split("||"); displayMsg = parts[0].toUpperCase(); displayDesc = parts[1]; }
        else if (error instanceof TypeError && error.message.includes('Failed to fetch')) { displayMsg = `GAGAL MENGAMBIL DATA`; displayDesc = `Periksa koneksi internet Anda, atau mungkin ada masalah CORS jika menjalankan secara lokal.`; }
        showResult("GALAT", displayMsg, 0, displayDesc, categoryInfo.unknown.iconClass);
        resultsDisplay.classList.add('visible');
        return null;
    } finally {
        showLoading(false); // Ensure loading is hidden
    }
}

// --- Event Listeners ---
uploadBtn.addEventListener('click', () => { /* Listener remains the same */
    playSound(sfxClick);
    fileInput.click();
});
fileInput.addEventListener('change', handleFileUpload);

dropZone.addEventListener('dragenter', handleDragEnter, false);
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('dragleave', handleDragLeave, false);
dropZone.addEventListener('drop', handleFileDrop, false);

// Token Section Toggle Listener
tokenToggleBtn.addEventListener('click', () => {
    const isExpanded = tokenToggleBtn.getAttribute('aria-expanded') === 'true';
    tokenToggleBtn.setAttribute('aria-expanded', !isExpanded);
    tokenContent.hidden = isExpanded;
    tokenSection.classList.toggle('open');
    // Update button text/symbol
    if (isExpanded) {
        tokenToggleBtn.textContent = tokenToggleBtn.textContent.replace('[-]', '[+]');
    } else {
        tokenToggleBtn.textContent = tokenToggleBtn.textContent.replace('[+]', '[-]');
    }
     playSound(sfxClick);
});


// --- Drag and Drop Handlers ---
function handleDragEnter(e) { /* Function remains the same */ e.preventDefault(); e.stopPropagation(); dropZone.classList.add('dragover'); }
function handleDragOver(e) { /* Function remains the same */ e.preventDefault(); e.stopPropagation(); e.dataTransfer.dropEffect = 'copy'; dropZone.classList.add('dragover'); }
function handleDragLeave(e) { /* Function remains the same */ e.preventDefault(); e.stopPropagation(); dropZone.classList.remove('dragover'); }
function handleFileDrop(e) { /* Function remains the same */
    e.preventDefault(); e.stopPropagation(); dropZone.classList.remove('dragover');
    playSound(sfxClick);
    const files = e.dataTransfer.files;
    if (files.length > 0) { processDroppedFile(files[0]); }
}

// --- Core Processing Functions ---

function processDroppedFile(file) {
    if (!file || !file.type.startsWith('image/')) { /* Error handling remains the same */
        showResult("GALAT", "FILE TIDAK VALID", 0, "Silakan jatuhkan atau pilih file gambar (JPEG, PNG, dll).", categoryInfo.unknown.iconClass);
        resultsDisplay.classList.add('visible'); playSound(sfxError); return;
    }
    hideResult();

    const reader = new FileReader();
    reader.onload = async (e) => {
        // **FIX:** Ensure loading is hidden *before* showing the image
        showLoading(false);
        placeholderText.style.display = 'none'; // Hide placeholder
        uploadedImage.src = e.target.result;    // Set the image source
        uploadedImage.classList.add('active'); // Make image visible *now*

        const apiResult = await queryHuggingFace(file); // Call API AFTER image is ready for display
        handleApiResult(apiResult); // Process the result
    }
    reader.onerror = (e) => { /* Error handling remains the same */
        console.error("Galat FileReader:", e);
        showResult("GALAT", "TIDAK DAPAT MEMBACA FILE", 0, "Gagal memproses file gambar yang dipilih.", categoryInfo.unknown.iconClass);
        resultsDisplay.classList.add('visible'); playSound(sfxError); showLoading(false);
    }
    // Show loading state immediately upon file selection/drop
    showLoading(true);
    placeholderText.style.display = 'none'; // Hide placeholder
    uploadedImage.classList.remove('active'); // Hide previous image
    uploadedImage.src = ""; // Clear previous src to avoid flash of old image
    reader.readAsDataURL(file); // Start reading file
}

function handleFileUpload(event) { /* Function remains the same */
    const file = event.target.files[0];
    if (file) { processDroppedFile(file); }
    event.target.value = null;
}

function handleApiResult(apiResult) { /* Function remains largely the same */
     if (apiResult) {
        if (Array.isArray(apiResult) && apiResult.length > 0) {
            apiResult.sort((a, b) => b.score - a.score);
            const topResult = apiResult[0];
            const label = topResult.label.toLowerCase();
            const score = topResult.score;
            const info = categoryInfo[label] || categoryInfo.unknown;
            if (score < CONFIDENCE_THRESHOLD) {
                showResult(`KURANG YAKIN (${info.status})`, `Mungkin ${info.name}?`, score, info.description, info.iconClass);
            } else {
                showResult(info.status, info.name, score, info.description, info.iconClass);
            }
        } else { /* Fallback handling remains the same */
             console.warn("Format hasil API tidak dikenal:", apiResult);
             let fallbackText = "ANALISIS SELESAI (FORMAT TIDAK DIKENAL)";
             if (typeof apiResult === 'string' || typeof apiResult === 'number') { fallbackText = `${apiResult}`; }
             showResult(categoryInfo.unknown.status, categoryInfo.unknown.name, 0, fallbackText, categoryInfo.unknown.iconClass);
        }
         resultsDisplay.classList.add('visible');
    }
}

// --- UI Update Functions ---
function showResult(status, categoryName, score, description, iconClass) { /* Function remains the same */
    resultStatus.textContent = status + '::';
    resultCategory.textContent = categoryName;
    resultScore.textContent = `${(score * 100).toFixed(0)}%`;
    resultDescription.innerHTML = description; // Use innerHTML for <strong> tags etc.
    resultIcon.className = 'result-icon';
    if (iconClass) { resultIcon.classList.add(iconClass); }
    resultsDisplay.classList.add('visible');
}

function hideResult() { /* Function remains the same */
    resultsDisplay.classList.remove('visible');
    // Resetting text after transition is less critical if loading state replaces it
}

function showLoading(isLoading) { /* Function remains the same */
    if (isLoading) {
        loadingOverlay.classList.add('visible');
        // Don't hide placeholder or image here, let processDroppedFile handle it
    } else {
        loadingOverlay.classList.remove('visible');
    }
}

// --- Initial State & Checks ---
placeholderText.style.display = 'block';
uploadedImage.classList.remove('active');
uploadedImage.src = ""; // Ensure src is initially empty
hideResult();
showLoading(false);

// Load token & setup listener
hfTokenInput.value = localStorage.getItem('hfUserToken') || '';
hfTokenInput.addEventListener('input', () => { localStorage.setItem('hfUserToken', hfTokenInput.value); });

// Initial check for fetch API
if (!window.fetch) { /* Check remains the same */
    showResult("GALAT", "BROWSER TIDAK MENDUKUNG", 0, "Aplikasi ini memerlukan fitur Fetch API.", categoryInfo.unknown.iconClass);
    resultsDisplay.classList.add('visible'); uploadBtn.disabled = true; hfTokenInput.disabled = true; tokenToggleBtn.disabled = true;
}

// Initial message setup
if (!hfTokenInput.value && window.fetch) { // Only show if fetch is supported
     showResult("INFO", "TOKEN DIPERLUKAN", 0, "Masukkan token Hugging Face API Anda pada bagian konfigurasi di atas untuk memulai.", categoryInfo.unknown.iconClass);
     resultsDisplay.classList.add('visible');
     // Keep token section closed initially unless explicitly opened on error later
     tokenToggleBtn.setAttribute('aria-expanded', 'false');
     tokenContent.hidden = true;
     tokenSection.classList.remove('open');
     tokenToggleBtn.textContent = tokenToggleBtn.textContent.replace('[-]', '[+]'); // Ensure it starts with [+]
} else {
    // If token exists or fetch failed, ensure initial state is correct
    tokenToggleBtn.setAttribute('aria-expanded', 'false');
    tokenContent.hidden = true;
    tokenSection.classList.remove('open');
    tokenToggleBtn.textContent = tokenToggleBtn.textContent.replace('[-]', '[+]');
}