interface Props {
  current: number;
  total: number;
}

export default function TestProgress({ current, total }: Props) {
  const percentage = ((current) / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">진행률</span>
        <span className="text-sm text-purple-400 font-medium">
          {current} / {total}
        </span>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full progress-fill rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
