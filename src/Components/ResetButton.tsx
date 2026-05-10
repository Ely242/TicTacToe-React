type ResetButtonProps = {
	onReset: () => void;
	children: React.ReactNode;
};

export default function ResetButton({ children, onReset }: ResetButtonProps) {
	return <button onClick={onReset} className="reset-button">{children}</button>;
}