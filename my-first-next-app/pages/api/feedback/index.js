import fs from 'fs';
import path from 'path';

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), 'data', 'feedback.json');
};

export const extractFeedback = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return data;
};

function handler(req, res) {
  let data;

  switch (req.method) {
    case 'GET':
      data = extractFeedback(buildFeedbackPath());
      res.status(200).json({ feedback: data });
      break;
    case 'POST':
      const { email, feedback } = req.body;

      const newFeedback = {
        id: new Date().toISOString(),
        email,
        feedback,
      };

      data = extractFeedback(buildFeedbackPath());

      data.push(newFeedback);
      fs.writeFileSync(filePath, JSON.stringify(data));

      res.status(201).json({
        message: 'Success!',
        feedback: newFeedback,
      });
      break;
    default:
      res.status(200).json({ message: 'Test' });
      break;
  }
}

export default handler;
