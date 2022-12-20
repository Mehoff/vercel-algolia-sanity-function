const hello = function (req, res) {
  res.status = 200;
  res.json({ message: "It works" });
};

module.exports = hello;
