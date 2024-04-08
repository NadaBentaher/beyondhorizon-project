import express, { Request, Response } from "express";
import Draw from "../models/draw";
import verifyToken from "../middleware/auth";

const router = express.Router();

// Choices for the draw
const choices = [
  { text: "Unfortunately, you didn't score a win this time! Take a look at our fantastic travel deals instead.", chance: 0.4 },
  { text: "Better luck next attempt! Try your luck again next week.", chance: 0.3 },
  { text: "Unfortunately, you didn't win this time. Don't reel in the disappointment! There are plenty more chances to win.", chance: 0.2 },
  { text: "Sorry, you didn't win this time. Stay tuned for more opportunities to win in the future!", chance: 0.1 },
  { text: "10% discount", chance: 0.03 },
  { text: "20% discount", chance: 0.03 },
  { text: "Free weekend at a hotel", chance: 0.02 },
  { text: "Complimentary tours and activities", chance: 0.02 },
  { text: "Travel-themed gift baskets", chance: 0.05 }
];

// Route to participate in the draw
router.post("/draw-participation", verifyToken, async (req: Request, res: Response) => {
  try {
    // Check if the user has already participated this week
    const lastParticipation = await Draw.findOne({
      userId: req.userId,
      participationDate: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) },
    });
    if (lastParticipation) {
      return res.status(400).json({ message: "You have already participated in the draw this week." });
    }

    // Generate random draw result based on predefined chances
    const drawResult = getRandomChoice(choices);
    if (!drawResult) {
      return res.status(500).json({ message: "An error occurred while generating draw result." });
    }

    // Record the draw participation with the current date and draw result
    const draw = new Draw({ userId: req.userId, result: drawResult.text, participationDate: new Date() });
    await draw.save();

    // Respond with success message and draw result
    res.json({ message: "You have successfully participated in the draw.", result: drawResult.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while participating in the draw." });
  }
});

// Route to check if the user has already participated this week
router.get("/check-participation", verifyToken, async (req: Request, res: Response) => {
    try {
      // Check if the user has already participated this week
      const lastParticipation = await Draw.findOne({
        userId: req.userId,
        participationDate: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) },
      });
      res.json({ alreadyParticipated: !!lastParticipation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while checking participation." });
    }
  });
// Function to get a random choice based on predefined chances
function getRandomChoice(choices: { text: string; chance: number }[]) {
  let totalChance = choices.reduce((sum, choice) => sum + choice.chance, 0);
  let randomValue = Math.random() * totalChance;

  for (let i = 0; i < choices.length; i++) {
    const choice = choices[i];
    randomValue -= choice.chance;
    if (randomValue <= 0) {
      return choice;
    }
  }
}

export default router;
