window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || 
        function(callback) {
            window.setTimeout(callback, 1000/60)
        };
})();
var p = {vx:1, vy:1,x:20,y:20};

var options = { 
    exposure : 1,
    intensity: 1,
    r: 1,
    g: 0.1,
    b: 0.1,
    damping:0.8,
    noisy:1,
    fuzz:1
};
function tonemap(n){
    return (1-Math.pow(2, -n*0.005*options.exposure))*255;
}
function makeOctaveNoise(id,width, height, octaves){
    var canvas = $('#'+id).get(0);
    var ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,width,height);

    ctx.globalAlpha = 1/octaves;
    ctx.globalCompositeOperation = 'lighter';

    for(var i = 0; i < octaves; i++){
        var octave = makeNoise(width>>i, height>>i);
        ctx.drawImage(octave, 0, 0, width, height);
    }

    return canvas;
}

function makeNoise(width, height){
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    var imgData = ctx.getImageData(0, 0, width, height),
        data = imgData.data,
        pixels = data.length;

    for(var i = 0; i < pixels; i+=4){
        data[i] = Math.random()*255;
        data[i+1] = Math.random()*255;
        data[i+2] = Math.random()*255;
 //       data[i+1] = data[i];
   //     data[i+2] = data[i];
        data[i+3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);

    return canvas;
}

$(window).ready(function() {
var noisecanvas = makeOctaveNoise('noisecanvas',320,240, 30);

var noise = noisecanvas.getContext('2d').getImageData(0, 0, noisecanvas.width, noisecanvas.height).data;
var hdrdata, imgdata,data,canvas;
    console.log("ready!");
/*
    var hdrdata = Array
        .apply({},Array(noiselength))
        .map(function() { return 0 });
*/

    canvas = $('#mycanvas').get(0);
    canvas.width = noisecanvas.width;
    canvas.height = noisecanvas.height;

    var fuzzy = function(range,base) {
        return (base || 0) + (Math.random() - 0.5) * range * 2;
    }
    var getNoise = function(x,y,channel,noise,width) {
        return noise[(~~x+~~y*width)*4+channel]/127-1.0;
    }
    var draw = function() {
        p.vx = p.vx*options.damping + getNoise(p.x, p.y, 0,noise,noisecanvas.width)*4*options.noisy+fuzzy(0.1)*options.fuzz;
        p.vy = p.vy*options.damping + getNoise(p.x, p.y, 1,noise,noisecanvas.width)*4*options.noisy+fuzzy(0.1)*options.fuzz;
        for(var j = 0; j < 10; j++){
            p.x += p.vx*0.1;
            p.y += p.vy*0.1;
            if(p.x < 0 || p.x >= canvas.width || p.y < 0 || p.y >= canvas.height)
                continue;
            var index = (~~p.x+~~p.y*canvas.width)*4;
            data[index] = 255;
            data[index+1] = 0;
            data[index+2] = 0;
/*
            data[index] = tonemap(hdrdata[index] += options.r*options.intensity);
            data[index+1] = tonemap(hdrdata[index+1] += options.g*options.intensity);
            data[index+2] = tonemap(hdrdata[index+2] += options.b*options.intensity);
*/
        }
        if(p.x < 0 || p.x >= canvas.width || p.y < 0 || p.y >= canvas.height) {
            p.x = ~~canvas.width/2; p.y = ~~canvas.height/2;
        }
        canvas.getContext('2d').putImageData(imgdata, 0, 0);
    };
    var animate = function() {
        console.log("Animate start");
        requestAnimFrame(animate)
        draw();
    };
    var ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    imgdata = ctx.getImageData(0, 0, canvas.width, canvas.height);
    data = imgdata.data;
    hdrdata = new window.Float32Array(data.length);
    for(var i = 0; i < hdrdata.length; i++) {
        hdrdata[i] = 0;
    }
    animate();
});
