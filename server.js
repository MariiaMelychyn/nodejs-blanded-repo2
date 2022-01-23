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
const User = require('./models/User');
dotenv.config({ path: "./config/.env" });
const bcryptjs = required('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

connectDB();
// set routes

const books = require("./routes/booksRouts");
const res = require("express/lib/response");
const { required } = require("nodemon/lib/config");

app.use("/api/v1/books", books);// путь обработчик роутера
app.post("/register", (req, res) => {
//1.получаємо дані від користувача(email, password, name)
const { email, password } = req.body;


//2.валідацію полів користувача
if (!password || !email){
  return res.status(400).json({code: 400, message: 'Введіть коректні поля'})
}
//3.провіряємо чи користувач є у базі
const user = await User.findOne({email});
//4.якщо користувач є , то повідомляємо його
if (user){
  return res
  .status(409)
  .json({code: 409, message: 'user of ready'})
}
//5.якщо не має то хешируєм пароль
const hashPassword = await bcryptjs.hash('bacon', 8, );
console.log(hashPassword);
//6.підготовуємо користувачабякщо немає, вносимо його в базу даних
const candidate = await User.create({...req.body, password: hashPassword})
console.log(candidate);
//7.генеруємо токен і присвоюємо користувачу
const token = await  jwt.sign({
  user_id: candidate._id
}, 
process.env.JWT_SECRET_KEY,
{expiresIn: '5h'}
);
candidate.token = token;
await candidate.save()
//8.відправити відповідь , що успішно збережена реєстрація
return res
.status(201)
  .json({code: 201, message: 'user of successfuly created'})

});


app.post("/login", (req, res) => {
//1.получаємо дані від користувача(email, password, name)
const { email, password } = req.body;
//2.валідацію полів користувача
if (!password || !email){
  return res.status(400).json({code: 400, message: 'Введіть коректні поля'})
  }
//3.провіряємо чи користувач є у базі
const user = await User.findOne({email});
//4.якщо користувач є , то провіряємо логін його та пароль на валідність
// if (user){
//   return res
//   .status(409)
//   .json({code: 409, message: 'user of ready'})
// }

//5. 

//6. Провіряємо токін на валідність в базі даних, якщо валідний пропускаємо далі,якщо ні видаємо новий токен


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
