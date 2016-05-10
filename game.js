
$(document).ready(function () {
    initialize();
    generate();
    generateSprites(lane);
    setInterval('move();', $tickLength);
    collision();
});

// Recalls intialize function if screen orientation is changed.
$(window).on("orientationchange", initialize);

// Generates a new obstacle off-screen, to the right.
function generate() {
	$track = Math.floor(Math.random() * $lanes) + 1
	$trackId = "#t" + $track;
	$block = $('<div></div>');
	$block.addClass("obstacle");

	$trackHeight = $($trackId).css("height");
	$leftInit = parseInt($("div#container").css("margin-left")) + $("div#container").width() + 2;

	$block.css({"height": $trackHeight, "left": $leftInit});
	$($trackId).append($block);
}

//Generate sprites depending on the number of tracks.
function generateSprites(trackNum) {
    var sprite1 = $('<img src="circle.png" id="circle">');
    var sprite2 = $('<img src="circle.png" id="circle">');
    var sprite3 = $('<img src="circle.png" id="circle">');
    var sprite4 = $('<img src="circle.png" id="circle">');
    //The width in which the sprites are able to spawn.
    var genRange = parseInt($("#container").css("width")) * 0.5;
    //Specific possible position of the sprites.
    var pos1 = genRange * 0.01;
    var pos2 = genRange * 0.32;
    var pos3 = genRange * 0.69;
    var pos4 = genRange;
    //Placeholder variable.
    var pick1;
    var pick2;
    var pick3;
    var pick4;
            
    if (trackNum == 2) {
        var random1 = Math.floor(Math.random() * 2) + 1;
        var random2 = Math.floor(Math.random() * 2) + 1;
        while (random1 == random2) {
            random2 = Math.floor(Math.random() * 2) + 1;
        } 
        if (random1 == 1) {
            pick1 = pos1;
            pick2 = pos2;
        } else {
            pick1 = pos2;
            pick2 = pos1;
        }
        sprite1.css({"left": pick1 + "px"});
        $("#t1").append(sprite1);
        sprite2.css({"left": pick2 + "px"});
        $("#t2").append(sprite2);
    }
    
    if (trackNum == 3) {
        var random1 = Math.floor(Math.random() * 3) + 1;
        var random2 = Math.floor(Math.random() * 3) + 1;
        var random3 = Math.floor(Math.random() * 3) + 1;
        while ((random1 == random2) || (random1 == random3) || (random2 == random3)) {
            random2 = Math.floor(Math.random() * 3) + 1;
            random3 = Math.floor(Math.random() * 3) + 1;
        } 
        //**Can be simplified??**
        if (random1 == 1) {
            pick1 = pos1;
        } else if (random1 == 2) {
            pick1 = pos2;
        } else {
            pick1 = pos3;
        }
        if (random2 == 1) {
            pick2 = pos1;
        } else if (random2 == 2) {
            pick2 = pos2;
        } else {
            pick2 = pos3;
        } 
        if (random3 == 1) {
            pick3 = pos1;
        } else if (random3 == 2) {
            pick3 = pos2;
        } else {
            pick3 = pos3;
        }
        sprite1.css({"left": pick1 + "px"});
        $("#t1").append(sprite1);
        sprite2.css({"left": pick2 + "px"});
        $("#t2").append(sprite2);
        sprite3.css({"left": pick3 + "px"});
        $("#t3").append(sprite3);
    }
    
    if (trackNum == 4) {
        var random1 = Math.floor(Math.random() * 4) + 1;
        var random2 = Math.floor(Math.random() * 4) + 1;
        var random3 = Math.floor(Math.random() * 4) + 1;
        var random4 = Math.floor(Math.random() * 4) + 1;
        while ((random1 == random2) || (random1 == random3) || (random1 == random4) || (random2 == random3) || (random2 == random4) || (random3     == random4)) {
            random2 = Math.floor(Math.random() * 4) + 1;
            random3 = Math.floor(Math.random() * 4) + 1;
            random4 = Math.floor(Math.random() * 4) + 1;
        } 
        //**Can be simplified??**
        if (random1 == 1) {
            pick1 = pos1;
        } else if (random1 == 2) {
            pick1 = pos2;
        } else if (random1 == 3) {
            pick1 = pos3;
        } else {
            pick1 = pos4;
        }
        if (random2 == 1) {
            pick2 = pos1;
        } else if (random2 == 2) {
            pick2 = pos2;
        } else if (random2 == 3) {
            pick2 = pos3;
        } else {
            pick2 = pos4;
        } 
        if (random3 == 1) {
            pick3 = pos1;
        } else if (random3 == 2) {
            pick3 = pos2;
        } else if (random3 == 3) {
            pick3 = pos3;
        } 
        else {
            pick3 = pos4;
        }
        if (random4 == 1) {
            pick4 = pos1;
        } else if (random4 == 2) {
            pick4 = pos2;
        } else if (random4 == 3) {
            pick4 = pos3;
        } else {
            pick4 = pos4;
        }
        sprite1.css({"left": pick1 + "px"});
        $("#t1").append(sprite1);
        sprite2.css({"left": pick2 + "px"});
        $("#t2").append(sprite2);
        sprite3.css({"left": pick3 + "px"});
        $("#t3").append(sprite3);
        sprite4.css({"left": pick4 + "px"});
        $("#t4").append(sprite4);
    }
}


