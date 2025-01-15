const skeletonMessages = Array(6).fill(null);

function MessageSkeleton() {
  return (
    <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-neutral/50 scrollbar-track-base-100 p-2">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}
        >
          <div className="chat-header mb-1">
            <div className="skeleton h-4 w-24" />
          </div>

          <div className="chat-bubble bg-transparent p-0">
            <div className="skeleton h-16 w-[280px]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessageSkeleton;
