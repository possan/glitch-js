(function(target) {

	var Base64 = {

		// private property
		_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

		// public method for encoding
		encode : function(input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			while (i < input.length) {

				chr1 = input[i++];
				chr2 = input[i++];
				chr3 = input[i++];

				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;

				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}

				output = output + this._keyStr.charAt(enc1)
						+ this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3)
						+ this._keyStr.charAt(enc4);

			}

			return output;
		},

		// public method for decoding
		decode : function(input) {
			var output = [];
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;

			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

			while (i < input.length) {

				enc1 = this._keyStr.indexOf(input.charAt(i++));
				enc2 = this._keyStr.indexOf(input.charAt(i++));
				enc3 = this._keyStr.indexOf(input.charAt(i++));
				enc4 = this._keyStr.indexOf(input.charAt(i++));

				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;

				output.push(chr1);

				if (enc3 != 64) {
					output.push(chr2);
				}
				if (enc4 != 64) {
					output.push(chr3);
				}
			}

			// output = Base64._utf8_decode(output);

			return output;

		}

	}	

	function updateBase64Data(img) {
		
		// cross domain hack:
		
		var cb = 'xdomglitch'+Math.round(Math.random()*10000000);
		var u = 'http://possan.se/glitch/proxy.php?format=base64&callback='+escape(cb)+'&url='+escape(img.src);
		// console.log(u);
		
		window[cb] = function(b64){
		//	console.log('in base64-callback from proxy.');
			img.setAttribute('x-original', b64);	
			img.setAttribute('x-status', 'loaded');
		}

		document.body.appendChild(document.createElement('script')).src = u;

		// document.body.appendChild(document.createElement('script')).src=u;
		/*
		// local version...
		
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
		var dataURL = canvas.toDataURL(format);
		var b64 = dataURL.replace('data:' + format + ';base64,', '');
		img.setAttribute('x-original', b64);	
		img.setAttribute('x-loading', '0');
		*/
	}
	
	
	var looping_el = null;
	var looping_timer = 0;

	var o = {
		 
	 	one : function(el, maxg) {
			
			var tmp = el.getAttribute('x-status');

			// console.log('element',el,'status',tmp);

			if( tmp == null || tmp == '' ){
			
				var width = el.getAttribute('x-original-width');
				if (width == null) {
					width = el.width;
					el.setAttribute('x-original-width', width);
					el.style.width = width + 'px';
				}
				
				var height = el.getAttribute('x-original-height');
				if (height == null) {
					height = el.height;
					el.setAttribute('x-original-height', height);
					el.style.height = height + 'px';
				}

				var ext = el.src;
				var ei = ext.lastIndexOf('.');
				ext = ext.substr( ei+1 ).toLowerCase();
				// console.log(ext);
				el.setAttribute('x-status', 'inited');
				if( ext == 'png' )	
					el.setAttribute('x-type', 'image/png');
				else if( ext == 'gif' )	
					el.setAttribute('x-type', 'image/gif');
				else
					el.setAttribute('x-type', 'image/jpeg');
			}
			else if( tmp == 'inited') {
				updateBase64Data(el);
				el.setAttribute('x-status', 'loading');
			}
			else if( tmp == 'loading' ) {
				// wait..
			}
			else if( tmp == 'loaded' ) {
				var w = parseInt( el.getAttribute('x-original-width') );
				var h = parseInt( el.getAttribute('x-original-height') );
				var x = parseInt( el.getAttribute('x-mouse-x') );
				var y = parseInt( el.getAttribute('x-mouse-y') );
				
				var a = 100 - Math.round( 200 * ((Math.abs(x-w/2)/w) + (Math.abs(y-h/2)/h)) );
				if( a < 0 )	a = 0;
				if( a > 100 ) a = 100;
				
				// console.log('a='+a);
				// return;
				var imagetype = el.getAttribute('x-type');
				var imagedata = el.getAttribute('x-original');
				
		//		console.log( imagetype );
		//		console.log( imagedata.length );
				
				if (imagedata.length > 100) {
					var chs = '0123456789ABCDEF';
					var n = 1 + Math.round(Math.random() * maxg * a / 200);
					// console.log('n='+n);
					for ( var k = 0; k < n; k++) {
						var i = 10 + Math.round(Math.random() * (imagedata.length - 10));
						// var ch = bytes.substr(i,1);
						var ch = chs[ Math.floor( Math.random() * 16 ) ];
						imagedata = imagedata.substr(0, i) + ch + imagedata.substr(i+ch.length);
					}
					/*
					var bytes = Base64.decode(imagedata);
					var n = 1 + Math.round(Math.random() * maxg / 20);
					for ( var k = 0; k < n; k++) {
						var i = 10 + Math.round(Math.random() * (bytes.length - 10));
						bytes[i] += Math.round(Math.random() * 10);
					}
					var str = Base64.encode(bytes);
					*/					
					try {
						el.src = 'data:' + imagetype + ';base64,' + imagedata;
					} catch (e) {
						// console.log(e);
					}	
				}
			}
		}
	}

	
	setTimeout(function() {
		
//		var tmp = document.body.getAttribute('x-glitch-loaded');
//		if( typeof(tmp) != 'undefined' )
	//		return;
			
//		document.body.setAttribute('x-glitch-loaded','1');
		
		var imgs = document.getElementsByTagName('img');
		for ( var i = 0; i < imgs.length; i++) {
			(function() {
				
				var el = imgs[i];

				el.addEventListener( 'mousemove', function(e) { 
					el.setAttribute('x-mouse-x', e.offsetX);
					el.setAttribute('x-mouse-y', e.offsetY);
				} );
				
				el.addEventListener( 'mouseover', function(e) { 
					el.setAttribute('x-mouse-x', e.offsetX);
					el.setAttribute('x-mouse-y', e.offsetY);
					if (looping_timer != 0)
						clearInterval(looping_timer);
					looping_el = el;
					looping_timer = setInterval(function() {
						o.one(looping_el, 200);
					}, 40);
				} );
				
				el.addEventListener( 'mouseout', function(e) {
					if (looping_timer < 0)
						return;
					clearInterval(looping_timer);
					looping_timer = 0;
					looping_el = null;
				} );
				
				// o.init(el, 200);
				
			})();
		}
	}, 300);
	// target["glitch"] = o;
})();
