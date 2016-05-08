$(document).ready(function () {
    initialize();
    generate(1);
    generate(2);
    generateSprites(2);
    setInterval('move();', 5);

});

function generate(track) {
	var trackId = "#t" + track;
	var block = $('<div></div>');
	block.addClass("obstacle");

	var trackHeight = $(trackId).css("height");
	block.css({"height": trackHeight, "left": "450px"});
	$(trackId).append(block);
}

function generateSprites(trackNum) {
    var randomPosition1 = Math.random() * 210 + 10;
    var randomPosition2 = Math.random() * 210 + 10;
    while ((randomPosition1 >= randomPosition2 - 60) && (randomPosition1 <= randomPosition2 + 60)) {
        randomPosition1 = Math.random() * 210 + 10;
    }
    if (trackNum == 2) {
        var sprite1 = $('<img src="circle.png" id="circle">');
        var sprite2 = $('<img src="circle.png" id="circle">');
        sprite1.css({"left": randomPosition1 + "px"});
        $("#t1").append(sprite1);
        sprite2.css({"left": randomPosition2 + "px"});
        $("#t2").append(sprite2);
    }
}

function move() {
	var blocks = $(".obstacle");

	blocks.each(function() {
		var newLeft = parseInt($(this).css("left")) - 1;
		$(this).css("left", newLeft + "px");
	});
}

function initialize() {
	if (screen.height <= 800 && screen.width <= 800) {
		$("div#desktop").hide();
		$("div#container").css({"width": "100vw", 
								"height": "100vh"});

		$width = $("div#container").width();
		$height = $("div#container").height();
		$("div#container").css("height", $height - 2 + "px");
	} else {
		$("div#container").css({"height": "400px", "width": "750px",
								"border-width": "1px", "margin": "0 auto"});
		$width = $("div#container").width();
		$height = $("div#container").height();
	}

	$("div#ui").css("height", (0.075 * $height) - 2 + "px");
	$game = $height - $("div#ui").height() - 2;
	$laneHeight = ($game / lanes) - 2;
	$("div.track").css("height", $laneHeight);
}