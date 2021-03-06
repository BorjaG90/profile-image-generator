
/* ***Eventos*** */
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
    document.querySelector("#color-secondary").disabled = true;
    document.querySelector("#color-terciary").disabled = true;
  } else {
    document.getElementById("gradient-container").hidden = false;
    if (document.querySelector("form").colornumber.value === "two") {
      document.querySelector("#color-secondary").disabled = false;
      document.querySelector("#color-terciary").disabled = true;
    } else {
      document.querySelector("#color-secondary").disabled = false;
      document.querySelector("#color-terciary").disabled = false;
    }
  }
}

/* ***Funciones*** */

function drawPreview(canvas, form){
  var colorNumber = form.colornumber;
  var primaryColor = document.querySelector("#color-primary").value;
  var textColor = document.querySelector("#color-text").value;
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    // Precarga de fuente
    /* Hacemos esto para que la fuente se cargue correctamente 
      cuando la vayamos a usar */
    addText(canvas, ctx, 35, form.fontfamily.value, textColor);

    // Limpiar
    setTimeout(clearCanvas(canvas, ctx), 5000);

    // Circulo
    ctx.beginPath();
    ctx.arc(175, 175, 175, 0, Math.PI * 2, true);

    // Fondo
    if (colorNumber.value === "one") {
      // Relleno de un color
      ctx.fillStyle = primaryColor;
    } else if (colorNumber.value === "two") {
      // Relleno de dos colores
      var secondaryColor = document.querySelector("#color-secondary").value;
      var gradient = form.gradient.value;
      if (gradient === "linear") {
        // Gradiente linear
        var lingrad = ctx.createLinearGradient(0, 0, 0, 350);
        lingrad.addColorStop(0, primaryColor);
        lingrad.addColorStop(1, secondaryColor);
        ctx.fillStyle = lingrad;
      } else {
        // Gradiente radial
        var radgrad = ctx.createRadialGradient(175, 175, 30, 175, 175, 200);
        radgrad.addColorStop(0, primaryColor);
        radgrad.addColorStop(1, secondaryColor);
        ctx.fillStyle = radgrad;
      }
    } else {
      // Relleno de tres colores
      var secondaryColor = document.querySelector("#color-secondary").value;
      var terciaryColor = document.querySelector("#color-terciary").value;
      var gradient = form.gradient.value;
      if (gradient === "linear") {
        // Gradiente linear
        var lingrad = ctx.createLinearGradient(0, 0, 0, 350);
        lingrad.addColorStop(0, primaryColor);
        lingrad.addColorStop(0.5, secondaryColor);
        lingrad.addColorStop(1, terciaryColor);
        ctx.fillStyle = lingrad;
      } else {
        // Gradiente radial
        var radgrad = ctx.createRadialGradient(175, 175, 40, 175, 175, 175);
        radgrad.addColorStop(0, primaryColor);
        radgrad.addColorStop(0.5, secondaryColor);
        radgrad.addColorStop(1, terciaryColor);
        ctx.fillStyle = radgrad;
      }
    }
    ctx.fill();

    // Texto
    if (form.border.checked) {
      // Con borde
      var borderColor = document.querySelector("#border-color-text").value;
      addText(canvas, ctx, 35, form.fontfamily.value, textColor, form.shift.checked, borderColor);
    } else {
      // Sin borde
      addText(canvas, ctx, 35, form.fontfamily.value, textColor, form.shift.checked);
    }
  }
}

