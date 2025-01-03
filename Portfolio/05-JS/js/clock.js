function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  // Borde circular con gradiente (opcional)
  // TODO completado: Añadir un círculo con gradiente
  grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, "#333");   // Color interno oscuro
  grad.addColorStop(0.5, "white"); // Color intermedio
  grad.addColorStop(1, "#333");   // Color externo oscuro
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * 0.1;
  ctx.stroke(); // Dibuja el borde

  // Círculo central negro
  // TODO completado: Añadir el círculo negro central
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = "#333";
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  //TODO: Make sure you show all the numbers
  var ang;
  for (num = 1; num < 13; num++) {
  ctx.font = radius * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ang = (num * Math.PI) / 6;
  ctx.rotate(ang);
  ctx.translate(0, -radius * 0.85);
  ctx.rotate(-ang);
  ctx.fillText(num.toString(), 0, 0);
  ctx.rotate(ang);
  ctx.translate(0, radius * 0.85);
  ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  // TODO: Calculate the angles of every hand depending on the time
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  console.log(hour);
  console.log(minute);
  console.log(second);
  //hour
  hour = (hour /6)*Math.PI;
  drawHand(ctx, hour, radius * 0.5, radius * 0.07);
  //minute
  minute = (minute /30)*Math.PI;
  drawHand(ctx, minute, radius * 0.8, radius * 0.07);
  // second
  second = (second /30)*Math.PI ;
  drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
