const skeletonContacts = Array(12).fill(null);

function ChatListSkeleton() {
  return (
    <div className="pr-3">
      {skeletonContacts.map((_, idx) => (
        <div key={idx} className="w-full p-2 flex items-center gap-3">
          <div className="relative mx-auto lg:mx-0">
            <div className="skeleton size-12 rounded-full" />
          </div>

          <div className=" text-left min-w-0 flex-1">
            <div className="skeleton h-4 w-48 sm:w-28 mb-2" />
            <div className="skeleton h-3 w-32 sm:w-14" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatListSkeleton;
