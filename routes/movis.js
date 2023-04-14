const router = require("express").Router();
const pool = require("../db/dbconection");
const util = require("util");

router.get("/movies", async (req, res) => {
  try {
    const query = util.promisify(pool.query).bind(pool);
    const data = await query(`select * from thecamp_cinema`);
    res.send(data);
  } catch (err) {
    res.states(500).send(err);
  }
});
router.post("/movies", async (req, res) => {
  try {
    const query = util.promisify(pool.query).bind(pool);
    await query(
      `INSERT INTO thecamp_cinema( movie_name, movie_length, movie_director) VALUES ("${req.body.movie_name}",${req.body.movie_length},"${req.body.movie_director}")`
    );
    res.send("success");
  } catch (err) {
    res.states(500).send(err);
  }
});
router.patch("/movies/:id", async (req, res) => {
  try {
    const query = util.promisify(pool.query).bind(pool);
    await query(
      `UPDATE thecamp_cinema SET movie_name='${req.body.movie_name}',movie_length=${req.body.movie_length},movie_director="${req.body.movie_director}" WHERE id =${req.params.id}`
    );
    res.send("success");
  } catch (err) {
    res.states(500).send(err);
  }
});
router.delete("/movies/:id", async (req, res) => {
  try {
    const query = util.promisify(pool.query).bind(pool);
    await query(`DELETE FROM thecamp_cinema WHERE id= ${req.params.id}`);
    res.send("success");
  } catch (err) {
    res.states(500).send(err);
  }
});

module.exports = router;
