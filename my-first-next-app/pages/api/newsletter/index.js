import { connectDatabase, insertDocument } from '../../../helpers/databaseUtilities';

async function handler(req, res) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    return res.status(500).json({ message: `Connecting to the database failed!` });
  }

  switch (req.method) {
    case 'POST':
      const { email } = req.body;

      if (!email || !email.includes('@')) {
        return res.status(422).json({ message: 'Invalid email address' });
      }

      try {
        await insertDocument(client, 'email', { email });
        client.close();
      } catch (error) {
        return res.status(500).json({ message: `Inserting data failed!` });
      }

      res.status(201).json({
        message: 'Newsletter registration successful!',
        email,
      });
      break;
    default:
      res.status(200).json({ message: 'Ok' });
  }
}

export default handler;
