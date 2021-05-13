const router = require("express").Router();
const { Post, User, Vote } = require("../../models");
const sequelize = require("../../config/connection");

// GET all posts; /api/posts/
router.get("/", (req, res) => {
	console.log("====================");
	Post.findAll({
		attributes: [
			"id",
			"post_url",
			"title",
			"created_at",
			[
				sequelize.literal(
					"(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
				),
				"vote_count",
			],
		],
		order: [["created_at", "DESC"]],
		include: [
			{
				model: User,
				attributes: ["username"],
			},
		],
	})
		.then((dbPostData) => {
			res.json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET one post; /api/posts/:id
router.get("/:id", (req, res) => {
	Post.findOne({
		where: {
			id: req.params.id,
		},
		attributes: [
			"id",
			"post_url",
			"title",
			"created_at",
			[
				sequelize.literal(
					"(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
				),
				"vote_count",
			],
		],
		include: {
			model: User,
			attributes: ["username"],
		},
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: "No post found with this id" });
				return;
			}

			res.json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST create a post; /api/posts
router.post("/", (req, res) => {
	Post.create({
		title: req.body.title,
		post_url: req.body.post_url,
		user_id: req.body.user_id,
	})
		.then((dbPostData) => res.json(dbPostData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// PUT add a vote /api/posts/upvote
router.put("/upvote", (req, res) => {
	Post.upvote(req.body, { Vote })
		.then((dbPostData) => res.json(dbPostData))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

// PUT update a post title; /api/posts/:id
router.put("/:id", (req, res) => {
	Post.update(
		{
			title: req.body.title,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: "No post found with this id" });
				return;
			}

			res.json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// DELETE a post; /api/posts/:id
router.delete("/:id", (req, res) => {
	Post.destroy({
		where: {
			id: req.params.id,
		},
	})
		.then((dbPostData) => {
			if (!dbPostData) {
				res.status(404).json({ message: "No post found with this id" });
				return;
			}

			res.json(dbPostData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
