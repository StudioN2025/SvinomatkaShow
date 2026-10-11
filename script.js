* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, sans-serif;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    min-height: 100vh;
    color: #fff;
}

header {
    text-align: center;
    padding: 40px 20px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    background: linear-gradient(90deg, #ff9a9e, #fad0c4, #fbc2eb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

header p {
    color: #aaa;
    font-size: 1.1rem;
}

main {
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px 20px;
}

.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    cursor: pointer;
    aspect-ratio: 1 / 1;
    background: #222;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s, box-shadow 0.3s;
}

.gallery-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(255, 154, 158, 0.5);
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
}

.gallery-item:hover img {
    transform: scale(1.08);
}

/* Кнопка скачивания на превью (появляется при наведении) */
.gallery-item .download-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(6px);
    border: none;
    border-radius: 50%;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translateY(-8px);
    transition: opacity 0.3s, transform 0.3s, background 0.3s;
    z-index: 2;
    pointer-events: auto;
}

.gallery-item:hover .download-icon {
    opacity: 1;
    transform: translateY(0);
}

.gallery-item .download-icon:hover {
    background: rgba(245, 87, 108, 0.9);
    transform: scale(1.1);
}

.loader {
    text-align: center;
    padding: 60px;
    font-size: 1.2rem;
    color: #888;
}

/* Модальное окно */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    justify-content: center;
    align-items: center;
}

.modal.active {
    display: flex;
}

.modal-content {
    max-width: 90%;
    max-height: 80vh;
    border-radius: 8px;
    box-shadow: 0 0 40px rgba(245, 87, 108, 0.5);
    animation: fadeIn 0.3s;
}

@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}

.close {
    position: absolute;
    top: 20px;
    right: 35px;
    font-size: 45px;
    color: #fff;
    cursor: pointer;
    transition: color 0.3s;
    z-index: 1001;
    line-height: 1;
}

.close:hover {
    color: #f5576c;
}

.nav-buttons button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: #fff;
    font-size: 30px;
    padding: 15px 20px;
    cursor: pointer;
    border-radius: 8px;
    transition: background 0.3s;
}

.nav-buttons button:hover {
    background: rgba(245, 87, 108, 0.7);
}

#prev { left: 20px; }
#next { right: 20px; }

/* Кнопка скачивания в модальном окне */
.download-btn {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    color: #fff;
    text-decoration: none;
    padding: 12px 28px;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s;
    z-index: 1001;
    cursor: pointer;
}

.download-btn:hover {
    background: rgba(245, 87, 108, 0.9);
    border-color: rgba(245, 87, 108, 1);
    transform: translateX(-50%) translateY(-3px);
    box-shadow: 0 8px 20px rgba(245, 87, 108, 0.4);
}

footer {
    text-align: center;
    padding: 30px;
    color: #666;
    font-size: 0.9rem;
}

@media (max-width: 600px) {
    header h1 { font-size: 1.8rem; }
    .gallery { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
    .close { top: 10px; right: 20px; font-size: 35px; }
    .nav-buttons button { padding: 10px 15px; font-size: 22px; }
    .download-btn { bottom: 15px; padding: 10px 22px; font-size: 0.9rem; }
    .gallery-item .download-icon { width: 32px; height: 32px; font-size: 14px; }
}
