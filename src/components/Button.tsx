

type ButtonProps = {
    title: string;
    onClick: () => void;
    className?: string;
}

const Button = ({
    title,
    onClick,
    className,
}: ButtonProps) => {
    return (
        <button 
            className={`bg-primary text-white px-8 py-2 shadow rounded-[35px] ${className}`}
            onClick={onClick}
        >
            <span className="text-sm font-medium">{title}</span>
        </button>
    )
}

export default Button;