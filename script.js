// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const searchBtn = document.getElementById('searchBtn');
    const toolCards = document.querySelectorAll('.tool-card');

    // 搜索功能
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        toolCards.forEach(card => {
            const cardContent = card.textContent.toLowerCase();
            const cardLinks = card.querySelectorAll('a');
            let shouldShow = false;

            // 检查卡片内容
            if (cardContent.includes(searchTerm)) {
                shouldShow = true;
            }

            // 检查链接文本和 URL
            cardLinks.forEach(link => {
                if (link.textContent.toLowerCase().includes(searchTerm) ||
                    link.href.toLowerCase().includes(searchTerm)) {
                    shouldShow = true;
                }
            });

            // 显示或隐藏卡片
            card.style.display = shouldShow ? 'block' : 'none';

            // 处理父级 section 的显示
            const parentSection = card.closest('.tool-section');
            if (parentSection) {
                const visibleCards = parentSection.querySelectorAll('.tool-card[style="display: block"]');
                parentSection.style.display = visibleCards.length > 0 ? 'block' : 'none';
            }
        });
    }

    // 绑定搜索按钮点击事件
    searchBtn.addEventListener('click', performSearch);

    // 绑定回车键搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 实时搜索（可选，取消注释启用）
    /*
    searchInput.addEventListener('input', debounce(function() {
        performSearch();
    }, 300));
    */

    // 防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 