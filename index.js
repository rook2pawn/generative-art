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
