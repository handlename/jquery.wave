// TASK アニメーション
// TASK 入れ子になった要素への対応	

(function($){
	$.fn.wave = function(params) {
		params = params ? params : {};
		var _speed     = params.speed ? params.speed : 50;
		var _interval  = params.interval ? params.interval : 100;
		var _amplitude = params.amplitude ? params.amplitude : 3;
		var _direction = params.direction ? params.direction : 'vertical';
		var _type      = params.type ? params.type : 'simple';
		var _waveClass = params.className ? params.className : 'waveElem';
		
		switch(_direction) {
			case 'horizontal' : moveto = 'left'; break;
			case 'vertical' : default : moveto = 'top'; break;
		}
		
		var action = function(params) {
			$e.css(moveto, '-' + _amplitude + 'px');
		}
		
		///// 文字列を分解
		$(this).each(function() {
			var text = $(this).html();
			$(this).html(text.replace(
				/(.)/g,
				'<span class="' + _waveClass + '">$1</span>'));
			$(this).children('.' + _waveClass).css('position', 'relative');
		}).css('position, relative');
		
		///// 波打たせる
		$(this).mouseover(function(){
			$(this).children('.' + _waveClass).each(function(i) {
				var $e = $(this);
				setTimeout(function() {
//					$e.css(moveto, '-' + _amplitude + 'px');
					$e.animate({left:'-10px'}, _interval);
				}, _speed * i);
				setTimeout(function() {
//					$e.css(moveto, '0px');
					$e.animate({left:'0px'}, _interval);
				}, _speed * i + _interval);
			});
		});
	};
})(jQuery);
