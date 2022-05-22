import { buildFeedbackPath, extractFeedback } from './index';

function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const { feedbackId } = req.query;
      const feedbackData = extractFeedback(buildFeedbackPath());
      const selectedFeedback = feedbackData.find((item) => item.id === feedbackId);

      res.status(200).json({
        feedback: selectedFeedback,
      });
      break;
    default:
      res.status(200).json({ message: 'Test ' });
  }
}

export default handler;
