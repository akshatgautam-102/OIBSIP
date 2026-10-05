const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const session = require("express-session");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: "login-task-secret",
    resave: false,
    saveUninitialized: false
}));

app.get("/", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.send("Username/Email and password are required");
    }
    if (password.length < 8) {
        return res.send("Password must be at least 8 characters");
    }
    if (!/\d/.test(password)) {
        return res.send("Password must contain at least 1 number");
    }
    const users = JSON.parse(
        fs.readFileSync("users.json", "utf8")
    );
    const existinguser = users.find(
        user => user.username === username
    );

    if (existinguser) {
        return res.send("username/email already exists");
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = {
        username: username,
        password: hashedpassword
    };

    users.push(newuser);
    fs.writeFileSync(
        "users.json",
        JSON.stringify(users, null, 2)
    );
    res.redirect("/login");
});

app.get("/login", (req, res) => {
    res.render("login");
});


app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.send("Username and password are required");
    }
    const users = JSON.parse(
        fs.readFileSync("users.json", "utf8")
    );
    const user = users.find(
        user => user.username === username
    );
    if (!user) {
        return res.send("Invalid username/email or password");
    }
    const isMatch = await bcrypt.compare(
        password,
        user.password
    );
    if (!isMatch) {
        return res.send("Invalid username/email or password");
    }
    req.session.user=user.username;
    res.redirect("/dashboard");
});
app.get("/dashboard",(req,res)=>{
    if(!req.session.user){
        return res.redirect("/login");
    }
    res.render("dashboard",{
        username:req.session.user
    });
})
app.post("/logout", (req, res) => {

    req.session.destroy(() => {
        res.redirect("/login");
    });

});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});