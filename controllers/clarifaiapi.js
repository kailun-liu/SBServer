const Clarifai = require('clarifai');



const handleClarifai = (req, res) => {
	const { url } = req.body;
	const app = new Clarifai.App({
 		apiKey: '8bdb3c7879654567b5bb3f5b92b4ea06'
	}); 
	app.models.predict(Clarifai.FACE_DETECT_MODEL,url)
	.then(data=> res.json(data))
	.catch((err)=>res.status(404).json("ERRORRRRRR"))
}

module.exports = {

	handleClarifai:handleClarifai

}