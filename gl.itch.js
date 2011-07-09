(function() {
  var l = {a:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", d:function(b) {
    for(var d = "", a, e, h, g, i, f, c = 0;c < b.length;) {
      a = b[c++], e = b[c++], h = b[c++], g = a >> 2, a = (a & 3) << 4 | e >> 4, i = (e & 15) << 2 | h >> 6, f = h & 63, isNaN(e) ? i = f = 64 : isNaN(h) && (f = 64), d = d + this.a.charAt(g) + this.a.charAt(a) + this.a.charAt(i) + this.a.charAt(f)
    }
    return d
  }, c:function(b) {
    for(var d = [], a, e, c, g, i, f = 0, b = b.replace(/[^A-Za-z0-9\+\/\=]/g, "");f < b.length;) {
      a = this.a.indexOf(b.charAt(f++)), e = this.a.indexOf(b.charAt(f++)), g = this.a.indexOf(b.charAt(f++)), i = this.a.indexOf(b.charAt(f++)), a = a << 2 | e >> 4, e = (e & 15) << 4 | g >> 2, c = (g & 3) << 6 | i, d.push(a), g != 64 && d.push(e), i != 64 && d.push(c)
    }
    return d
  }}, j = null, c = 0, k = {b:function(b, c) {
    var a = b.getAttribute("x-original-width");
    if(a == null) {
      a = b.width, b.setAttribute("x-original-width", a), b.style.width = a + "px"
    }
    a = b.getAttribute("x-original-height");
    if(a == null) {
      a = b.height, b.setAttribute("x-original-height", a), b.style.height = a + "px"
    }
    a = b.getAttribute("x-original");
    if(a == null) {
      a = document.createElement("canvas"), a.width = b.width, a.height = b.height, a.getContext("2d").drawImage(b, 0, 0), a = a.toDataURL("image/jpeg").replace("data:image/jpeg;base64,", ""), b.setAttribute("x-original", a)
    }
    if(a.length > 100) {
      for(var a = l.c(a), e = 1 + Math.round(Math.random() * c / 20), h = 0;h < e;h++) {
        a[10 + Math.round(Math.random() * (a.length - 10))] += Math.round(Math.random() * 10)
      }
      a = l.d(a);
      try {
        b.src = "data:image/jpeg;base64," + a
      }catch(g) {
      }
    }
  }, e:function() {
    for(var b = document.getElementsByTagName("img"), d = 0;d < b.length;d++) {
      (function() {
        var a = b[d];
        a.addEventListener("mouseover", function() {
          c != 0 && clearInterval(c);
          j = a;
          c = setInterval(function() {
            k.b(j, 100)
          }, 40)
        });
        a.addEventListener("mouseout", function() {
          c != 0 && (clearInterval(c), c = 0, j = null)
        });
        k.b(a, 200)
      })()
    }
  }};
  k.e()
})();

