const express = require("express");
import sequelize from "./models";
import AuthRoutes from "./routes/auth.routes";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const route = [new AuthRoutes()];
route.forEach((route)=> {
    app.use('/api', route.router);
});
// app.use('/api', new AuthRoutes().router) // this is replaced by the ForEachLoop logic above.


sequelize.authenticate().then(() => {
  sequelize.sync();
  app.listen(PORT, () => {
    console.log(
      `App has started at http://localhost:${PORT} \nPress Ctrl + C to Quit.`
    );
  });
});
