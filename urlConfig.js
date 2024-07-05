const FRONTEND_URL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:3000`
    : `https://process-visualizer-frontend.vercel.app/`;
module.exports = FRONTEND_URL;
