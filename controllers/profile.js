const handleProfile = (req, res, pg) => {
	const { id } = req.params;
	pg.select('*').from('users').where({id:id})
		.then(user=>{
			if(user.length){
				res.send(user[0])
			} else {
				res.status(400).send("No User You Queried")
			}
		})
		.catch((err)=>res.status(404).send("ERRORRRRRR"))
}

module.exports = {

	handleProfile:handleProfile

}