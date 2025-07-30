import { useEffect, useRef, useState } from "react";

export default function HumanTyping() {
  const sentences = [
    "Loading system...",
    "Connecting to server...",
    "Authentication successful.",
    "Welcome back!",
  ];

  const [text, setText] = useState("");
  const sIdx = useRef(0);
  const cIdx = useRef(0);
  const pausePos = useRef(0);
  const currentSentence = useRef("");

  useEffect(() => {
    const nextSentence = () => {
      sIdx.current = (sIdx.current + 1) % sentences.length;
      currentSentence.current = sentences[sIdx.current];
      cIdx.current = 0;
      pausePos.current = 2 + Math.floor(Math.random() * (currentSentence.current.length - 3));
      setText("");
    };

    const type = () => {
      const sentence = currentSentence.current;
      if (cIdx.current < sentence.length) {
        const delay =
          cIdx.current === pausePos.current
            ? 300 + Math.random() * 200
            : 50 + Math.random() * 100;

        setText(sentence.slice(0, cIdx.current + 1));
        cIdx.current++;
        setTimeout(type, delay);
      } else {
        setTimeout(() => {
          nextSentence();
          type();
        }, 1000);
      }
    };

    currentSentence.current = sentences[sIdx.current];
    type();
  }, []);

  return (
    <span className="text-[#00ffff] font-mono text-xl">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}