// Moves all obstacles by 1 pixel.
// **PENDING** Checks all obstacles to see if they have collided with an object.
function move() {
	$blocks = $(".obstacle");
	$offLeft = parseInt($("div#container").css("margin-left")) - 20;

	$blocks.each(function() {
		$newLeft = parseInt($(this).css("left")) - 5;
		$(this).css("left", $newLeft + "px");

		// Deletes any obstacles that have travelled to the right off screen.
		if ($newLeft <= $offLeft) {
			$(this).remove();
		}
	});
}

function collision() {
    
    var Element1;
    var Element2;

    Element1.top = $("div.obstacle").offset().top;
    Element1.left = $("div.obstacle").offset().left;
    Element1.right = Number($("div.obstacle").offset().left) + Number($("div.obstacle").width());
    Element1.bottom = Number($("div.obstacle").offset().top) + Number($("div.obstacle").height());

    Element2.top = $("#circle").offset().top;
    Element2.left = $("#circle").offset().left;
    Element2.right = Number($("#circle").offset().left) + Number($("#circle").width());
    Element2.bottom = Number($("#circle").offset().top) + Number($("#circle").height());

    if (Element1.right > Element2.left && Element1.left < Element2.right && Element1.top < Element2.bottom && Element1.bottom > Element2.top) {
        alert("Hi");
    }
}
// Sets up appropriate game screen depending on screen size.
function initialize() {
	$("h2#portError").hide();
	// Sets up screen for phones or small devices.
	if (screen.height <= 800 && screen.width <= 800) {
		$("div#desktop").hide();
		$("div#container").css({"width": "100vw", 
								"height": "100vh"});

		$width = $("div#container").width();
		$height = $("div#container").height();
		// If the phone is in portrait mode, limits the height of game pane and displays error.
		if ($height > $width) {
			$height = $width / 1.5;
			$("#portError").show();
		}

		$("div#container").css("height", $height - 2 + "px");
	// Sets up screen for a PC.
	} else {
		$("div#container").css({"height": "400px", "width": "750px",
								"border-width": "1px", "margin": "0 auto"});
		$width = $("div#container").width();
		$height = $("div#container").height();
	}

	// Sets height of UI bar and lanes.
	$("div#ui").css("height", (0.075 * $height) - 2 + "px");
	$game = $height - $("div#ui").height() - 2;
	$laneHeight = ($game / $lanes) - 2;
	$("div.track").css({"height": $laneHeight + "px", "width": $width});
}

$("#test").on("swipe", function() {
	alert("Yay");
});