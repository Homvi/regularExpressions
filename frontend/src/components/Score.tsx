const Score = ({ score, resetGame }) => {
  return (
    <div className="bg-black/25 absolute left-0 right-0 bottom-0 top-0 flex justify-center items-center">
      <div className="bg-white/90 min-h-[300px] min-w-[300px] rounded-xl">
        <div onClick={resetGame} className="p-3 cursor-pointer">
          X
        </div>
        <div className="flex h-full justify-center items-center flex-col gap-6">
          <h1>Your score is: {(score / 10) * 100}%</h1>
          <button onClick={resetGame} className="btn btn-primary">
            Play again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Score;
