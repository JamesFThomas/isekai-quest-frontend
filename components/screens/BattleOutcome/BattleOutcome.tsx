export function BattleOutcome() {
  return (
    <div className='flex flex-col items-center justify-center p-8 min-h-screen bg-[url("/background_images/map_hands.png")] bg-cover bg-no-repeat bg-center'>
      <div
        className='battleoutcome-container flex flex-col justify-center items-center gap-4'
        style={{
          flexGrow: 1,
        }}
      >
        <h1 className='text-4xl text-white font-bold mt-3'>
          Battle Outcome Screen
        </h1>
      </div>
    </div>
  );
}
