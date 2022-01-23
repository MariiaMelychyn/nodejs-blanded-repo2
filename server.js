// registration - збереження нового користувача
//authorization - провірка credention user
//autentification - провірка прав доступа з оприділеними ресурсами
//Валідний токен: а) час дії не вийшов; б) успішно розшифровується за допомогою секретного ключа



const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const { colors } = require("./helpers"); //так работает colors без осветления

dotenv.config({ path: "./config/.env" });

app.use(cors());
app.use(express.json());

connectDB();
// set routes

const books = require("./routes/booksRouts");

app.use("/api/v1/books", books);// путь обработчик роутера
app.post("/register", (req, res) => {
//1.получаємо дані від користувача(email, password, name)
//2.валідацію полів користувача
//3.провіряємо чи користувач є у базі
//4.якщо користувач є , то повідомляємо його
//5.якщо не має то хешируєм пароль
//6.якщо немає, вносимо його в базу даних
//7.генеруємо токен і присвоюємо користувачу
//8.відправити відповідь , що успішно збережена реєстрація


})
app.post("/login", (req, res) => {

})
app.post("/logout", (req, res) => {

})




const { PORT } = process.env || 3000;



const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.cyan);
});

process.on("unhandledRejection", (error, _) => {
  if (error) {
    console.log(`ERROR: ${error.message}`.red);
    server.close(() => process.exit(1)); //єтот код ошибки надо описать в readme.md
  }
});
