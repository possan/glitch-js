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
	var format = 'image/jpeg';

	function getBase64Image(img) {
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
		var dataURL = canvas.toDataURL(format);
		return dataURL.replace('data:' + format + ';base64,', '');
	}

	var looping_el = null;
	var looping_timer = 0;

	var o = {
		one : function(el, maxg) {
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
			var imagedata = el.getAttribute('x-original');
			if (imagedata == null) {
				imagedata = getBase64Image(el)
				el.setAttribute('x-original', imagedata);
			}
			if (imagedata.length > 100) {
				var bytes = Base64.decode(imagedata);
				/* console.log("decoded bytes length: " + bytes.length); */
				var n = 1 + Math.round(Math.random() * maxg / 20);
				for ( var k = 0; k < n; k++) {
					var i = 10 + Math
							.round(Math.random() * (bytes.length - 10));
					/* console.log('ruining byte ' + i); */
					bytes[i] += Math.round(Math.random() * 10);
				}
				var str = Base64.encode(bytes);
				try {
					el.src = 'data:' + format + ';base64,' + str;
				} catch (e) {
				}
			}
		},
		init : function() {
			var imgs = document.getElementsByTagName('img');
			for ( var i = 0; i < imgs.length; i++) {
				(function() {
					var el = imgs[i];
					el.addEventListener('mouseover', function(e) {
						if (looping_timer != 0)
							clearInterval(looping_timer);

						looping_el = el;
						looping_timer = setInterval(function() {
							o.one(looping_el, 100);
						}, 40);
					});
					el.addEventListener('mouseout', function(e) {
						if (looping_timer != 0) {
							clearInterval(looping_timer);
							looping_timer = 0;
							looping_el = null;
						}
					});
					o.one(el, 200);
				})();
			}
		}
	}
	o.init();
	// target["glitch"] = o;
})();
