
const handleImage = (req, res, pg) => {
	const { id } = req.body;
	pg('users').where({id:id}).increment('entries', 1).returning('entries')
		.then(data=>res.json(data[0]))
		.catch((err)=>res.status(404).json("ERRORRRRRR"))
}

module.exports = {

	handleImage:handleImage

}