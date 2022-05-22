function handler(req, res) {
  switch (req.method) {
    case 'POST':
      const { email } = req.body;

      if (!email || !email.includes('@')) {
        return res.status(422).json({ message: 'Invalid email address' });
      }

      console.log('Email', email);

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
