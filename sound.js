document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 配置部分 ---
    const bgmPath = 'sounds/drone.wav';
    const hoverPath = 'sounds/hover.wav';
    const clickPath = 'sounds/click.wav';

    // --- 2. 初始化声音对象 ---
    const bgm = new Audio(bgmPath);
    bgm.loop = true;
    bgm.volume = 0.2;

    let isMuted = true;

    // --- 3. 开关按钮逻辑 (保持不变) ---
    const toggleBtn = document.getElementById('soundToggle');
    const toggleText = toggleBtn.querySelector('.sound-text');

    if (sessionStorage.getItem('audioState') === 'on') {
        isMuted = false;
        toggleBtn.classList.add('active');
        toggleText.innerText = "AUDIO: ON";
        bgm.play().catch(() => console.log("等待交互播放BGM"));
    }

    toggleBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        if (!isMuted) {
            bgm.play();
            toggleBtn.classList.add('active');
            toggleText.innerText = "AUDIO: ON";
            sessionStorage.setItem('audioState', 'on');
            new Audio(clickPath).play();
        } else {
            bgm.pause();
            toggleBtn.classList.remove('active');
            toggleText.innerText = "AUDIO: OFF";
            sessionStorage.setItem('audioState', 'off');
        }
    });

    // --- 4. 全局绑定 (逻辑已修改) ---

    // 【A组】：点击音效 (给所有能点东西都加上)
    // 包含：链接、按钮、导航、作品封面、标签、开关、翻页箭头
    const clickTargets = document.querySelectorAll('a, button, .nav-item, .archive-file, .tag-box, .sound-control, .nav-arrow-btn');

    clickTargets.forEach(el => {
        el.addEventListener('click', () => {
            if (!isMuted) {
                const sound = new Audio(clickPath);
                sound.volume = 0.5;
                sound.play().catch(() => { });
            }
        });
    });

    // 【B组】：悬停音效 (只给作品封面加上) 🟢 修改了这里
    // 只选取 .archive-file (作品格子)
    const hoverTargets = document.querySelectorAll('.archive-file');

    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (!isMuted) {
                const sound = new Audio(hoverPath);
                sound.volume = 0.2;
                sound.play().catch(() => { });
            }
        });
    });

});