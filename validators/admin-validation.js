const joi = require('joi');
let adminValidation = {
//register validation
validateRegister : (req, res, next) => {
    let data = req.body;
    console.log("-----" + data);
    const schema = joi.object().keys({
        name: joi.string().required(),
        email: joi.string().email({ minDomainAtoms: 2 }).required(),
        password: joi.string().required().min(4),
    })
    try {
        joi.validate(data, schema, (err, value) => {
        
            if (err) {
                console.log(err)
                res.send(err)
            } else {
                next();
            }
        });

    } catch (error) {
        throw new error
    }
},

//login validation
loginValidation : (req, res, next) => {
    let data = req.body;
    console.log("-----" + data);
    const schema = joi.object().keys({
        email: joi.string().email({ minDomainAtoms: 2 }).required(),
        password: joi.string().required().min(4),
    })
    try {
        joi.validate(data, schema, (err, value) => {
            if (err) {
                res.send(err)
            } else {
                next();
            }
        });

    } catch (error) {
        throw new error
    }
},


//update validation
updateValidation : (req, res, next) => {
    let data = req.body;
    const schema = joi.object().keys({
        name: joi.string(),
        email: joi.string().email({ minDomainAtoms: 2 }),
        password: joi.string().min(4),
    })
    try {
        joi.validate(data, schema, (err, value) => {
            if (err) {
                console.log(err)
                res.send(err)
            } else {
                next();
            }
        });

    } catch (error) {
        throw new error
    }
}
}




module.exports = adminValidation;