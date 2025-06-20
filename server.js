import express from "express";


const app = express();

// app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded())

app.get("/user", (req, res, next) => {
  const { name, city } = req.query;
  //   console.log(req.query.name);
  //   res.send(req.query.name);
  res.json({ name, city });
  // next()
});

app.get("/:user/:name", (req, res) => {
  console.log(req.params.name);
  const { user, name } = req.params;
  res.json({ user, name });
});

const user = {
    name:"vahid",
    age: 20,
    city: "Latur"
}

app.post('/user',(req,res)=>{
    console.log(user.name)
    const {name,age,city}= req.body
    res.json({name,age,city})
})

app.put('/user',(req,res)=>{
    const {name,age,city} = req.body
    user.name = name
    user.age = age
    user.city = city
    res.json(user)
})

app.listen(3000, () => {
  console.log("Server is Running");
});
