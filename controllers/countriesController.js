const Country = require("./../models/countryModel");

const getAllPrefixes = async (req, res) => {
  const phonePrefixes = await Country.find().select("phonePrefix name");
  res.status(200).json({
    status: "success",
    results: phonePrefixes.length,
    body: {
      phonePrefixes,
    },
  });
};

module.exports = {
  getAllPrefixes,
};
