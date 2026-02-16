<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.8; margin: 0; padding: 0; background-color: #f8fafc; color: #1e293b;">

  <!-- HEADER -->
  <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 60px 20px; text-align: center; color: white;">
    <h1 style="font-size: 42px; margin-bottom: 10px;">🚀 Meetflex</h1>
    <p style="font-size: 18px; opacity: 0.9;">
      Modern Real-Time Video Meeting Platform built with MERN & WebRTC
    </p>
 <p style="margin-top: 20px;">
      <a href="https://meetflex.vercel.app/" target="_blank"
         style="background: white; color: #1e40af; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
         🌐 Live Demo
      </a>
    </p>
  </div>

  <!-- CONTENT -->
  <div style="max-width: 1000px; margin: auto; padding: 40px 20px;">

   <!-- BANNER -->
  <img src="https://github.com/user-attachments/assets/2c3100be-9db1-47a2-b103-bd7b6c33c31c" alt="Meetflex Banner" style="width: 100%; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);" />

  <hr style="margin: 50px 0;" />

    <!-- OVERVIEW -->
  <h2>📌 Project Overview</h2>
    <p>
      <strong>Meetflex</strong> is a full-stack online video conferencing platform developed using the
      <strong>MERN Stack</strong> and <strong>WebRTC</strong>.
      It enables seamless real-time communication with video calls, messaging, file sharing,
      and collaborative tools.
    </p>

   <p>
      The platform is designed for performance, security, and scalability —
      providing a smooth meeting experience with room-based communication and secure authentication.
    </p>

   <hr style="margin: 50px 0;" />

  <!-- FEATURES -->
  <h2>✨ Key Features</h2>

   <ul style="columns: 2; font-size: 16px;">
      <li>🎥 Real-time Video Conferencing (WebRTC)</li>
      <li>💬 Room-based Live Chat (WebSocket)</li>
      <li>📂 Secure File Upload & Sharing (Multer)</li>
      <li>🖥 Live Screen Sharing</li>
      <li>🎨 Collaborative Drawing Canvas</li>
      <li>🔐 JWT-based Authentication</li>
      <li>🔑 Password Hashing with Bcrypt</li>
      <li>⚡ Fast & Responsive UI (TailwindCSS)</li>
    </ul>

  <hr style="margin: 50px 0;" />

    <!-- TECH STACK -->
   <h2>🛠 Tech Stack</h2>

  <h3>💻 Frontend</h3>
    <ul>
      <li>React.js</li>
      <li>Redux</li>
      <li>TailwindCSS</li>
    </ul>

  <h3>🖥 Backend</h3>
    <ul>
      <li>Node.js</li>
      <li>Express.js</li>
    </ul>

  <h3>🗄 Database</h3>
    <ul>
      <li>MongoDB</li>
    </ul>

  <h3>🔐 Authentication</h3>
    <ul>
      <li>JWT (JSON Web Token)</li>
      <li>Bcrypt</li>
    </ul>

  <h3>⚙ Additional Technologies</h3>
    <ul>
      <li>Multer – File Uploads</li>
      <li>WebSocket – Real-time Chat</li>
      <li>WebRTC – Video Communication</li>
    </ul>

  <hr style="margin: 50px 0;" />

    <!-- SCREENSHOTS -->
  <h2>📸 Screenshots</h2>

  <h3>🏠 Meetings scheduling Page</h3>
    <img src="https://github.com/user-attachments/assets/2ebbbfc2-3802-40a7-9744-efd69f2e3d96" style="width: 100%; border-radius: 10px; margin-bottom: 30px;" />
         
  <h3>🏠 Meeting Entrance Page</h3>
    <img src="https://github.com/user-attachments/assets/07e8c8bb-2cf5-4dcf-a271-82bf56f719a3" style="width: 100%; border-radius: 10px; margin-bottom: 30px;" />

  <h3>🎥 Video Meeting</h3>
    <img src="https://github.com/user-attachments/assets/0d3becb5-21d9-47c1-a40c-07e9725d83c7" style="width: 100%; border-radius: 10px; margin-bottom: 30px;" />

  <h3>💬 Chat Component</h3>
    <img src="https://github.com/user-attachments/assets/fd73e28c-0923-4fab-8b2a-9bd7313d6b04" style="width: 100%; border-radius: 10px; margin-bottom: 30px;" />

   <h3>🎨 Drawing Canvas</h3>
    <img src="https://github.com/user-attachments/assets/27211765-b081-4b82-8fc3-75ce43504862" style="width: 100%; border-radius: 10px;" />

   <hr style="margin: 50px 0;" />

    <!-- AUTH FLOW -->
  <h2>🔐 Authentication Flow</h2>
    <ol>
      <li>User registers → Password securely hashed using bcrypt</li>
      <li>Login generates JWT token</li>
      <li>Protected routes validated via JWT middleware</li>
    </ol>

  <hr style="margin: 50px 0;" />

  <!-- DEPLOYMENT -->
  <h2>🌍 Deployment</h2>
    <ul>
      <li><strong>Frontend:</strong> Vercel</li>
      <li><strong>Backend:</strong> Render</li>
    </ul>

  <p>
      🌐 Live Project:
      <a href="https://meetflex.vercel.app/" target="_blank">
        https://meetflex.vercel.app/
      </a>
    </p>

  </div>
</body>
</html>
