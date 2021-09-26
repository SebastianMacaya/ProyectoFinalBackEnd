import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
import morgan from "morgan";
app.use(morgan("dev"));
dotenv.config();
import emoji from "node-emoji";

const PORT = 8080;

/* --------------------------------- server --------------------------------- */
app.listen(PORT, () =>
  console.log(emoji.get("computer"), `Server on port ${PORT}`)
);

/* -------------------------------------------------------------------------- */
/*                                mongo connect                                */
/* -------------------------------------------------------------------------- */
mongoose.connect(
  process.env.MONGOURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(emoji.get("fire"), "conectado a la base de datos");
    }
  }
);
