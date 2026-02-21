import { useRef, useState, useEffect } from "react";
import {
  drawShape,
  isPointInShape,
  getResizeHandle,
} from "../draw/canvasUtils";

function Canvas({
  tool,
  shapes,
  addShape,
  updateShape,
  selectedShape,
  setSelectedShape,
  socket,
  color,
  textInput,
  deleteShape,
}) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentShape, setCurrentShape] = useState(null);
  const [resizing, setResizing] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach((shape) => {
      // console.log("for each");
      drawShape(ctx, shape, shape.id === selectedShape);
    });

    if (currentShape) {
      drawShape(ctx, currentShape, false);
    }
  }, [shapes, selectedShape, currentShape]);

  useEffect(() => {
    console.log(shapes);
  }, [shapes]);
  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e) => {
    console.log("mouse down");
    const pos = getMousePos(e);

    if (tool === "select") {
      const handle = getResizeHandle(
        shapes.find((s) => s.id === selectedShape),
        pos,
      );
      if (handle) {
        setResizing(handle);
        setIsDrawing(true);
        return;
      }

      const clickedShape = [...shapes]
        .reverse()
        .find((shape) => isPointInShape(pos, shape));

      if (clickedShape) {
        setSelectedShape(clickedShape.id);
        setStartPos(pos);
        setIsDrawing(true);
      } else {
        setSelectedShape(null);
      }
    } else if (tool === "erase") {
      const clickedShape = [...shapes]
        .reverse()
        .find((shape) => isPointInShape(pos, shape));
      if (clickedShape) {
        // deleteShape(clickedShape.id);
        socket.emit("erase_shape", clickedShape.id);
      }
    } else if (tool === "text") {
      if (textInput.trim()) {
        socket.emit("draw_message", {
          type: "text",
          x: pos.x,
          y: pos.y,
          text: textInput,
          color: color,
          id: Date.now(),
        });
      }
    } else {
      setIsDrawing(true);
      setStartPos(pos);
      setCurrentShape({
        type: tool,
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        x2: pos.x,
        y2: pos.y,
        color: color,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const pos = getMousePos(e);

    if (tool === "select" && selectedShape) {
      const shape = shapes.find((s) => s.id === selectedShape);
      if (!shape) return;

      if (resizing) {
        const dx = pos.x - startPos.x;
        const dy = pos.y - startPos.y;

        if (shape.type === "text") {
          if (resizing === "se") {
            const newFontSize = Math.max(10, (shape.fontSize || 24) + dy);
            socket.emit("update_shape", selectedShape, {
              fontSize: newFontSize,
            });
          }
        } else {
          if (resizing === "se") {
            socket.emit("update_shape", selectedShape, {
              width: shape.width + dx,
              height: shape.height + dy,
            });
          } else if (resizing === "sw") {
            socket.emit("update_shape", selectedShape, {
              x: shape.x + dx,
              width: shape.width - dx,
              height: shape.height + dy,
            });
          } else if (resizing === "ne") {
            socket.emit("update_shape", selectedShape, {
              y: shape.y + dy,
              width: shape.width + dx,
              height: shape.height - dy,
            });
          } else if (resizing === "nw") {
            socket.emit("update_shape", selectedShape, {
              x: shape.x + dx,
              y: shape.y + dy,
              width: shape.width - dx,
              height: shape.height - dy,
            });
          }
        }
        setStartPos(pos);
      } else {
        const dx = pos.x - startPos.x;
        const dy = pos.y - startPos.y;

        if (shape.type === "line") {
          socket.emit("update_shape", selectedShape, {
            x: shape.x + dx,
            y: shape.y + dy,
            x2: shape.x2 + dx,
            y2: shape.y2 + dy,
          });
        } else {
          socket.emit("update_shape", selectedShape, {
            x: shape.x + dx,
            y: shape.y + dy,
          });
        }
        setStartPos(pos);
      }
    } else if (tool === "line") {
      setCurrentShape({
        ...currentShape,
        x2: pos.x,
        y2: pos.y,
      });
    } else if (tool === "rectangle" || tool === "circle") {
      const width = pos.x - startPos.x;
      const height = pos.y - startPos.y;
      setCurrentShape({
        ...currentShape,
        width: width,
        height: height,
      });
    }
  };

  const handleMouseUp = () => {
    if (
      isDrawing &&
      currentShape &&
      tool !== "select" &&
      tool !== "erase" &&
      tool !== "text"
    ) {
      // addShape(currentShape);
      console.log(currentShape);
      socket.emit("draw_message", { ...currentShape, id: Date.now() });
      setCurrentShape(null);
    }
    setIsDrawing(false);
    setResizing(null);
  };

  return (
    <div className=" p-4 b  ">
      <canvas
        ref={canvasRef}
        width={1200}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="border-2  rounded-lg cursor-crosshair border-gray-800 bg-gray-900"
      />
    </div>
  );
}

export default Canvas;
