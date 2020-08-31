const $win = $(window);
const $body = $('body');
const $aside = $('#aside');
const $btnHamburger = $('.btn-nav');

if ( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	$body.addClass('no-touch');
} else {
	$body.addClass('is-touch');
};

$("table").addClass("table");

$win.scroll(function() {
	if($win.scrollTop() > 50) {
		$aside.addClass('aside--fixed');
	}
	else {
		$aside.removeClass('aside--fixed');
	}
})

$btnHamburger.click(function(e) {
	e.preventDefault();

	$body.toggleClass('show-nav');

	if($win.scrollTop() <= 50) {
		if($aside.is('.aside--fixed')) {
			$aside.removeClass('aside--fixed');
		}
		else {
			$aside.addClass('aside--fixed');
		}
	}
});

$(".list-group > ul .list-group-item").click(function(event) {
	event.preventDefault();
	var $this = $(this);
	var hash = $this.attr('href').split('#')[1];
	var $targetElement = $('#' + $.escapeSelector(hash));
	$body.removeClass('show-nav');

	$('html, body').animate({
		scrollTop: $targetElement.offset().top - 85,
	}, 1000);
});

$.fn.isInViewport = function() {
	const $element = $(this);

	const elementHeight = $element.outerHeight();
	const elementTop = $element.offset().top;
	const elementBottom = elementTop + elementHeight;
	const viewportTop = $win.scrollTop();
	const viewportBottom = viewportTop + $win.height();

	return (elementBottom > viewportTop + elementHeight) && (elementTop < viewportBottom - elementHeight);
};

const $articles = $('#main article');
const $navItems = $('.list-group > ul .list-group-item')

if($articles.length) {
	$win.scroll(function() {
		$articles.each(function() {
			const $article = $(this);
			const $head = $article.find('h2');

			if($head.length && $head.isInViewport()) {

				$navItems.removeClass('current');
				$navItems.each(function() {
					let $item = $(this);

					if($item.is('a[href$="' + $head.attr('id') + '"]')) {
						$item.addClass('current');
					}
				}) 
        return false; // break the loop
    }
});
	});
}

(function() {
	var pre = document.getElementsByTagName("pre"),
	pl = pre.length;
	for (var i = 0; i < pl; i++) {
		pre[i].innerHTML =
		'<span class="line-number"></span>' +
		pre[i].innerHTML +
		'<span class="cl"></span>';
		var num = pre[i].innerHTML.split(/\n/).length;

		if($(pre[i]).children('code').is('.language-javascript')) {
			for (var j = 0; j <= num - 1; j++) {
				var line_num = pre[i].getElementsByTagName("span")[0];
				line_num.innerHTML += "<span>" + (j + 1) + "</span>";
			}
		}
		else {
			for (var j = 0; j < num - 1; j++) {
				var line_num = pre[i].getElementsByTagName("span")[0];
				line_num.innerHTML += "<span>" + (j + 1) + "</span>";
			}
		}

	}
})();