const mongoose = require("mongoose");
const Category = mongoose.model("categories");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.get("/api/categories", requireLogin, async (req, res) => {
    const categories = await Category.find({ _user: req.user.id });
    res.send(categories);
  });

  app.post("/api/categories", requireLogin, async (req, res) => {
    const { name } = req.body;
    const category = new Category({ name, _user: req.user.id });
    try {
      await category.save();
      res.send(category._id);
    } catch (err) {
      res.send(err, req.user);
    }
  });

  app.get("/api/categories/:categoryId", requireLogin, async (req, res) => {
    try {
      const category = await Category.findOne({ _id: req.params.categoryId });
      res.send(category);
    } catch (err) {
      res.send(err);
    }
  });

  app.delete("/api/categories/:categoryId", requireLogin, async (req, res) => {
    console.log("delete route");
    try {
      const category = await Category.findByIdAndRemove(req.params.categoryId);
      res.send(category);
    } catch (err) {
      res.send(err);
    }
  });

  app.put("/api/categories/:categoryId", requireLogin, async (req, res) => {
    try {
      const { name } = req.body;
      const modifiedDate = Date.now();
      const category = await Category.findOneAndUpdate(
        { _id: req.params.categoryId },
        { $set: { name, modifiedDate } },
        { new: true }
      );
      res.send(category);
    } catch (err) {
      res.send(err);
    }
  });
};
