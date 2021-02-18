const handleSigin = (req, res, pg, bcrypt) => {
	const { email, password } = req.body;
	pg.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data=>{
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid) {
				pg.select('*').from('users')
				  .where('email', '=', email)
				  .then(user => {
				  	res.json(user[0])
				  })
				  .catch(err=>res.status(400).json(err))
			} else {
				res.status(400).json('wrong credentials')
			}
		})
		.catch(err=>res.status(400).json(err))
}


module.exports = {

	handleSigin:handleSigin

}