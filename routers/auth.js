// Import dependencies
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
// Setup the express server router
const router = express.Router();
// On post
router.post("/",async (req,res) => {
    // Dummy data
    const users = [{email:"axogm@axogmweb.unaux.com",password:"e3c81e54ae",roles:["admin","editor","viewer"]}];
    // Get to user from the database, if the user is not return error
    let user = users.find(u => u.email === req.body.email);
    if (!user) throw new Error("Invalid email or password.");
    // Compare the password with the pasword in the database
    const valid = await bcrypt.compare(req.body.password,user.password)
    if (!valid) throw new Error("Invalid email or password.");
    const token = jwt.sign({
        id: user._id,
        roles: user.roles,},
        "jwtPrivateKey", {expiresIn:"15m"});
        res.send({
            ok: true,
            token: token
        });
});
// Export the router
module.exports = router;