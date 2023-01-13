import { allowedOrigins } from "./allowedOrigins";

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      //remove !origin if not for development
      callback(null, true);
    } else {
      callback(new Error("not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
