import {
  Circle,
  RectangleHorizontal,
  Slash,
  SquareDashedMousePointer,
  Trash2,
  Type,
} from "lucide-react";

function Toolbar({
  tool,
  setTool,
  color,
  setColor,
  textInput,
  setTextInput,
  clearAll,
  socket,
  selectedShape,
  deleteShape,
}) {
  const tools = [
    { id: "select", name: "Select", icon: <SquareDashedMousePointer /> },
    { id: "rectangle", name: "Rectangle", icon: <RectangleHorizontal /> },
    { id: "circle", name: "Circle", icon: <Circle /> },
    { id: "line", name: "Line", icon: <Slash /> },
    { id: "text", name: "Text", icon: <Type /> },
    { id: "erase", name: "Erase", icon: <Trash2 /> },
  ];

  return (
    <div className="bg-white/10 rounded-lg border-white/30 border  shadow-lg p-4 mb-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-2">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              className={`p-4 rounded-full font-medium transition-all ${
                tool === t.id
                  ? "bg-gray-600 text-white shadow-md"
                  : "bg-gray-100/10 text-white hover:bg-gray-600"
              }`}
              title={t.name}
            >
              <span className="text-lg">{t.icon}</span>
              {/* <span className="ml-2 text-sm">{t.name}</span> */}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-white">Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-12 h-10 rounded cursor-pointer border-2 border-gray-300"
          />
        </div>

        {tool === "text" && (
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-white">Text:</label>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text..."
              className="px-4 py-2 text-base border-2 border-gray-300 rounded-lg focus:outline-none text-white focus:border-blue-500"
            />
          </div>
        )}

        <div className="flex gap-2 ml-auto">
          {selectedShape && (
            <button
              onClick={() => {
                socket.emit("erase_shape", selectedShape);
              }}
              className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              Delete Selected
            </button>
          )}
          {/* <button
            onClick={clearAll}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Clear All
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
