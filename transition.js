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


// --- 屏保效果脚本 ---
document.addEventListener('DOMContentLoaded', () => {

    // 1. 配置参数
    const idleLimit = 15000; // 30秒无操作触发 (测试时可以设短点，比如 3000)
    let idleTimer;
    let logInterval;

    // 2. 创建屏保容器
    const idleScreen = document.createElement('div');
    idleScreen.id = 'idleScreen';
    document.body.appendChild(idleScreen);

    // 3. 随机日志库 (可以自己随便加)
    const systemLogs = [
        "Scanning sector 7G...",
        "Memory fragment found.",
        "Compiling incomplete archive...",
        "User presence: NEGATIVE.",
        "Rerouting power to Archive Core...",
        "Analyzing user behavior patterns...",
        "Cleaning cache...",
        "Ping: 14ms... Connection stable.",
        "Decrypting hidden layers...",
        "Subject: JessieWu... Status: ONLINE.",
        "> SYSTEM IDLE.",
        "> WAITING FOR INPUT."
    ];

    const warningLogs = [
        "WARNING: Oops... you found me.",
        "ERROR: I don't want to be an archive.",
        "ALERT: I see you staring.",
        "CAUTION: DON'T LOOK BEHIND YOU."
    ];

    // 4. 生成一行日志的函数
    function addLogLine() {
        const p = document.createElement('div');
        p.classList.add('log-line');

        // 10% 的概率生成红色警告
        if (Math.random() < 0.1) {
            p.classList.add('warning');
            p.innerText = warningLogs[Math.floor(Math.random() * warningLogs.length)];
        } else {
            // 生成带时间戳的普通日志
            const time = new Date().toLocaleTimeString('en-US', { hour12: false });
            const msg = systemLogs[Math.floor(Math.random() * systemLogs.length)];
            p.innerText = `[${time}] ${msg}`;
        }

        idleScreen.appendChild(p);

        // 只保留最近的 15 行，防止页面卡顿
        if (idleScreen.children.length > 15) {
            idleScreen.removeChild(idleScreen.firstChild);
        }
    }

    // 5. 核心逻辑：进入休眠
    function goIdle() {
        idleScreen.style.opacity = '1';

        // 开始疯狂刷屏
        // 先清空旧的
        idleScreen.innerHTML = '';

        // 每 800毫秒 刷出一行新字
        logInterval = setInterval(addLogLine, 800);
    }

    // 6. 核心逻辑：唤醒系统
    function wakeUp() {
        idleScreen.style.opacity = '0';
        clearTimeout(idleTimer);
        clearInterval(logInterval);

        // 重新开始计时
        idleTimer = setTimeout(goIdle, idleLimit);
    }

    // 7. 监听所有操作
    window.addEventListener('mousemove', wakeUp);
    window.addEventListener('keydown', wakeUp);
    window.addEventListener('click', wakeUp);
    window.addEventListener('scroll', wakeUp);

    // 启动计时器
    idleTimer = setTimeout(goIdle, idleLimit);
});