interface ProgressBarPercentProps {
  progress: number;
}

// export default function ProgressBarPercent({
//   progress,
// }: ProgressBarPercentProps) {
//   console.log(progress);

//   return (
//     <div
//       className={`w-[150px] flex items-center rounded-full bg-red-300 shadow-md`}
//     >
//       <span
//         className="h-2 bg-green-600 rounded-full"
//         style={{ width: `${progress}%` }}
//       >
//         <span className="text-xs text-white text-center font-bold absolute">
//           {progress}%
//         </span>
//       </span>
//     </div>
//   );
// }


export default function ProgressBarPercent({
  progress,
}: ProgressBarPercentProps) {
  return (
    <div className="w-[150px] flex items-center rounded-full h-2 bg-gray-200 shadow-md">
      <span
        className="h-2 bg-green-600 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></span>
      <span className="ml-2 text-xs text-gray-600">{progress}%</span>
    </div>
  );
}