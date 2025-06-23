var iUp = (function () {
	var time = 0,
		duration = 150,
		clean = function () {
			time = 0;
		},
		up = function (element) {
			setTimeout(function () {
				element.classList.add("up");
			}, time);
			time += duration;
		},
		down = function (element) {
			element.classList.remove("up");
		},
		toggle = function (element) {
			setTimeout(function () {
				element.classList.toggle("up");
			}, time);
			time += duration;
		};
	return {
		clean: clean,
		up: up,
		down: down,
		toggle: toggle
	};
})();

function getBingImages(imgInfos) {
	var indexName = "bing-image-index";
	var index = sessionStorage.getItem(indexName);
	var panel = document.querySelector('#panel');
	if (isNaN(index) || index == imgInfos.length - 1) index = 0;
	else index++;
	var imgInfo = imgInfos[index];
	var url = "https://cn.bing.com" + imgInfo.url;
	panel.style.background = "url('" + url + "') center center no-repeat #666";
	panel.style.backgroundSize = "cover";
	sessionStorage.setItem(indexName, index);
	
	setupBingInfo(imgInfo);
}

function setupBingInfo(imgInfo) {
	var panel = document.querySelector('#panel');
	var infoContainer = document.getElementById('bing-info-container');
	if (!infoContainer) {
		infoContainer = document.createElement('div');
		infoContainer.className = 'bing-info-container iUp';
		infoContainer.id = 'bing-info-container';
		panel.appendChild(infoContainer);
	}
	
	infoContainer.innerHTML = `
		<div class="bing-info-icon-wrap" style="cursor:pointer;">
			<svg class="bing-info-icon" viewBox="0 0 13 13" fill="currentColor">
				<path d="M6.5 3a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5zm0-3a4.5 4.5 0 0 0-4.5 4.5 5.607 5.607 0 0 0 .087.873c.453 2.892 2.951 5.579 3.706 6.334a1 1 0 0 0 1.414 0c.755-.755 3.253-3.442 3.706-6.334a5.549 5.549 0 0 0 .087-.873 4.5 4.5 0 0 0-4.5-4.5zm3.425 5.218c-.36 2.296-2.293 4.65-3.425 5.782-1.131-1.132-3.065-3.486-3.425-5.782a4.694 4.694 0 0 1-.075-.718 3.5 3.5 0 0 1 7 0 4.634 4.634 0 0 1-.075.718z"/>
			</svg>
			<span class="bing-info-text">INFO</span>
			<div class="bing-info-popup">
				<div class="bing-info-title">${imgInfo.title || ''}</div>
				<div class="bing-info-desc">${imgInfo.copyright || ''}</div>
				<div class="bing-info-author">${imgInfo.copyrightlink ? `<a href=\"${imgInfo.copyrightlink}\" target=\"_blank\">了解更多</a>` : ''}</div>
			</div>
		</div>
	`;
	
	iUp.up(infoContainer);
}

function decryptEmail(encoded) {
	var address = atob(encoded);
	window.location.href = "mailto:" + address;
}

// 获取Bing壁纸信息并显示
function fetchBingInfo() {
	fetch('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN')
		.then(response => response.json())
		.then(data => {
			if (data.images && data.images.length > 0) {
				const img = data.images[0];
				var panel = document.querySelector('#panel');
				var url = "https://cn.bing.com" + img.url;
				panel.style.background = "url('" + url + "') center center no-repeat #666";
				panel.style.backgroundSize = "cover";
				
				setupBingInfo(img);
			}
		});
}

document.addEventListener('DOMContentLoaded', function () {
	// 获取随机圣经句子
	const books = [
		{ id: 'genesis', bookNumber: 1, chapters: 50, name: 'Genesis' },
		{ id: 'psalms', bookNumber: 19, chapters: 150, name: 'Psalms' },
		{ id: 'proverbs', bookNumber: 20, chapters: 31, name: 'Proverbs' },
		{ id: 'john', bookNumber: 43, chapters: 21, name: 'John' },
		{ id: 'romans', bookNumber: 45, chapters: 16, name: 'Romans' }
	];
	const version = 'cns';
	const book = books[Math.floor(Math.random() * books.length)];
	const chapter = Math.floor(Math.random() * book.chapters) + 1;
	fetch(`https://api.getbible.net/v2/${version}/${book.bookNumber}/${chapter}.json`)
		.then(res => res.json())
		.then(data => {
			const verses = Object.values(data.verses);
			const verse = verses[Math.floor(Math.random() * verses.length)];
			const text = verse.text.replace(/<[^>]+>/g, '').trim();
			document.getElementById('description').innerHTML = `${text}<br/> -「<strong>${data.name} ${chapter}:${verse.verse}</strong>」`;
		})
		.catch(() => {
			document.getElementById('description').innerHTML = '加载圣经句子失败，请刷新重试。';
		});

	var iUpElements = document.querySelectorAll(".iUp");
	iUpElements.forEach(function (element) {
		iUp.up(element);
	});

	var avatarElement = document.querySelector(".js-avatar");
	avatarElement.addEventListener('load', function () {
		avatarElement.classList.add("show");
	});

	fetchBingInfo();
});

var btnMobileMenu = document.querySelector('.btn-mobile-menu__icon');
var navigationWrapper = document.querySelector('.navigation-wrapper');

btnMobileMenu.addEventListener('click', function () {
	if (navigationWrapper.style.display == "block") {
		navigationWrapper.addEventListener('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			navigationWrapper.classList.toggle('visible');
			navigationWrapper.classList.toggle('animated');
			navigationWrapper.classList.toggle('bounceOutUp');
			navigationWrapper.removeEventListener('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', arguments.callee);
		});
		navigationWrapper.classList.toggle('animated');
		navigationWrapper.classList.toggle('bounceInDown');
		navigationWrapper.classList.toggle('animated');
		navigationWrapper.classList.toggle('bounceOutUp');
	} else {
		navigationWrapper.classList.toggle('visible');
		navigationWrapper.classList.toggle('animated');
		navigationWrapper.classList.toggle('bounceInDown');
	}
	btnMobileMenu.classList.toggle('social');
	btnMobileMenu.classList.toggle('iconfont');
	btnMobileMenu.classList.toggle('icon-list');
	btnMobileMenu.classList.toggle('social');
	btnMobileMenu.classList.toggle('iconfont');
	btnMobileMenu.classList.toggle('icon-angleup');
	btnMobileMenu.classList.toggle('animated');
	btnMobileMenu.classList.toggle('fadeIn');
});

// The getBingImages function might still be called by your JSONP script:
// <script type="text/javascript" src="./assets/json/images.json?cb=getBingImages"></script>
// Ensure it also correctly relies on CSS for hover if it's used.
// The modification above in getBingImages function handles this.