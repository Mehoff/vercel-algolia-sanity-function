import algoliasearch from "algoliasearch";
import sanityClient from "@sanity/client";
import env from "dotenv";
env.config();

const algolia = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);

const config = {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2021-03-25",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
};

const sanity = sanityClient(config);

const handler = (request, response) => {
  const algoliaIndex = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);

  const sanityAlgolia = indexer(
    {
      animal: {
        index: algoliaIndex,
        projection: `{
                      name
                  }
                  `,
      },
      photo: {
        index: algoliaIndex,
        projection: `{
                      name,
                      description,
                      url
                  }`,
      },
      user: {
        index: algoliaIndex,
        projection: `{
                      name,
                      age,
                      photos[]->{name, description, url}
                  }`,
      },
    },
    (document) => document
  );

  return sanityAlgolia
    .webhookSync(sanity, request.body)
    .then(() => response.status(200).send("OK"));
};

export default handler;
