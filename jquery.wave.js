// This is a jquery plugin which waves text.
//
// !! caution !!
// This script can load very heavy process to user if you set parameter "smooth"
// on long text. So you shouldn't set effect on such situation.
//
// USAGE
// $('wave-it').wave({speed:50,amplitude:4});
//
// PARAMETERS
// There are six parameters.
// speed
//   Speed of wave. Smaller is faster. Default value is 50.
// interval
//   Time which text moving. Bigger is longer. Default value is 100.
// amplitude
//	 Amplitude of wave. Bigger is higher. Default value is 3. 
// direction
//   Direction of waves. You can set "vertical" or "horizontal".
// type
//   Type of waves. You can set "simple" or "smooth"(heavy). 
// waveClass
//   Class name for wave element. Default value is "waveElem".

(function($){
	$.fn.wave = function(params) {
		params = params ? params : {};
		var _speed     = params.speed ? params.speed : 50;
		var _interval  = params.interval ? params.interval : 100;
		var _amplitude = params.amplitude ? params.amplitude : 3;
		var _direction = params.direction ? params.direction : 'vertical';
		var _type      = params.type ? params.type : 'simple';
		var _waveClass = params.className ? params.className : 'waveElem';
		
		///// set animate parameter
		var upParam;
		var downParam;
		switch(_direction) {
			case 'horizontal' :
				moveto    = 'left';
				upParam   = {left : '-' + _amplitude + 'px'};
				downParam = {left : '0px'};
				break;
			case 'vertical' :
			default :
				moveto    = 'top';
				upParam   = {top : '-' + _amplitude + 'px'};
				downParam = {top : '0px'};
				break;
		}
		
		///// set action
		var upAction;
		var downAction;
		switch(_type) {
			case 'smooth' :
				upAction = function($e) {
					$e.animate(upParam, _interval);
				}
				downAction = function($e) {
					$e.animate(downParam, _interval);
				}
				break;
			case 'simple' :
			default :
				upAction = function($e) {
					$e.css(moveto, '-' + _amplitude + 'px');
				}
				downAction = function($e) {
					$e.css(moveto, '0px');
				}
				break;
		}
		
		///// decompose text
		$(this).each(function() {
			var text = $(this).html();
			$(this).html(text.replace(
				/(.)/g,
				'<span class="' + _waveClass + '">$1</span>'));
			$(this).children('.' + _waveClass).css('position', 'relative');
		}).css('position, relative');
		
		///// wave
		$(this).mouseover(function(){
			$(this).children('.' + _waveClass).each(function(i) {
				var $e = $(this);
				setTimeout(function(){
					upAction($e)
				}, _speed * i);
				setTimeout(function(){
					downAction($e)
				}, _speed * i + _interval);
			});
		});
	};
})(jQuery);
