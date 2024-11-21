interface ProgressBarPercentProps {
  progress: number;
}

export default function ProgressBarPercent({
  progress,
}: ProgressBarPercentProps) {
  console.log(progress);

  return (
    <div
      className={`w-[150px] flex items-center rounded-full h-2 bg-red-300 shadow-md`}
    >
      <span
        className="h-2 bg-green-600 rounded-full"
        style={{ width: `${progress}%` }}
      ></span>
    </div>
  );
}
