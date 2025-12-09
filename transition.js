/* --- transition.js 完全替换 --- */
document.addEventListener('DOMContentLoaded', () => {

    const links = document.querySelectorAll('.transition-link');
    const mainContent = document.querySelector('main');

    // 1. 进场动画
    // 判断：如果 main 标签上有 'manual-trigger' 类，全局脚本就不管它
    // 让页面自己的脚本去控制显示时间
    if (mainContent && !mainContent.classList.contains('manual-trigger')) {
        setTimeout(() => {
            mainContent.classList.add('fade-in');
        }, 50);
    }

    // 2. 离场动画 (保持不变)
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.href === window.location.href) return;
            e.preventDefault();
            const targetUrl = link.href;

            if (mainContent) mainContent.classList.remove('fade-in');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 400);
        });
    });
});