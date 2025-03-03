const greetings = [
    "欢迎来到数字世界 🌍",
    "探索知识与灵感 💡",
    "每日更新技术干货 🚀",
    "记录成长的点滴 📖",
    "与你分享编程乐趣 💻",
    "发现更多精彩内容 ✨"
];

function splitText(text) {
    return text.split('').map(char =>
        `<span style="animation-delay: ${Math.random() * 0.5}s">${char}</span>`
    ).join('');
}

function setRandomGreeting() {
    const subtitle = document.getElementById('subtitle');
    if (subtitle) {
        const randomIndex = Math.floor(Math.random() * greetings.length);
        subtitle.innerHTML = splitText(greetings[randomIndex]);

        // 强制重流动画
        subtitle.style.animation = 'none';
        void subtitle.offsetWidth; // 触发回流
        subtitle.style.animation = 'typing 2s steps(30, end) forwards, fading 1s 3s steps(30, end) forwards';
    }
}

// 初始化设置
document.addEventListener('DOMContentLoaded', () => {
    setRandomGreeting();
    setInterval(setRandomGreeting, 10000); // 10秒切换一次
});