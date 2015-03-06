function init(){

	var canvas = document.getElementById('game_canvas');
	var context = canvas.getContext("2d");

	var img = new Image();

	img.src= "pacman10-hp-sprite.png";

	img.onload = function() {
		context.drawImage(img, 320, 0, 470, 140, 0, 0, 470, 140);
		context.drawImage(img, 82, 21, 18, 20, 38, 30, 18, 20);
	}
}