import { connectDatabase, getAllDocuments, insertDocument } from '../../../helpers/databaseUtilities';

async function handler(req, res) {
  const { eventId } = req.query;
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    return res.status(500).json({ message: 'Connecting to the database failed! ' });
  }

  switch (req.method) {
    case 'POST':
      const { email, name, text } = req.body;

      if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
        client.close();
        return res.status(422).json({ message: 'Invalid input' });
      }

      const newComment = {
        eventId,
        email,
        name,
        text,
      };

      try {
        const result = await insertDocument(client, 'comments', newComment);
        console.log('RESULT?!', result);
        newComment._id = result.insertedId;
        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
      } catch (error) {
        res.status(500).json({ message: 'Inserting comment failed' });
      }

      break;
    case 'GET':
      // const dummyList = [
      //   { id: 'c1', name: 'Matthew', text: 'A first comment! ' },
      //   { id: 'c2', name: 'Caitlin', text: 'A second comment! ' },
      //   { id: 'c3', name: 'Daniel', text: 'A third comment! ' },
      // ];

      try {
        const documents = await getAllDocuments(client, 'comments', { _id: -1 });
        console.log('YO WTF', documents);
        res.status(200).json({ comments: documents });
      } catch (error) {
        res.status(500).json({ message: 'Getting comments failed' });
      }
      break;
    default:
      break;
  }

  client.close();
}

export default handler;
