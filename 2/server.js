import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());

//Synchronous

//create
app.get("/create/:username", (req, res) => {
  const { username } = req.params;
  const File = `${username}.txt`;
  const content = `hi I am ${username}`;

  fs.writeFileSync(File, content);
  return res.status(200).json({ msg: `file successfully created` });
});

//read
app.get("/read/:username", (req, res) => {
  const { username } = req.params;
  const File = `${username}.txt`;
  const data = fs.readFileSync(File, "utf-8");

  return res.status(200).send(data);
});

//update
app.put("/update", (req, res) => {
  const { username, message } = req.body;
  const File = `${username}.txt`;

  fs.appendFileSync(File, message);
  return res.status(200).send(`file name ${username}.txt Updated Successfully`);
});

//delete
app.delete("/delete/:username", (req, res) => {
  const { username } = req.params;
  const File = `${username}.txt`;

  fs.unlinkSync(File);
  res.send(`file name ${username}.txt deleted succesfully`);
});

//Asynchronous

//create
app.get("/create/:username", (req, res) => {
  const { username } = req.params;
  const File = `${username}.txt`;
  const content = `hi I am ${username}`;

  fs.writeFile(File, content, (err) => {
    if(err)
        return res.send(err)
  });
  return res.status(200).json({ msg: `file successfully created` });
});

//read
app.get("/read/:username", (req, res) => {
  const { username } = req.params;
  const File = `${username}.txt`;
  fs.readFile(File, "utf-8",(err,data)=>{
    if(err)
        return res.send(err)
    else
        return res.status(200).send(data)
  });

});

//update
app.put("/update", (req, res) => {
  const { username, message } = req.body;
  const File = `${username}.txt`;

  fs.appendFile(File, message,(err)=>{
    if(err)
        return res.send(err)
  });
  return res.status(200).send(`file name ${username}.txt Updated Successfully`);
});

//delete
app.delete("/delete/:username", (req, res) => {
  const { username } = req.params;
  const File = `${username}.txt`;

  fs.unlink(File,(err)=>{
    if(err)
        return res.send(err)
  });
  res.send(`file name ${username}.txt deleted succesfully`);
});

app.listen(3000, () => {
  console.log(`Server is running`);
});
