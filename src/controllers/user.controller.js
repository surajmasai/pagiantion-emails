const express = require('express');


const User = require("../model/user.model");

const sendmail = require("../utlis/send-mail");


const router = express.Router();


router.post("/", async (req, res) => {

    try {
        const user = await User.create(req.body);

        sendmail("surj@k.com", `${req.body.email}`, `welcome to suraj system ${req.body.first_name} ${req.body.last_name}`, `Hi ${req.body.first_name} Please confirm your email address`)

        return res.status(201).json({ user })
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})

router.post("/multipleadmin", async (req, res) => {
    try {
        const user = await User.create(req.body)

        const to_array = [
            "a@a.com",
            "b@b.com",
            "c@c.com",
            "d@d.com",
            "e@e.com",
        ]

        const to_string = to_array.join(",")

        sendmail("surj@k.com", to_string, `${req.body.first_name} ${req.body.last_name} has registered with us`,
            `Please welcome ${req.body.first_name} ${req.body.last_name}`
        )

        return res.status(201).send(user)
    } catch (e) {
        return res.status(500).send({ status: "fail", massege: e.massege })
    }
})

router.get("", async (req, res) => {

    try {

        const page = +req.query.page || 1;

        const size = +req.query.size || 2;

        //page  = 1 skip (0) limit (2); //(1-1)*2 = 0;
        //page = 2 skip(2) limit(2); 

        const skip = (page - 1) * size;



        const user = await User.find().skip(skip).limit(size).lean().exec();

        const totalPages = Math.ceil((await User.find().countDocuments()) / size);

        return res.send({ user, totalPages });
    }
    catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
})


module.exports = router;