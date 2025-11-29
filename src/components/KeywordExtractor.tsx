"use client";
import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2 } from "lucide-react";

interface Keyword {
  word: string;
}

export const KeywordExtractor = () => {
  const [text, setText] = useState("");
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState("");

  const handleExtract = async () => {
    if (!text.trim()) {
      setError("Please enter some text to extract keywords.");
      return;
    }

    setError("");
    setIsExtracting(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/extract", { text });
      setKeywords(response.data.keywords.map((word: string) => ({ word })));
    } catch (err) {
      setError("⚠️ Failed to extract keywords. Make sure backend is running.");
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 mb-6 shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Keyword Extractor
        </h1>
      </motion.div>

      {/* INPUT CARD */}
      <Card className="p-6 md:p-8 shadow-lg backdrop-blur-sm bg-white/80">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your content here..."
          className="min-h-[200px] resize-none"
        />

        <Button
          onClick={handleExtract}
          disabled={isExtracting}
          className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white shadow-md"
        >
          {isExtracting ? (
            <>
              <Loader2 className="animate-spin w-5 h-5 mr-2" /> Extracting...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" /> Extract Keywords
            </>
          )}
        </Button>

        {error && <p className="text-red-500 mt-3">{error}</p>}
      </Card>

      {/* RESULTS */}
      <AnimatePresence>
        {keywords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <Card className="p-6 md:p-8 shadow-lg bg-white/80">
              <h2 className="text-2xl font-semibold mb-4">Extracted Keywords</h2>
              <div className="flex flex-wrap gap-3">
                {keywords.map((item, index) => (
                  <Badge
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    className="px-4 py-2"
                  >
                    {item.word}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KeywordExtractor;
