function draw() {
  var canvas = document.getElementById("profile-pic");
  var primaryColor = document.querySelector("#color-primary");
  var secondaryColor = document.querySelector("#color-secondary");
  var terciaryColor = document.querySelector("#color-terciaary");
  var textColor = document.querySelector("#color-text");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    // Circulo
    ctx.beginPath();
    ctx.arc(250, 250, 250, 0, Math.PI * 2, true);
    ctx.stroke();

    // Fondo
    ctx.fillStyle = primaryColor.value;
    ctx.fill()
    
    // Texto
    ctx.font = '60px calibri';
    ctx.fontWeight = "bolder";
    ctx.textAlign = "center";
    ctx.fillStyle = textColor.value;
    ctx.fillText(
      'EL GÉNERO', canvas.width / 2, canvas.height / 3 +15);
    ctx.fillText(
      'NO', canvas.width / 2, canvas.width / 2 +15);
    ctx.fillText(
      'TIENE COLOR', canvas.width / 2, canvas.height / 3 * 2 +15);
  }
}

function saveImage() {
  let downloadLink = document.createElement('a');
	downloadLink.setAttribute('download', 'ProfilePic.png');
	let canvas = document.getElementById('profile-pic');
  let dataURL = canvas.toDataURL('image/png');
  let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
	downloadLink.setAttribute('href',url);
	downloadLink.click();
}