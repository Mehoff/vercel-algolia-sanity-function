const get_handler = (req, res) => {
  res.status(200).json({ data: "Hello world!" });
};

export default get_handler;
