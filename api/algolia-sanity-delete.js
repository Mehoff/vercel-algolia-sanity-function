const algoliasearch = require("algoliasearch");

const algolia = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);

const handler = (req, res) => {
  console.log(req.body);
  // TODO: Delete from Algolia

  const algoliaIndex = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);

  const deleted = req.body.ids.deleted;

  res.status = 200;

  if (!deleted) {
    res.json({ message: "Deleted is undefined", body: req.body });
    return;
  }

  algoliaIndex
    .deleteObjects(deleted)
    .then((cb) => {
      console.log(cb);
      res.json({ message: "Delete", ids: deleted, cb });
    })
    .catch((err) => {
      console.error(err);
      res.json({ message: "Delete error", error: err });
    });

  //   res.status = 200;
  //   res.json({ message: "Delete", body: req.body });
};

module.exports = handler;