function drawProfile(canvas, form){
  var colorNumber = form.colornumber;
  var primaryColor = document.querySelector("#color-primary").value;
  var textColor = document.querySelector("#color-text").value;

  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    // Precarga de fuente
    /* Hacemos esto para que la fuente se cargue correctamente 
      cuando la vayamos a usar */
    addText(canvas, ctx, 35, form.fontfamily.value, textColor);

    // Limpiar
    setTimeout(clearCanvas(canvas, ctx), 5000);


    // Circulo
    ctx.beginPath();
    ctx.arc(375, 375, 375, 0, Math.PI * 2, true);

    // Fondo
    if (colorNumber.value === "one") {
      // Relleno de un color
      ctx.fillStyle = primaryColor;
    } else if (colorNumber.value === "two") {
      // Relleno de dos colores
      var secondaryColor = document.querySelector("#color-secondary").value;
      var gradient = form.gradient.value;
      if (gradient === "linear") {
        // Gradiente linear
        var lingrad = ctx.createLinearGradient(0, 0, 0, 750);
        lingrad.addColorStop(0, primaryColor);
        lingrad.addColorStop(1, secondaryColor);
        ctx.fillStyle = lingrad;
      } else {
        // Gradiente radial
        var radgrad = ctx.createRadialGradient(375, 375, 90, 375, 375, 500);
        radgrad.addColorStop(0, primaryColor);
        radgrad.addColorStop(1, secondaryColor);
        ctx.fillStyle = radgrad;
      }
    } else {
      // Relleno de tres colores
      var secondaryColor = document.querySelector("#color-secondary").value;
      var terciaryColor = document.querySelector("#color-terciary").value;
      var gradient = form.gradient.value;
      if (gradient === "linear") {
        // Gradiente linear
        var lingrad = ctx.createLinearGradient(0, 0, 0, 750);
        lingrad.addColorStop(0, primaryColor);
        lingrad.addColorStop(0.5, secondaryColor);
        lingrad.addColorStop(1, terciaryColor);
        ctx.fillStyle = lingrad;
      } else {
        // Gradiente radial
        var radgrad = ctx.createRadialGradient(375, 375, 120, 375, 375, 375);
        radgrad.addColorStop(0, primaryColor);
        radgrad.addColorStop(0.5, secondaryColor);
        radgrad.addColorStop(1, terciaryColor);
        ctx.fillStyle = radgrad;
      }
    }
    ctx.fill();

    // Texto
    if (form.border.checked) {
      // Con borde
      var borderColor = document.querySelector("#border-color-text").value;
      addText(canvas, ctx, 75, form.fontfamily.value, textColor, form.shift.checked, borderColor);
    } else {
      // Sin borde
      addText(canvas, ctx, 75, form.fontfamily.value, textColor, form.shift.checked);
    }
  }
}

/**
 * Ejecuta el proceso de dibujo
 */
function draw() {
  var preview = document.getElementById("picture-preview");
  var canvas = document.getElementById("profile-pic");
  var form = document.querySelector("form");

  drawPreview(preview, form);
  drawProfile(canvas, form);

  document.getElementById("export-button").disabled = false;
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

/**
 * Añade el texto al canvas
 */
function addText(canvas, context, fontSize, fontFamily, color, shift, border = null) {
  const text1 = "El Género";
  const text2 = "no";
  const text3 = "tiene Color";
  context.font = `${fontSize}px ${fontFamily}`;
  context.fontWeight = "bolder";
  context.textAlign = "center";
  context.fillStyle = color;
  context.fillText(
    shift ? text1.toUpperCase(): text1, 
    canvas.width / 2, 
    canvas.height / 3 + 15);
  context.fillText(
    shift ? text2.toUpperCase(): text2, 
    canvas.width / 2, 
    canvas.width / 2 + 15);
  context.fillText(
    shift ? text3.toUpperCase(): text3,
    canvas.width / 2,
    (canvas.height / 3) * 2 + 15
  );
  // Si dibujamos texto con borde
  if (border != null) {
    context.strokeStyle = border;
    context.strokeText(
      shift ? text1.toUpperCase(): text1, 
      canvas.width / 2, 
      canvas.height / 3 + 15);
    context.strokeText(
      shift ? text2.toUpperCase(): text2, 
      canvas.width / 2, 
      canvas.width / 2 + 15);
    context.strokeText(
      shift ? text3.toUpperCase(): text3,
      canvas.width / 2,
      (canvas.height / 3) * 2 + 15
    );
  }
}