import { useRef, useState } from "react";
import { useChartStore } from "../store/useChatStore";

function ChatInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  const { SendMessage } = useChartStore();

  function handleChange(e) {}
  function removeImage(e) {}
  function handleSendMessage(e) {}

  return (
    <div className="w-full">
      {imagePreview && <div className="relative"></div>}
      <input type="text" />
    </div>
  );
}

export default ChatInput;
