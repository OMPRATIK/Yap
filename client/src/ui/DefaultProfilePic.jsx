function DefaultProfilePic({ fullName, type }) {
  return (
    <div className="avatar placeholder">
      <div
        className={`bg-neutral text-neutral-content ${
          type === "nav" ? "w-10" : "w-28"
        } rounded-full`}
      >
        <span className={type === "nav" ? "" : "text-4xl"}>
          {fullName
            .split(" ")
            .reduce((acc, name) => acc + name.at(0).toUpperCase(), "")}
        </span>
      </div>
    </div>
  );
}

export default DefaultProfilePic;
