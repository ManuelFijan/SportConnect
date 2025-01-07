import { useEffect, useState } from "react";

export default function ReadMore({ message }: any) {
  const [isOpen, setOpen] = useState(false);
  const [text, setText] = useState(message);

  useEffect(() => {
    if (message.length > 190) {
      setText(message.slice(0, 190) + " ...");
      setOpen(false);
    } else {
      setText(message);
      setOpen(false);
    }
  }, [message]); // samo kod promjene param. message

  const toogleActive = () => {
    setOpen(!isOpen);
    if (isOpen) setText(text.slice(0, 190) + " ...");
    else setText(message);
  };

  return (
    <div>
      <span className="text-textColor">{text}</span>
      {message.length > 190 && (
        <button onClick={toogleActive} className="text-gray-400 text-xs ml-2">
          {isOpen ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}