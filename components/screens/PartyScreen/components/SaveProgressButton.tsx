export const SaveProgressButton = () => {
  const handleSaveProgress = () => {
    // Implement the logic to save the player's progress here
    console.log("Button clicked: Saving progress...");
  };

  return (
    <div className="mt-4 w-full flex justify-end">
      <button
        className="
        px-4 py-2
        text-sm font-semibold text-white
        border-2 border-white
        rounded-lg
        transition-all duration-200
        hover:bg-white/10
        hover:cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-white/50
        disabled:opacity-50
        disabled:cursor-not-allowed
        "
        onClick={handleSaveProgress}
        disabled={true}
      >
        Save Progress
      </button>
    </div>
  );
};
