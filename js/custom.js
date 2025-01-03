// 弹窗功能
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('footprint-modal');
    const btn = document.getElementById('footprint-btn');
    const span = document.getElementsByClassName('close')[0];

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
    
    // 获取圣经经文
    fetchBibleVerse();
});

// 获取圣经经文的函数
async function fetchBibleVerse() {
    try {
        const response = await fetch('https://bible-api.com/john+3:16?translation=ckjv');
        const data = await response.json();
        const description = document.getElementById('description');
        if (description) {
            description.innerHTML = `"${data.text}"<br>- ${data.reference}`;
        }
    } catch (error) {
        console.error('获取圣经经文失败:', error);
    }
} 