// Peril.js 
// Library for Web Audio API
// Developed by Min Nam
// jabuem.co

var Scope = function(){
	var container, bar, scope;
	var x1, y1, x2, y2, selected = null;
	var analyser, noDataPoints, freqData;

	var initElements = function(){
		container = document.createElement("div");	
		container.style.width = "250px";
		container.style.height = "150px";
		// container.style.background = "white";
		// container.style.border = "1px solid grey"
		container.style.color = "black";
		container.style.position = "absolute";
		container.style.top = 0;
		document.body.appendChild(container);
		
		bar = document.createElement("div");	
		bar.style.width = "100%";	
		bar.style.height = "5%";
		// bar.style.background = "grey";
		// bar.style.borderBottom = "1px solid grey"
		bar.style.color = "black";
		container.appendChild(bar);
		
		bar.onmousedown = function(e){
			selected = container;
			x1 = x2 - container.offsetLeft;
			y1 = y2 - container.offsetTop;
		}

		document.onmouseup = function(e){		
			selected = null;		
		}

		document.onmousemove = function(e){
			x2 = document.all ? window.event.clientX : e.pageX;		
	    	y2 = document.all ? window.event.clientY : e.pageY;
			if(selected != null){
				var posX = x2 - x1;
				var posY = y2 - y1;

				if(  posX >= 0){
					container.style.left = (x2 - x1) + 'px';
				}else{
					container.style.left = '0px';
				}
		    	
		    	if(  posY >= 0){
					container.style.top = (y2 - y1) + 'px';
				}else{
					container.style.top =  '0px';
				}		    	
		        
			}		
		}
	}
	initElements();

	var HEIGHT, WIDTH, ctx, ghostcanvas, gctx;
	var initCanvas = function(){
		scope = document.createElement("canvas");
		scope.style.height = "95%";
		scope.style.width  = "100%";
		container.appendChild(scope);

		
	  	HEIGHT = scope.height;
	  	WIDTH = scope.width;
	  	ctx = scope.getContext('2d');
	  	ghostcanvas = document.createElement('canvas');
	  	ghostcanvas.height = HEIGHT;
	  	ghostcanvas.width = WIDTH;
	  	gctx = ghostcanvas.getContext('2d');

	  	analyser = AC.createAnalyser();
		

		
		freqData = new Uint8Array(analyser.frequencyBinCount);

	  	// scope.onselectstart = function () { return false; }
	  	draw();
	  	// window.requestAnimationFrame(draw);
	}

	var clear = function(){
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		ctx.beginPath();
		ctx.strokeStyle = "rgb(150,150,150)";		
		ctx.moveTo(0, 0.5);
		ctx.lineTo(500, 0.5);
		ctx.moveTo(0, HEIGHT / 4);
		ctx.lineTo(500, HEIGHT / 4);
		ctx.moveTo(0, HEIGHT / 2 - 0.5);
		ctx.lineTo(500, HEIGHT / 2 - 0.5);
		ctx.moveTo(0, HEIGHT * 0.75 );
		ctx.lineTo(500, HEIGHT * 0.75);
		ctx.moveTo(0, HEIGHT - 0.5 );
		ctx.lineTo(500, HEIGHT - 0.5);
		ctx.lineWidth = 1;
		ctx.stroke();
	}

	var fps = 12;
	var now;
	var then = Date.now();
	var interval = 1000/fps;
	var delta;

	var draw = function(){
		requestAnimationFrame(draw);
		now = Date.now();
		delta = now - then;
		//console.log(delta);
		
		if (delta > interval) {
			clear();
			analyser.getByteTimeDomainData(freqData);
			then = now - (delta % interval);
		
			ctx.lineJoin = 'round';
			ctx.beginPath();		
			ctx.strokeStyle = "rgb(30,30,30)";
			var ycc = (freqData[0] / 128) * (HEIGHT / 2);
			var xcc = 0;
			for (var i = 1; i < freqData.length * 2; i += 0.5) {
				    
			    var xc = i;
	      		var yc = (freqData[i] / 128) * (HEIGHT / 2);
	      		
	      		ctx.moveTo(xcc, ycc);
	  			ctx.lineTo(xc, yc);
	  			// ctx.fillRect(xc,yc,2,2);
	  			xcc = i - 1;
	  			ycc = (freqData[i] / 128) * (HEIGHT / 2);
	  			ctx.lineWidth = 1.5;
			}

			ctx.stroke();
		}

	}


	initCanvas();
	return analyser;
}

