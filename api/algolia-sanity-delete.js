const handler = (req, res) => {
  console.log(req.body);
  // TODO: Delete from Algolia

  res.status = 200;
  res.json({ message: "Delete", body: req.body });
};
