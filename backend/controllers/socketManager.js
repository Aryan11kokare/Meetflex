import { Server } from "socket.io";

const connections = {};
const usernames = {};
const userInfos = {};
const messages = {};
const shapes = {};

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("join_call", (path, username) => {
      if (connections[path] === undefined) {
        connections[path] = [];
      }

      if (userInfos[path] === undefined) {
        userInfos[path] = {};
      }

      connections[path].push(socket.id);
      userInfos[path][socket.id] = {
        video: true,
        audio: true,
      };
      usernames[socket.id] = username;

      for (let a = 0; a < connections[path].length; a++) {
        io.to(connections[path][a]).emit(
          "user_joined",
          socket.id,
          connections[path],
          usernames,
          userInfos[path],
        );
      }

      if (messages[path] !== undefined) {
        for (let a = 0; a < messages[path].length; a++) {
          io.to(socket.id).emit(
            "chat-message",
            messages[path][a]["message"],
            messages[path][a]["sender"],
            messages[path][a]["socket-id-sender"],
          );
        }
      }

      if (shapes[path] !== undefined) {
        for (let a = 0; a < shapes[path].length; a++) {
          io.to(socket.id).emit("draw-message", shapes[path][a]);
        }
      }
    });

    socket.on("signal", (tolId, message) => {
      io.to(tolId).emit("signal", socket.id, message);
    });

    socket.on("chat_message", (messageObj, sender) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isFound], [roomKey, roomValue]) => {
          if (!isFound && roomValue.includes(socket.id)) {
            return [roomKey, true];
          }
          return [room, isFound];
        },
        ["", false],
      );

      if (found === true) {
        if (messages[matchingRoom] === undefined) {
          messages[matchingRoom] = [];
        }
        messages[matchingRoom].push({
          sender: sender,
          message: messageObj,
          "socket-id-sender": socket.id,
        });

        connections[matchingRoom].forEach((el) => {
          io.to(el).emit("chat-message", messageObj, sender, socket.id);
        });
      }
    });

    socket.on("private_file", (toSocketId, messageObj, sender) => {
      io.to(toSocketId).emit(
        "receive_private_file",
        messageObj,
        sender,
        toSocketId,
        socket.id,
      );

      io.to(socket.id).emit(
        "receive_private_file",
        messageObj,
        sender,
        toSocketId,
        socket.id,
      );
    });

    socket.on("media-state-change", (data) => {
      let isFound = false;
      let matchingRoom;
      for (let room in connections) {
        for (let i = 0; i < connections[room].length; i++) {
          if (connections[room][i] === socket.id) {
            isFound = true;
            matchingRoom = room;
            break;
          }
        }
        if (isFound === true) {
          break;
        }
      }

      if (matchingRoom !== undefined) {
        userInfos[matchingRoom][data.socketId] = {
          video: data.video,
          audio: data.audio,
        };

        connections[matchingRoom].forEach((el) => {
          io.to(el).emit("user-media-state-change", data);
        });
      }
    });

    socket.on("draw_message", (messageObj) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isFound], [roomKey, roomValue]) => {
          if (!isFound && roomValue.includes(socket.id)) {
            return [roomKey, true];
          }
          return [room, isFound];
        },
        ["", false],
      );

      if (found === true) {
        if (shapes[matchingRoom] === undefined) {
          shapes[matchingRoom] = [];
        }

        shapes[matchingRoom].push(messageObj);

        connections[matchingRoom].forEach((el) => {
          io.to(el).emit("draw-message", messageObj);
        });
      }
    });

    socket.on("erase_shape", (shapeId) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isFound], [roomKey, roomValue]) => {
          if (!isFound && roomValue.includes(socket.id)) {
            return [roomKey, true];
          }
          return [room, isFound];
        },
        ["", false],
      );

      if (found === true) {
        const newShapes = shapes[matchingRoom].filter(
          (el) => el.id !== shapeId,
        );
        shapes[matchingRoom] = newShapes;

        connections[matchingRoom].forEach((el) => {
          io.to(el).emit("erase-shape", shapeId);
        });
      }
    });

    socket.on("update_shape", (id, updates) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isFound], [roomKey, roomValue]) => {
          if (!isFound && roomValue.includes(socket.id)) {
            return [roomKey, true];
          }
          return [room, isFound];
        },
        ["", false],
      );

      if (found === true) {
        const newShapes = shapes[matchingRoom].map((shape) =>
          shape.id === id ? { ...shape, ...updates } : shape,
        );

        shapes[matchingRoom] = newShapes;

        connections[matchingRoom].forEach((el) => {
          io.to(el).emit("update-shape", id, updates);
        });
      }
    });

    socket.on("disconnect", () => {
      let isFound = false;
      let matchingRoom;
      for (let room in connections) {
        for (let i = 0; i < connections[room].length; i++) {
          if (connections[room][i] === socket.id) {
            isFound = true;
            matchingRoom = room;
            break;
          }
        }
        if (isFound === true) {
          break;
        }
      }

      if (matchingRoom !== undefined) {
        connections[matchingRoom].forEach((user) => {
          io.to(user).emit("user_left", socket.id);
        });

        const index = connections[matchingRoom].indexOf(socket.id);
        connections[matchingRoom].splice(index, 1);

        delete userInfos[matchingRoom][socket.id];

        if (connections[matchingRoom].length === 0) {
          delete connections[matchingRoom];
          delete messages[matchingRoom];
          delete shapes[matchingRoom];
          delete usernames[socket.id];
          delete userInfos[matchingRoom];
        }
      } else {
        console.log("matching room is undefind");
      }
    });
  });

  return io;
};
