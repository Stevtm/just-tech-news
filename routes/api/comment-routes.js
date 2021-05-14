const router = require("express").Router();
const { Comment } = require("../../models");

router.get("/", (req, res) => {
	Comment.findAll({})
		.then((dbCommentData) => {
			res.json(dbCommentData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

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

router.delete("/:id", (req, res) => {
	Comment.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbCommentData) => {
			if (!dbCommentData) {
				res.status(404).json({ message: "No comment with that id was found!" });
				return;
			}

			res.status(200).json(dbCommentData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
