import { useThemeStore } from "../store/useThemeStore.js";
import THEMES from "../constants/theme";
import { Send } from "lucide-react";
import preview from "/preview/preview.png";
const PREVIEW_MESSAGES = [
  {
    id: 1,
    content:
      "Do not stress for work. It's called deadline but nobody actually dies.",
    isSent: false,
  },
  {
    id: 2,
    content: "Thanks! uncle Xavier ☹️",
    isSent: true,
  },
];

function SettingsPage() {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="w-full px-4 py-6">
      <div className="mx-auto max-w-5xl space-y-10">
        <div>
          <h2 className="font-bold text-xl sm:text-3xl">Themes</h2>
          <h3 className="mb-3 opacity-75">Choose a theme of your choice</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {THEMES.map((currTheme) => (
              <button
                key={currTheme}
                data-theme={currTheme}
                className={`rounded-md border-[1.5px] hover:border-primary ${
                  theme === currTheme ? "border-primary" : "border-base-200"
                }`}
                onClick={() => setTheme(currTheme)}
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                <div>
                  <div className="grid grid-cols-[1fr_4fr]">
                    <div className="grid grid-rows-[2fr_1fr]">
                      <div className="bg-base-200 rounded-tl-md"></div>
                      <div className="bg-base-300 rounded-bl-md"></div>
                    </div>

                    <div className="px-2 py-3 space-y-1">
                      <p className="font-semibold text-start ">{currTheme}</p>
                      <div className="flex gap-1">
                        <div className="rounded-md bg-primary px-1.5 font-semibold">
                          <p className="text-primary-content">A</p>
                        </div>
                        <div className="rounded-md bg-secondary px-1.5 font-semibold">
                          <p className="text-secondary-content">A</p>
                        </div>
                        <div className="rounded-md bg-accent px-1.5 font-semibold">
                          <p className="text-accent-content">A</p>
                        </div>
                        <div className="rounded-md bg-neutral px-1.5 font-semibold">
                          <p className="text-neutral-content">A</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-xl sm:text-3xl">Preview</h2>
          <h3 className="mb-3 opacity-75">Chat user interface</h3>

          <div className="p-4 sm:p-6 bg-base-200 rounded-md">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-md shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      <img
                        src={preview}
                        alt="preview profile pic"
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Uncle Xavier</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isSent ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-md p-3 shadow-sm
                          ${
                            message.isSent
                              ? "bg-primary text-primary-content"
                              : "bg-base-200"
                          }
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`
                            text-[10px] mt-1.5
                            ${
                              message.isSent
                                ? "text-primary-content/70"
                                : "text-base-content/70"
                            }
                          `}
                        >
                          1:02 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
