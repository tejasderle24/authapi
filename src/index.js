import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/user.routes.js"

dotenv.config({ path: "./.env" });
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

// Root endpoint - health check HTML
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Auth Status</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
          .container { background: #f9fafb; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
          h1 { color: #2563eb; }
          .status { color: #16a34a; font-weight: bold; }
          .info { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
          .footer { margin-top: 30px; font-size: 0.9rem; color: #6b7280; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Auth API</h1>
          <p>Status: <span class="status">Online</span></p>
          <p>Server Time: ${new Date().toLocaleString()}</p>
            <div class="footer">
            <p>© ${new Date().getFullYear()} Auth API. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sever Running in http://localhost:${PORT}`)
})