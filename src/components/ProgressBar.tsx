interface ProgressBarProps {
    target: number;
    collected: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ target, collected }) => {
    const progress = Math.min((collected / target) * 100, 100);

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
