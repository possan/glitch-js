(function(){function j(b){var f="xdomglitch"+Math.round(Math.random()*1E7),a="http://possan.se/glitch/proxy.php?format=base64&callback="+escape(f)+"&url="+escape(b.src);window[f]=function(a){b.setAttribute("x-original",a);b.setAttribute("x-status","loaded")};document.body.appendChild(document.createElement("script")).src=a}var g=null,c=0,i={a:function(b,f){var a=b.getAttribute("x-status");if(a==null||a==""){a=b.getAttribute("x-original-width");if(a==null)a=b.width,b.setAttribute("x-original-width",
a),b.style.width=a+"px";a=b.getAttribute("x-original-height");if(a==null)a=b.height,b.setAttribute("x-original-height",a),b.style.height=a+"px";a=b.src;a=a.substr(a.lastIndexOf(".")+1).toLowerCase();b.setAttribute("x-status","inited");a=="png"?b.setAttribute("x-type","image/png"):a=="gif"?b.setAttribute("x-type","image/gif"):b.setAttribute("x-type","image/jpeg")}else if(a=="inited")j(b),b.setAttribute("x-status","loading");else if(a!="loading"&&a=="loaded"){var a=parseInt(b.getAttribute("x-original-width")),
d=parseInt(b.getAttribute("x-original-height")),e=parseInt(b.getAttribute("x-mouse-x")),c=parseInt(b.getAttribute("x-mouse-y")),e=100-Math.round(200*(Math.abs(e-a/2)/a+Math.abs(c-d/2)/d));e<0&&(e=0);e>100&&(e=100);a=b.getAttribute("x-type");d=b.getAttribute("x-original");console.log(a);if(d.length>100){e=1+Math.round(Math.random()*f*e/200);for(c=0;c<e;c++)var g=10+Math.round(Math.random()*(d.length-10)),h="0123456789ABCDEF"[Math.floor(Math.random()*16)],d=d.substr(0,g)+h+d.substr(g+h.length);try{b.src=
"data:"+a+";base64,"+d}catch(i){}}}}};setTimeout(function(){for(var b=document.getElementsByTagName("img"),f=0;f<b.length;f++)(function(){var a=b[f];a.addEventListener("mousemove",function(b){a.setAttribute("x-mouse-x",b.offsetX);a.setAttribute("x-mouse-y",b.offsetY)});a.addEventListener("mouseover",function(b){a.setAttribute("x-mouse-x",b.offsetX);a.setAttribute("x-mouse-y",b.offsetY);c!=0&&clearInterval(c);g=a;c=setInterval(function(){i.a(g,200)},40)});a.addEventListener("mouseout",function(){c<
0||(clearInterval(c),c=0,g=null)})})()},300)})();
