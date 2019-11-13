const customerServices = require('../services/customer-services');
const hashPassword = require('../util/hash-password');
const token = require('../util/token');
let customerFunctions = {
    register: async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let password = await hashPassword.generateHashPassword(req.body.password);
    let location = req.body.location;
    let logoutKey="false";
    console.log(req.body);

    //     save data in database
    customerData = {
        name,
        email,
        password,
        location,
        logoutKey
    }
    let criteria = { email }
    //check customer exist or not
    let customerExist = await customerServices.checkCustomer(criteria)
    console.log(customerExist)
    if (customerExist.length > 0) {
        res.json({
            "message": "Customer exist..",
            "status": 400,
            "data": {}
        })

    } else {
        try {
            let customerDbData = await customerServices.insertCustomer(customerData);
            res.json({
                "message": "Successfully registered",
                "status": 200,
                "data": customerData
            })
        } catch (error) {
            console.log(error)
            res.json({
                "message": "Cannot registered successfully",
                "status": 400,
                "data": error
            })
        }
    }


},

    customerLogin : async (req, res) => {
    let email = '', password = '';
    email = req.body.email;
    password = req.body.password;
    let criteria = { email }
    //check customer exist
    let customerDbData = await customerServices.checkCustomer(criteria)
    console.log(customerDbData.length)
    console.log(customerDbData)
    if (customerDbData.length > 0) {


        try {
            let customerId = customerDbData[0].id;  
            let logoutKey=customerDbData[0].logoutKey;
            console.log(logoutKey)
            let payload={
                customerId,
                email,
                logoutKey
            }                                    //get customer id from database
            let checkPassword = await hashPassword.checkHashPassword(password, customerDbData[0].password)
            if (checkPassword) {
                console.log(checkPassword)
                let getToken = await token.generateToken(payload)
                console.log("---",getToken)
                console.log(customerId)
                let logoutKey={
                    logoutKey:"false"
                };
                customerDbData = await customerServices.updateCustomer(customerId,logoutKey)
                console.log("customerdata",customerDbData)
                console.log("mmmm")
                console.log("mmmm")
                console.log(getToken)
                res.json({
                    "message": "Successfully login",
                    "status": 200,
                    "token": getToken
                })
            }
            else {
                res.json({
                    "message": "Password doesn't match..",
                    "status": 400,
                    "data": {}
                })

            }

        } catch (error) {
            res.json({
                "message": error.message,
                "status": 400,
                "data": error
            })
        }

    }
    else {
        res.json({
            "message": "Customer not exist",
            "status": 400,
            "data": {}
        })

    }

},

updateProfile :async (req, res) => {
    let id=req.params.customerid;
    
    console.log(id);
    
    
    let customerData=req.body;
    console.log("body: ",req.body)
    let password=req.body.password
    if(typeof password!=="undefined")
    {
    customerData.password=await hashPassword.generateHashPassword(req.body.password);
    console.log("hash",customerData.password);
    }
    else
    {
    customerData=req.body;
    }
    
    try {
        console.log("id:-- ",id);
        console.log("customerdata:-- ",customerData);
        
    let customerDbData = await customerServices.updateCustomer(id,customerData);
    console.log("------",customerDbData);
    res.json({
    "message": "Successfully updated",
    "status": 200,
    "data": customerData
    })
    } catch (error) {
    console.log(error)
    res.json({
    "message": "Cannot updated details successfully",
    "status": 400,
    "data": error
    })
    }
    
    },

     findNearbySps : async(req,res)=>{

try {
    let id=req.query.id;
    let customerDbData=await customerServices.checkCustomerById(id);
    console.log(customerDbData)
    let distance=req.params.distance;
    console.log(customerDbData.location);
    let location=customerDbData.location;
    let type=location.type;
    console.log(type)
    //console.log(coordinates)
    let coordinates=location.coordinates;
    console.log(coordinates)
   // console.log(customerDbData.location);
    console.log(location)
    console.log("yes ")
    let findSP=await customerServices.findSps(type,coordinates,distance);
    res.send(findSP)
} catch (error) {
    console.log('--------',error)
        res.json({
            "message": "Cannot found sps",
            "status": 400,
            "data": error
        })
}
},
     logout : async (req, res)=>
{
    try {
        console.log("in logout");
        let id=req.reqid;
        console.log("req.id =",id)
        let logoutKey={
            logoutKey:"true"
        };
        let customerDbData = await customerServices.updateCustomer(id,logoutKey);
        console.log("in logout data",customerDbData)
        res.json({
            "message": "Logout successfully",
            "status": 200,
            "data": {}
        })    
    } catch (error) {
        res.json({
            "message": "Logout failed",
            "status": 400,
            "data": error
        }) 
    }
   
}

}

module.exports = customerFunctions;