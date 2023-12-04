import express from "express"
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js"
import bodyParser from "body-parser";
const app = express();
const PORT = 5000

app.use(bodyParser.json())
app.use("/api", userRoutes)
mongoose.connect("mongodb+srv://mubarak:mrbiba129@mydb.smrrdw7.mongodb.net/akrsp-backend").then(() => {
    console.log("Databse Connected")
})
// mongoose.connection.once("connected",()=>{
//     console.log("Database Connected")
// })

app.listen(PORT, () => {
    console.log(`Server is running on this port: ${PORT}`)
})