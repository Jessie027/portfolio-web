document.addEventListener('DOMContentLoaded', () => {
    const dot = document.getElementById('cursorDot');
    const circle = document.getElementById('cursorCircle');

    // 鼠标当前位置
    let mouseX = 0;
    let mouseY = 0;

    // 圆圈当前的跟随位置 (用于做延迟动画)
    let circleX = 0;
    let circleY = 0;

    // 1. 监听鼠标移动
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // 小点：实时跟随，没有延迟
        if (dot) {
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        }
    });

    // 2. 动画循环 (每一帧更新圆圈位置，实现平滑拖尾)
    function animate() {
        // 让圆圈的位置慢慢接近鼠标位置 (线性插值 lerp)
        // 0.15 是延迟系数，越小越慢/越平滑
        circleX += (mouseX - circleX) * 0.15;
        circleY += (mouseY - circleY) * 0.15;

        if (circle) {
            circle.style.left = circleX + 'px';
            circle.style.top = circleY + 'px';
        }

        requestAnimationFrame(animate);
    }
    animate();

    // 3. 监听 Hover 交互
    // 选取所有需要变光标的元素 (链接、按钮、档案盒、大图等)
    const interactiveElements = document.querySelectorAll('a, button, .archive-file, .center-stage-wrapper, .tag-box');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // 如果是档案盒，用特殊的样式
            if (el.classList.contains('archive-file')) {
                document.body.classList.add('hovering-archive');
            } else {
                // 普通链接，用通用样式
                document.body.classList.add('hovering');
            }
        });

        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
            document.body.classList.remove('hovering-archive');
        });
    });
});