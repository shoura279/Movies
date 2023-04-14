const router = require("express").Router();
const pool = require("../db/dbconection");
const util = require("util");

router.get("/movies/ratings", async (req, res) => {
  try {
    const query = util.promisify(pool.query).bind(pool);
    const data = await query(`select movie_name,cnt from  thecamp_cinema`);
    res.send(data);
  } catch (err) {
    res.states(500).send(err);
  }
});
router.post("/movies/ratings", async (req, res) => {
  try {
    const query = util.promisify(pool.query).bind(pool);
    await query(
      `INSERT INTO thecamp_movies_ratings( movie_id,movie_review) VALUES (${req.body.movie_id},"${req.body.movie_review}")`
    );
    const data = await query(
      `select cnt,reviews from thecamp_cinema where id=${req.body.movie_id}`
    );
    console.log(data[0].cnt);
    console.log(data[0].reviews);
    data[0].cnt++;
    if(data[0].reviews)data[0].reviews+=",";
    data[0].reviews+=(req.body.movie_review);
    await query(
      `UPDATE thecamp_cinema SET cnt=${data[0].cnt},reviews="${data[0].reviews}" where id=${req.body.movie_id}`
    );
    res.send("success");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
router.patch("/movies/ratings/:id", async (req, res) => {
  try {
    const query = util.promisify(pool.query).bind(pool);
    await query(
      `UPDATE thecamp_movies_ratings SET movie_review='${req.body.movie_review}' WHERE id =${req.params.id}`
    );
    res.send("success");
  } catch (err) {
    res.states(500).send(err);
  }
});
router.delete("/movies/ratings/:id", async (req, res) => {
  try {
    const query = util.promisify(pool.query).bind(pool);
    await query(
      `DELETE FROM thecamp_movies_ratings WHERE id= ${req.params.id}`
    );
    res.send("success");
  } catch (err) {
    res.states(500).send(err);
  }
});

module.exports = router;
