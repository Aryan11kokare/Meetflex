export function drawShape(ctx, shape, isSelected) {
  ctx.strokeStyle = shape.color;
  ctx.fillStyle = shape.color;
  ctx.lineWidth = 2;

  if (shape.type === "rectangle") {
    ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
  } else if (shape.type === "circle") {
    ctx.beginPath();
    const radiusX = Math.abs(shape.width / 2);
    const radiusY = Math.abs(shape.height / 2);
    const centerX = shape.x + shape.width / 2;
    const centerY = shape.y + shape.height / 2;
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.stroke();
  } else if (shape.type === "line") {
    ctx.beginPath();
    ctx.moveTo(shape.x, shape.y);
    ctx.lineTo(shape.x2, shape.y2);
    ctx.stroke();
  } else if (shape.type === "text") {
    const fontSize = shape.fontSize || 24;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillText(shape.text, shape.x, shape.y);
  }

  if (isSelected) {
    drawSelectionHandles(ctx, shape);
  }
}

export function drawSelectionHandles(ctx, shape) {
  ctx.fillStyle = "red";
  const handleSize = 8;

  if (shape.type === "rectangle" || shape.type === "circle") {
    const handles = [
      { x: shape.x, y: shape.y },
      { x: shape.x + shape.width, y: shape.y },
      { x: shape.x, y: shape.y + shape.height },
      { x: shape.x + shape.width, y: shape.y + shape.height },
    ];

    handles.forEach((handle) => {
      ctx.fillRect(
        handle.x - handleSize / 2,
        handle.y - handleSize / 2,
        handleSize,
        handleSize
      );
    });

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    ctx.setLineDash([]);
  } else if (shape.type === "line") {
    ctx.fillRect(
      shape.x - handleSize / 2,
      shape.y - handleSize / 2,
      handleSize,
      handleSize
    );
    ctx.fillRect(
      shape.x2 - handleSize / 2,
      shape.y2 - handleSize / 2,
      handleSize,
      handleSize
    );
  } else if (shape.type === "text") {
    const fontSize = shape.fontSize || 24;
    ctx.font = `${fontSize}px Arial`;
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    const textWidth = ctx.measureText(shape.text).width;
    const boxHeight = fontSize + 10;
    ctx.strokeRect(
      shape.x - 5,
      shape.y - fontSize - 5,
      textWidth + 10,
      boxHeight
    );
    ctx.fillStyle = "#3b82f6";
    const handleSize = 8;
    ctx.fillRect(
      shape.x - 5 - handleSize / 2,
      shape.y - fontSize - 5 - handleSize / 2,
      handleSize,
      handleSize
    );
    ctx.fillRect(
      shape.x + textWidth + 5 - handleSize / 2,
      shape.y - fontSize - 5 - handleSize / 2,
      handleSize,
      handleSize
    );
    ctx.fillRect(
      shape.x - 5 - handleSize / 2,
      shape.y + 5 - handleSize / 2,
      handleSize,
      handleSize
    );
    ctx.fillRect(
      shape.x + textWidth + 5 - handleSize / 2,
      shape.y + 5 - handleSize / 2,
      handleSize,
      handleSize
    );
    ctx.setLineDash([]);
  }
}

export function isPointInShape(point, shape) {
  if (shape.type === "rectangle") {
    const x = Math.min(shape.x, shape.x + shape.width);
    const y = Math.min(shape.y, shape.y + shape.height);
    const width = Math.abs(shape.width);
    const height = Math.abs(shape.height);
    return (
      point.x >= x &&
      point.x <= x + width &&
      point.y >= y &&
      point.y <= y + height
    );
  } else if (shape.type === "circle") {
    const centerX = shape.x + shape.width / 2;
    const centerY = shape.y + shape.height / 2;
    const radiusX = Math.abs(shape.width / 2);
    const radiusY = Math.abs(shape.height / 2);
    const dx = (point.x - centerX) / radiusX;
    const dy = (point.y - centerY) / radiusY;
    return dx * dx + dy * dy <= 1;
  } else if (shape.type === "line") {
    const distance = pointToLineDistance(point, shape);
    return distance < 10;
  } else if (shape.type === "text") {
    const fontSize = shape.fontSize || 24;
    const textWidth = shape.text.length * (fontSize * 0.6);
    return (
      point.x >= shape.x - 5 &&
      point.x <= shape.x + textWidth + 5 &&
      point.y >= shape.y - fontSize - 5 &&
      point.y <= shape.y + 5
    );
  }
  return false;
}

export function pointToLineDistance(point, line) {
  const dx = line.x2 - line.x;
  const dy = line.y2 - line.y;
  const length = Math.sqrt(dx * dx + dy * dy);

  if (length === 0)
    return Math.sqrt((point.x - line.x) ** 2 + (point.y - line.y) ** 2);

  const t = Math.max(
    0,
    Math.min(
      1,
      ((point.x - line.x) * dx + (point.y - line.y) * dy) / (length * length)
    )
  );

  const projX = line.x + t * dx;
  const projY = line.y + t * dy;

  return Math.sqrt((point.x - projX) ** 2 + (point.y - projY) ** 2);
}

export function getResizeHandle(shape, point) {
  if (!shape) return null;

  const handleSize = 8;

  if (shape.type === "line") {
    return null;
  }

  if (shape.type === "text") {
    const fontSize = shape.fontSize || 24;
    const textWidth = shape.text.length * (fontSize * 0.6);
    const handles = {
      nw: { x: shape.x - 5, y: shape.y - fontSize - 5 },
      ne: { x: shape.x + textWidth + 5, y: shape.y - fontSize - 5 },
      sw: { x: shape.x - 5, y: shape.y + 5 },
      se: { x: shape.x + textWidth + 5, y: shape.y + 5 },
    };

    for (const [name, handle] of Object.entries(handles)) {
      if (
        Math.abs(point.x - handle.x) <= handleSize &&
        Math.abs(point.y - handle.y) <= handleSize
      ) {
        return name;
      }
    }
    return null;
  }

  const handles = {
    nw: { x: shape.x, y: shape.y },
    ne: { x: shape.x + shape.width, y: shape.y },
    sw: { x: shape.x, y: shape.y + shape.height },
    se: { x: shape.x + shape.width, y: shape.y + shape.height },
  };

  for (const [name, handle] of Object.entries(handles)) {
    if (
      Math.abs(point.x - handle.x) <= handleSize &&
      Math.abs(point.y - handle.y) <= handleSize
    ) {
      return name;
    }
  }

  return null;
}
