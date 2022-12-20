export default function hello(req, res) {
  res.status = 200;
  res.json({ message: "It works!" });
}
