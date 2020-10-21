module.exports = function (app) {

    app.get("/resort", function(req, res) {
        res.render("resort");
    });

    app.get("/resorts/:id", function (req, res) {
        // Write code here to retrieve one of the resorts from the database and res.json them
        // back to the user
        db.Resort.findOne({ where: { id: req.params.id } })
        .then(function (getResort) {
            // res.json(getResort);
            const resortJson = {
                name: getResort.name,
                address: getResort.address,
                phone: getResort.phone
            }
            res.render("resort", resortJson);
        }).catch(err => {
            res.status(500).json(getResort)
        });
    });
    
    app.get("/activity", function(req, res) {
        res.render("activity");
    });
    
    app.get("/aboutus", function(req, res) {
        res.render("aboutUs");
    });
    
    // app.get("*", function(req, res) {
    //     res.render("index");
    // });
}
