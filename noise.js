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
