function AuthSide({ subtitle, title }) {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-base-200 py-12 px-36 ">
      <div className="max-w-lg text-center">
        {/* Animated Circle Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className={`xl:size-20 size-12 rounded-full animate-bounce bg-primary/20 hover:bg-primary/10`}
              style={{
                animationDelay: `${(i % 4) * 0.2}s`, // Adjust delay for each column
                animationFillMode: "both", // Ensures smooth initial state
              }}
            />
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      <p className="text-base-content/60 text-center">{subtitle}</p>
    </div>
  );
}

export default AuthSide;
