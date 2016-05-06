$(document).ready(function() {
	generate(1);
	generate(2);
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

function move() {
	var blocks = $(".obstacle");

	blocks.each(function() {
		var newLeft = parseInt($(this).css("left")) - 1;
		$(this).css("left", newLeft + "px");
	});
}