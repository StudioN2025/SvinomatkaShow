// ====== НАСТРОЙКИ ======
// Укажи свой GitHub username и название репозитория
const GITHUB_USER = "ТВОЙ_ЮЗЕРНЕЙМ";
const GITHUB_REPO = "ТВОЙ_РЕПОЗИТОРИЙ";
const GITHUB_BRANCH = "main"; // или "master"
const PHOTO_FOLDER = "photo";
// ======================

const galleryEl = document.getElementById("gallery");
const loaderEl = document.getElementById("loader");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let images = [];
let currentIndex = 0;

// Формируем URL для API GitHub
const apiUrl = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${PHOTO_FOLDER}?ref=${GITHUB_BRANCH}`;

async function loadImages() {
    try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Не удалось загрузить список фото");

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
        loaderEl.textContent = "Ошибка загрузки: " + err.message;
        console.error(err);
    }
}

function renderGallery() {
    images.forEach((file, index) => {
        const item = document.createElement("div");
        item.className = "gallery-item";
        item.innerHTML = `<img src="${file.download_url}" alt="${file.name}" loading="lazy">`;
        item.addEventListener("click", () => openModal(index));
        galleryEl.appendChild(item);
    });
}

function openModal(index) {
    currentIndex = index;
    modalImg.src = images[currentIndex].download_url;
    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
}

function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].download_url;
}

function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].download_url;
}

// Слушатели событий
closeBtn.addEventListener("click", closeModal);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
});

// Запуск
loadImages();
