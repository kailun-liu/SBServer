const ValidateEmail = (inputText) => {
	var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if(inputText.match(mailformat))
	{
		return true;
	}
	else
	{
		return false;
	}
}


const CheckPassword = (inputtxt) => { 

	var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
	if(inputtxt.match(decimal)) 
	{ 
		return true;
	}
	else
	{ 
		return false;
	}
} 


const handleRegister = (req, res, pg, bcrypt) => {
	const { email, name, password } = req.body;
	if (!email || !name || !password) {

		return res.status(400).json('incorrect form submission')

	} else if (!ValidateEmail(email) && !CheckPassword(password)) {

		return res.status(400).json('incorrect email and password format')

	} else if (!ValidateEmail(email)){

		return res.status(400).json('incorrect email format')

	} else if (!CheckPassword(password)) {

		return res.status(400).json('incorrect password format')

	}
	var hash = bcrypt.hashSync(password);
	pg.transaction(trx => {
		return trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users').insert({
				name:name,
				email:loginEmail[0],
				joined: new Date()
			}).returning('*')
			  .then(resp=> {
			  	res.json(resp)
			})		  		
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch((err)=>res.status(400).json('InValidEmail'))	
}


module.exports = {

	handleRegister: handleRegister
}
