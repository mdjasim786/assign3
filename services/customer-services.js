let modal=require('../modal/CustomerRegisterSchema')
let spModal=require('../modal/spRegisterSchema')
let customerQueries = {
//Insert Customer in DB
insertCustomer : function (objToSave) {
	return new Promise((resolve, reject)=>{
		 new modal(objToSave).save((err,result)=>{
			if(err)
				reject (err)
			else
				resolve (result)
		});
	})
},

//update customer detail in db

updateCustomer : function (id,updateDetail) {
	console.log("before promise")
	console.log(">>" + id);
	console.log(">>" + updateDetail);
	
	
	return new Promise((resolve, reject)=>{
		console.log("in update")
		console.log(id);
		modal.findByIdAndUpdate(id,updateDetail, (err,result)=>{
			if(err)
			reject (err)
		else
			resolve (result)
		});
	})
},

//check Custermer in databse

checkCustomer : function (criteria) {
	return new Promise((resolve, reject)=>{
		modal.find(criteria, (err,result)=>{
			if(err)
				reject (err)
			else
				resolve (result)
		});
	})
},

//check customer by id

checkCustomerById : function (id) {
	return new Promise((resolve, reject)=>{
		modal.findOne({_id:id}, (err,result)=>{
			if(err)
				reject (err)
			else
		
				resolve (result)
				
		});
	})
},

//find sp with in 5 km

findSps : function(type,coordinates,distance){
	return new Promise((resolve, reject)=>{
		console.log(type)
	  spModal.aggregate([{$geoNear:{"near":{"type":type,"coordinates":coordinates},"distanceField": "distance","spherical": true,"maxDistance":distance*1000}}],(err,result)=>{
          if (err) {
			  reject(err)
			  //console.log(err)
		  } else {
			  resolve(result)
		  }
	  })
	})
}

}



module.exports = customerQueries;


