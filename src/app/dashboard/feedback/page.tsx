"use client"
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Textarea from "./TextArea";
import { motion } from "framer-motion";

type Mood = "bad" | "poor" | "neutral" | "good" | "great";

const moods: { type: Mood; emoji: string; label: string }[] = [
  { type: "bad", emoji: "😠", label: "Bad" },
  { type: "poor", emoji: "😕", label: "Poor" },
  { type: "neutral", emoji: "😐", label: "Neutral" },
  { type: "good", emoji: "🙂", label: "Good" },
  { type: "great", emoji: "😊", label: "Great" },
];

const FeedbackPage = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!selectedMood) {
      toast.error(` "Please select how you feel"`, {
        position: "top-right",
      });
      return;
    }

    toast.success(
      "Thank you for your feedback!", {
      position: "top-right",

    });

    setSelectedMood(null);
    setComment("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl space-y-8"
      >
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            How do you feel?
          </h1>
          <p className="text-gray-600">
            Your feedback is very important in helping us understand your needs better,
            so we can customize our services accordingly.
          </p>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {moods.map(({ type, emoji, label }) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(type)}
              className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors
                ${selectedMood === type
                  ? "bg-blue-50 ring-2 ring-blue-500"
                  : "bg-gray-50 hover:bg-gray-100"
                }`}
            >
              <span className="text-4xl mb-2">{emoji}</span>
              <span className="text-sm text-gray-600">{label}</span>
            </motion.button>
          ))}
        </div>

        <div className="space-y-4">
          <Textarea
            value={comment}
            onChange={(e: any) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="min-h-[120px] resize-none"
          />

          <Button
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Send now
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackPage;