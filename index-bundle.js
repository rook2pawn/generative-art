(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var noise = require('./noise');
var qs = require('querystring');

var globals = { width: 320, height: 320 };

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || 
        function(callback) {
            window.setTimeout(callback, 1000/60)
        };
})();
$(window).ready(function() {
    var query = '';
    if (location.search.substr(0,1) == '?')
        query = location.search.substr(1);
    else
        query = location.search;
    var obj = qs.parse(query);
    if ((obj.pageNum == '') || (obj.pageNum === undefined)) {
        obj.pageNum = 1; 
    }
    obj.pageNum = parseInt(obj.pageNum);
    $(window).keydown(function(e) {
        // up = 38
        // left = 37
        // right = 39
        // down = 40 
        switch (e.which) {
            case 37 : 
                obj.pageNum--;
                if (obj.pageNum < 1) {
                    obj.pageNum = 1;
                }
                window.location = location.origin.concat(location.pathname).concat('?pageNum=').concat(obj.pageNum);
                break;
            case 39 :
                obj.pageNum++;
                window.location = location.origin.concat(location.pathname).concat('?pageNum=').concat(obj.pageNum);
                break;
            default:
                break;
        }
    });
    $('div.example').hide();
    $('div.page' + obj.pageNum).show();
    var draw = function() {
        $('#log').html(obj.pageNum);
        switch (obj.pageNum) {
            case 1 :
                var rc = $('#randomcanvas').get(0);
                rc.width = globals.width;
                rc.height = globals.height;
                noise.noise(rc);
                break;
            case 2 :
                var oc = $('#page2canvas').get(0);
                oc.width = globals.width;
                oc.height = globals.height;
                noise.noise(oc,{w:20,h:20});
            case 3 : 
                var oc = $('#page3canvas').get(0);
                oc.width = globals.width;
                oc.height = globals.height;
                noise.noise(oc,{w:40,h:40});
                break;
            case 4 :
                var oc = $('#page4canvas').get(0);
                oc.width = globals.width;
                oc.height = globals.height;
                noise.noise(oc,{w:320,h:320,border:true});
                noise.noise(oc,{w:160,h:160,border:true});
                noise.noise(oc,{w:80,h:80,border:true});
                noise.noise(oc,{w:40,h:40,border:true});
                noise.noise(oc,{w:20,h:20,border:true});
                break;
            case 5 :
                var oc = $('#page5canvas').get(0);
                oc.width = globals.width;
                oc.height = globals.height;
                noise.noise(oc,{w:320,h:320,border:true});
                noise.noise(oc,{w:160,h:160,border:true,alpha:0.8});
                noise.noise(oc,{w:80,h:80,border:true,alpha:0.6});
                noise.noise(oc,{w:40,h:40,border:true,alpha:0.4});
                noise.noise(oc,{w:20,h:20,border:true,alpha:0.2});
                break;
            case 6 :
                var oc = $('#page6canvas').get(0);
                oc.width = globals.width;
                oc.height = globals.height;
                noise.noise(oc,{w:320,h:320,border:true});
                noise.noise(oc,{w:160,h:160,fillwidth:320,fillheight:320,border:true,alpha:0.8});
                noise.noise(oc,{w:80,h:80,fillwidth:320,fillheight:320,border:true,alpha:0.6});
                noise.noise(oc,{w:40,h:40,fillwidth:320,fillheight:320,border:true,alpha:0.4});
                noise.noise(oc,{w:20,h:20,fillwidth:320,fillheight:320,border:true,alpha:0.2});
                break;
            case 7 :
                var oc = $('#page7canvas').get(0);
                oc.width = globals.width;
                oc.height = globals.height;
                noise.octaveNoise(oc,{octaves:8});
                break;
            case 8 :
                var rc = $('#page8canvas_a').get(0);
                rc.width = globals.width;
                rc.height = globals.height;
                noise.noise(rc,{w:40,h:40,fillwidth:rc.width,fillheight:rc.height});
                var rc2 = $('#page8canvas_b').get(0);
                rc2.width = globals.width;
                rc2.height = globals.height;
                noise.noise(rc2,{w:40,h:40,fillwidth:rc.width,fillheight:rc.height,isSmooth:true});
                break;
            case 9 :
                var rc = $('#page9canvas_a').get(0);
                rc.width = globals.width;
                rc.height = globals.height;
                noise.octaveNoise(rc,{octaves:8,isSmooth:false});
                var oc = $('#page9canvas_b').get(0);
                oc.width = globals.width;
                oc.height = globals.height;
                noise.octaveNoise(oc,{octaves:8,isSmooth:true});
                break;
            case 10 :
                var oc = $('#page10canvas').get(0);
                oc.width = ~~(globals.width*2);
                oc.height = ~~(globals.height*1.5);
                noise.octaveNoise(oc,{octaves:8,isSmooth:true});
                break;
            case 11 :
                var oc = $('#page11canvas').get(0);
                oc.width = ~~(globals.width*2);
                oc.height = ~~(globals.height*1.5);
                noise.noise(oc,{w:2,h:2,fillwidth:oc.width,fillheight:oc.height});
                break;
            case 12 :
                var oc = $('#page12canvas').get(0);
                oc.width = ~~(globals.width*2);
                oc.height = ~~(globals.height*1.5);
                noise.noise(oc,{w:2,h:2,fillwidth:oc.width,fillheight:oc.height,isSmooth:true});
                break;
            case 13 :
                var ac = $('#page13canvas_aa').get(0);
                ac.width = ~~(globals.width/1.5);
                ac.height = ~~(globals.height/1.5);
                noise.noise(ac,{w:1,h:1,fillwidth:ac.width,fillheight:ac.height,isSmooth:false});
                var ac2 = $('#page13canvas_ab').get(0);
                ac2.width = ~~(globals.width/1.5);
                ac2.height = ~~(globals.height/1.5);
                noise.noise(ac2,{w:1,h:2,fillwidth:ac.width,fillheight:ac.height,isSmooth:false});
                var ac3 = $('#page13canvas_ac').get(0);
                ac3.width = ~~(globals.width/1.5);
                ac3.height = ~~(globals.height/1.5);
                noise.noise(ac3,{w:3,h:5,fillwidth:ac.width,fillheight:ac.height,isSmooth:false});
                var ac4 = $('#page13canvas_ad').get(0);
                ac4.width = ~~(globals.width/1.5);
                ac4.height = ~~(globals.height/1.5);
                noise.noise(ac4,{w:10,h:10,fillwidth:ac.width,fillheight:ac.height,isSmooth:false});
                var oc = $('#page13canvas_a').get(0);
                oc.width = ~~(globals.width/1.5);
                oc.height = ~~(globals.height/1.5);
                noise.noise(oc,{w:1,h:1,fillwidth:oc.width,fillheight:oc.height,isSmooth:true});
                var oc2 = $('#page13canvas_b').get(0);
                oc2.width = ~~(globals.width/1.5);
                oc2.height = ~~(globals.height/1.5);
                noise.noise(oc2,{w:1,h:2,fillwidth:oc.width,fillheight:oc.height,isSmooth:true});
                var oc3 = $('#page13canvas_c').get(0);
                oc3.width = ~~(globals.width/1.5);
                oc3.height = ~~(globals.height/1.5);
                noise.noise(oc3,{w:3,h:5,fillwidth:oc.width,fillheight:oc.height,isSmooth:true});
                var oc4 = $('#page13canvas_d').get(0);
                oc4.width = ~~(globals.width/1.5);
                oc4.height = ~~(globals.height/1.5);
                noise.noise(oc4,{w:10,h:10,fillwidth:oc.width,fillheight:oc.height,isSmooth:true});
                break;
            default:
                break;
        }
    }
    var animate = function() {
        requestAnimFrame(animate)
        draw();
    };
    animate();
    
/*
        var nc = $('#noisecanvas').get(0);
        noise.noise(nc,{w:2,h:2,fillwidth:nc.width,fillheight:nc.height,isSmooth:true});
*/
});

},{"./noise":2,"querystring":5}],2:[function(require,module,exports){
var _tc = document.createElement('canvas');

var scaler = function(canvasA,canvasB,scalex,scaley,isSmooth) {
    var ctx = canvasB.getContext('2d');
    ctx.save();
    if ((isSmooth !== undefined) && (isSmooth === true)) {
    } else {
        ctx.imageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
    }
    ctx.scale(scalex,scaley);
    ctx.drawImage(canvasA,0,0); 
    ctx.restore();
}
exports.scaler = scaler;
var noise = function(canvas,options) {
    if (options === undefined) 
        options = {};
    var w = options.w || canvas.width || 80,
    h = options.h || canvas.height || 80,
    fillwidth = options.fillwidth,
    fillheight = options.fillheight,
    border = options.border || false,
    isSmooth = options.isSmooth || false,
    alpha = options.alpha || 1,
    gc = options.globalComposite;
// w,h specify width and height for the noise if defined
// fillwidth and fillheight specify the fill width and fill height
// if defined
    var ctx = canvas.getContext('2d');
    ctx.save();
    if (gc !== undefined) {
        ctx.globalAlpha = 0.2;
        ctx.globalCompositeOperation = gc;
    }
    var imgData = ctx.getImageData(0, 0, w || canvas.width, h || canvas.height);
    var data = imgData.data;
    var pixels = data.length;
    for(var i = 0; i < pixels; i+=4){
        data[i] = Math.random()*255;
        data[i+1] = Math.random()*255;
        data[i+2] = Math.random()*255;
        data[i+3] = 255 * alpha;
    }
    if ((fillwidth !== undefined) && (fillheight !== undefined)) {
        _tc.width = fillwidth;
        _tc.height = fillheight;
        _tc.getContext('2d').putImageData(imgData,0,0);
        var scalex = fillwidth/w;
        var scaley = fillheight/h;
        scaler(_tc,canvas,scalex,scaley,isSmooth);
        if (border === true) {
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#FF0000';
            ctx.strokeRect(0,0,fillwidth,fillheight);
        }
    } else {
        ctx.putImageData(imgData, 0, 0);
        if (border === true) {
            ctx.lineWidth = 3;
            ctx.strokeStyle = '#FF0000';
            ctx.strokeRect(0,0,w,h);
        }
    }
    ctx.restore();
}
exports.noise = noise;
var makeNoise = function(width, height){
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    noise(canvas);
    return canvas;
}
exports.makeNoise = makeNoise;
var octaveNoise = function(canvas, options) {
    var octaves = options.octaves,
    isSmooth = options.isSmooth || false;
    var ctx = canvas.getContext('2d');
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalAlpha = 1/octaves;
    ctx.globalCompositeOperation = 'lighter';
    var width = canvas.width; var height = canvas.height;
    for(var i = 0; i < octaves; i++){
        var ax = width >> i;
        var ay = height >> i;
        noise(canvas,{w:ax,h:ay,fillwidth:width,fillheight:height,isSmooth:isSmooth});
    }
    ctx.restore();
}
exports.octaveNoise = octaveNoise;
var makeOctaveNoise = function(width, height, octaves){
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    octaveNoise(canvas,octaves);
}
exports.makeOctaveNoise = makeOctaveNoise;

},{}],3:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],4:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],5:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":3,"./encode":4}]},{},[1])