const router = require("express").Router();
const { Comment } = require("../../models");

router.get("/", (req, res) => {});

router.post("/", (req, res) => {
	const { comment_text, user_id, post_id } = req.body;

	Comment.create({
		comment_text,
		user_id,
		post_id,
	})
		.then((dbCommentData) => {
			res.json(dbCommentData);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

router.delete("/:id", (req, res) => {});

module.exports = router;
