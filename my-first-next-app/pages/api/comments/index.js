function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const comments = ['Hi', 'YO'];

      res.status(200).json({ comments });
      break;
    default:
      res.status(200).json({ message: 'Ok' });
  }
}
