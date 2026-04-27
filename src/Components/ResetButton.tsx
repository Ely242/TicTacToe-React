type ResetButtonProps = {
	onReset: () => void;
	children: React.ReactNode;
};

export default function ResetButton({ children, onReset, ...rest }: ResetButtonProps) {
	return <button onClick={onReset} className="reset-button" {...rest}>{children}</button>;
}