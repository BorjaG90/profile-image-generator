// Eventos
/**
 * Comprueba si el check de borde esta activo
 */
function checkBorder() {
  if (document.querySelector("form").border.checked) {
    document.querySelector("#border-color-text").disabled = false;
  } else {
    document.querySelector("#border-color-text").disabled = true;
  }
}

/**
 * Comprueba que numero de colores esta seleccionado
 */
function checkRadio() {
  if (document.querySelector("form").colornumber.value === "one") {
    document.getElementById("gradient-container").hidden = true;
  } else {
    document.getElementById("gradient-container").hidden = false;
  }
}



// Funciones
/**
 * Dibuja la imagen de perfil con los elementos seleccionados
 */
function draw() {
  var canvas = document.getElementById("profile-pic");
  var form = document.querySelector("form");
  var colorNumber = form.colornumber;
  var primaryColor = document.querySelector("#color-primary").value;
  var textColor = document.querySelector("#color-text").value;

  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    // Limpiar
    clearCanvas(canvas, ctx);

    // Circulo
    ctx.beginPath();
    ctx.arc(250, 250, 250, 0, Math.PI * 2, true);
    ctx.stroke();

    // Fondo
    if(colorNumber.value === "one"){
      ctx.fillStyle = primaryColor;
    }else if (colorNumber.value === "two"){
      var secondaryColor = document.querySelector("#color-secondary").value;
      var terciaryColor = document.querySelector("#color-terciary").value;
      var gradient = form.gradient.value;
      console.log(gradient);
      if(gradient === "linear"){
        var lingrad = ctx.createLinearGradient(0, 0, 0, 500);
        lingrad.addColorStop(0, primaryColor);
        lingrad.addColorStop(1, secondaryColor);
        ctx.fillStyle = lingrad;
      }else{
        var radgrad = ctx.createRadialGradient(250, 250, 55, 150, 190, 500);
        radgrad.addColorStop(0, primaryColor);
        radgrad.addColorStop(1, secondaryColor);
        ctx.fillStyle = radgrad;
      }
    }
    ctx.fill();

    // Texto
    if (form.border.checked) {
      var borderColor = document.querySelector("#border-color-text").value;
      addText(canvas, ctx, 60, "Verdana", textColor, borderColor);
    } else {
      addText(canvas, ctx, 60, "Verdana", textColor);
    }
  }
}

/**
 * Exporta la foto de perfil en formato imagen png
 */
function saveImage() {
  let downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", "ProfilePic.png");
  let canvas = document.getElementById("profile-pic");
  let dataURL = canvas.toDataURL("image/png");
  let url = dataURL.replace(
    /^data:image\/png/,
    "data:application/octet-stream"
  );
  downloadLink.setAttribute("href", url);
  downloadLink.click();
}

/**
 * Limpia el canvas para redibujar
 * @param {} context
 */
function clearCanvas(canvas, context) {
  // Store the current transformation matrix
  context.save();

  // Use the identity matrix while clearing the canvas
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Restore the transform
  context.restore();
}

/** Añade el texto plano */
function addText(canvas, context, fontSize, fontFamily, color, border = null) {
  context.font = fontSize + "px " + fontFamily;
  context.fontWeight = "bolder";
  context.textAlign = "center";
  context.fillStyle = color;
  context.fillText("EL GÉNERO", canvas.width / 2, canvas.height / 3 + 15);
  context.fillText("NO", canvas.width / 2, canvas.width / 2 + 15);
  context.fillText(
    "TIENE COLOR",
    canvas.width / 2,
    (canvas.height / 3) * 2 + 15
  );
  // Si dibujamos texto con borde
  if (border != null) {
    context.strokeStyle = border;
    context.strokeText("EL GÉNERO", canvas.width / 2, canvas.height / 3 + 15);
    context.strokeText("NO", canvas.width / 2, canvas.width / 2 + 15);
    context.strokeText(
      "TIENE COLOR",
      canvas.width / 2,
      (canvas.height / 3) * 2 + 15
    );
  }
}


