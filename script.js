// ====== НАСТРОЙКИ ======
const GITHUB_USER = "StudioN2025";           // ← сюда реальный ник латиницей
const GITHUB_REPO = "SvinomatkaShow";     // ← название репозитория
const GITHUB_BRANCH = "main";             // или "master"
const PHOTO_FOLDER = "photo";
// ======================

const galleryEl = document.getElementById("gallery");
const loaderEl = document.getElementById("loader");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const downloadBtn = document.getElementById("download-btn");

let images = [];
let currentIndex = 0;

// Формируем URL для API GitHub
const apiUrl = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${PHOTO_FOLDER}?ref=${GITHUB_BRANCH}`;

// ====== ЗАГРУЗКА СПИСКА ФОТО ======
async function loadImages() {
    try {
        console.log("Запрашиваю:", apiUrl);
        const res = await fetch(apiUrl);

        if (res.status === 404) {
            throw new Error(
                `404 — репозиторий "${GITHUB_USER}/${GITHUB_REPO}" или папка "${PHOTO_FOLDER}" не найдены. ` +
                `Проверь ник, название репо, ветку (${GITHUB_BRANCH}) и название папки.`
            );
        }
        if (res.status === 403) {
            throw new Error("403 — превышен лимит запросов к GitHub API (60/час). Подожди час.");
        }
        if (!res.ok) {
            throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
        }

        const files = await res.json();

        // Фильтруем только изображения
        images = files.filter(file =>
            file.type === "file" &&
            /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(file.name)
        );

        if (images.length === 0) {
            loaderEl.textContent = "В папке photo пока нет изображений 😔";
            return;
        }

        loaderEl.style.display = "none";
        renderGallery();
    } catch (err) {
        loaderEl.textContent = "❌ " + err.message;
        console.error(err);
    }
}

// ====== ОТРИСОВКА ГАЛЕРЕИ ======
function renderGallery() {
    images.forEach((file, index) => {
        const item = document.createElement("div");
        item.className = "gallery-item";

        item.innerHTML = `
            <img src="${file.download_url}" alt="${file.name}" loading="lazy">
            <button class="download-icon" title="Скачать">⬇️</button>
        `;

        // Клик по фото — открыть модалку
        item.querySelector("img").addEventListener("click", () => openModal(index));

        // Клик по кнопке скачивания — не открывать модалку, а скачать
        item.querySelector(".download-icon").addEventListener("click", (e) => {
            e.stopPropagation();
            downloadImage(file);
        });

        galleryEl.appendChild(item);
    });
}

// ====== МОДАЛЬНОЕ ОКНО ======
function openModal(index) {
    currentIndex = index;
    updateModalContent();
    modal.classList.add("active");
}

function updateModalContent() {
    const file = images[currentIndex];
    modalImg.src = file.download_url;
    downloadBtn.href = file.download_url;
    downloadBtn.setAttribute("download", file.name);
}

function closeModal() {
    modal.classList.remove("active");
}

function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateModalContent();
}

function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateModalContent();
}

// ====== СКАЧИВАНИЕ ФАЙЛА ======
async function downloadImage(file) {
    try {
        const res = await fetch(file.download_url);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (err) {
        console.error("Ошибка скачивания:", err);
        // Фолбэк — открыть в новой вкладке
        window.open(file.download_url, "_blank");
    }
}

// Кнопка скачивания в модалке — через blob, чтобы имя файла сохранилось
downloadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (images[currentIndex]) {
        downloadImage(images[currentIndex]);
    }
});

// ====== СЛУШАТЕЛИ СОБЫТИЙ ======
closeBtn.addEventListener("click", closeModal);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
});

// ====== ЗАПУСК ======
loadImages();
