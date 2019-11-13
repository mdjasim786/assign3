let modal=require('../modal/spRegisterSchema')


let spQueries = {
//Insert Customer in DB
insertSP : function (objToSave) {
	return new Promise((resolve, reject)=>{
		 new modal(objToSave).save((err,result)=>{
			if(err)
				reject (err)
			else
				resolve (result)
		});
	})
},

// update sp detail in db

updateSP : function (id,updateDetail) {
	return new Promise((resolve, reject)=>{
		console.log(id);
		modal.findByIdAndUpdate(id,updateDetail, (err,result)=>{
			if(err)
			reject (err)
		else
			resolve (result)
		});
	})
},

// check sp in database

checkSP : function (criteria) {
	return new Promise((resolve, reject)=>{
		modal.find(criteria, (err,result)=>{
			if(err)
				reject (err)
			else
				resolve (result)
		});
	})
},

//check sp by id

checkSPById : function (id) {
	return new Promise((resolve, reject)=>{
		modal.findOne({_id:id}, (err,result)=>{
			if(err)
				reject (err)
			else
				resolve (result)
		});
	})
}
}


module.exports = spQueries;