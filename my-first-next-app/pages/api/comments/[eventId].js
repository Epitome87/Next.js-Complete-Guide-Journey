function handler(req, res) {
  const { eventId } = req.query;

  switch (req.method) {
    case 'POST':
      const { email, name, text } = req.body;

      if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
        return res.status(422).json({ message: 'Invalid input' });
      }

      const newComment = {
        id: new Date().toISOString(),
        email,
        name,
        text,
      };

      console.log('Data received', newComment);

      res.status(201).json({ message: 'Comment added successfully', comment: newComment });
      break;
    case 'GET':
      const dummyList = [
        { id: 'c1', name: 'Matthew', text: 'A first comment! ' },
        { id: 'c2', name: 'Caitlin', text: 'A second comment! ' },
        { id: 'c3', name: 'Daniel', text: 'A third comment! ' },
      ];

      res.status(200).json({ comments: dummyList });
      break;
    default:
      break;
  }
}

export default handler;
