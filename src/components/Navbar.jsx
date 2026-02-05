import Button from "./Button";

function Navbar({ toggleTheme, isDark }) {
  return (
    <nav className="w-full p-4 flex justify-between items-center bg-white dark:bg-dark-card shadow-md transition-colors duration-300">
      <h1 className="text-xl font-bold text-primary dark:text-white">
        React<span className="text-secondary">Quiz</span>
      </h1>
      
      <Button 
        onClick={toggleTheme} 
        variant="outline" 
        className="!py-1 !px-3 text-sm flex items-center gap-2"
      >
        {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </Button>
    </nav>
  );
}

export default Navbar;