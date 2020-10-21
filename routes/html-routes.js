module.exports = function (app) {

    app.get("/resort", function(req, res) {
        res.render("resort");
    });
    
    app.get("/activity", function(req, res) {
        res.render("activity");
    });
    
    app.get("/aboutus", function(req, res) {
        res.render("aboutUs");
    });
    
    app.get("*", function(req, res) {
        res.render("index");
    });
}
