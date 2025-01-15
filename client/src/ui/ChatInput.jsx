import { useState } from "react";
import { useChartStore } from "../store/useChatStore";
import { X, Image, Send, SmilePlus } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";

function ChatInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { sendMessage } = useChartStore();

  function handleChange(e) {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  }

  function removeImage() {
    setImagePreview(null);
  }

  async function handleSendMessage(e) {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message", error);
    }
  }

  return (
    <div className="w-full space-y-2 py-2 sm:px-4 px-1 relative">
      <div className="flex justify-between">
        {imagePreview && (
          <div className="">
            <div className="relative">
              <button
                className="p-0.5 rounded-full bg-primary absolute top-[-0.5rem] right-[-0.5rem]"
                onClick={removeImage}
              >
                <X className="text-primary-content" />
              </button>

              <img
                src={imagePreview}
                alt="preview"
                className="size-20 rounded-md"
              />
            </div>
          </div>
        )}
        {showEmojiPicker && (
          <div className="absolute bottom-16 right-0">
            <EmojiPicker
              theme="dark"
              onEmojiClick={(e) => setText((prev) => prev + e.emoji)}
            />
          </div>
        )}
      </div>

      <form
        onSubmit={handleSendMessage}
        className="flex items-center justify-between gap-2 sm:gap-4 py-1 sm:py-2 px-1 sm:px-0"
      >
        <label htmlFor="image-upload" className="cursor-pointer">
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
          <Image className="size-6 text-info" />
        </label>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="input input-base-200 input-bordered flex-grow"
        />
        <button
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        >
          <SmilePlus className="size-6 text-warning" />
        </button>
        <button
          type="submit"
          className="p-2.5 bg-base-200 rounded-md"
          disabled={!text.trim() && !imagePreview}
        >
          <Send className="size-5 text-primary" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
