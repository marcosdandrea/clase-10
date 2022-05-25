const express = require('express');
const { engine } = require("express-handlebars");
const Api = require('./Api');
const Contenedor = require('./contenedor');
const app = express();
const PORT = 8080;

//FOR TEST PURPOSE ONLY!
const mode = 0 // 0 = handlebars ; 1 = pug ; 2 = ejs

if (mode == 0) {
    console.log ("Running Handlebars engine")

    app.engine(
        "hbs",
        engine({
            helpers: {
                inc: function (value, options) {
                    return parseInt(value) + 1;
                }
            },
            extname: ".hbs",
            defaultLayout: "index.hbs",
            layoutDir: __dirname + "/views/layouts",
            partialDir: __dirname + "/views/partials"
        }),

    )
    app.set("view engine", "hbs");
    app.set("views", "./views");
} else if (mode == 1) {
    console.log ("Running Pug engine")

    app.set("view engine", "pug");
    
    app.set("views", "./views");
    
    app.get("/hello", (req, res, next) => {
        const products = [
            {title: "Pepsi", price: 100},
            {title: "Coca", price: 100},
            {title: "Fanta", price: 100},
        ]
        res.render("table", {products})
    })
}else{
    console.log ("Running Ejs engine")
    app.set("view engine", "ejs");

}

app.listen(PORT, () => {
    new Api(app, new Contenedor("data.json"))
    console.log("Server listening on port " + PORT)
});


