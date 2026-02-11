function Button({ children, onClick, variant = 'primary', className = '', disabled = false }) {
  
  const baseStyle = "px-6 py-2 rounded-xl font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm";

  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary-hover text-white hover:shadow-orange-500/30 hover:shadow-lg border border-transparent",
    secondary: "bg-secondary text-white hover:bg-secondary-hover hover:shadow-lg",
    outline: "bg-white dark:bg-transparent border-2 border-primary text-primary hover:bg-primary-light dark:hover:bg-gray-800",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;