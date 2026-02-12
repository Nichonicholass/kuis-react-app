function Footer() {
  return (
    <footer className="w-full py-6 mt-auto border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span>
          &copy; 2026 <b>ReactQuiz</b>. All rights reserved.
        </span>
        <span className="flex items-center gap-1">Built with React + Vite</span>
      </div>
    </footer>
  );
}
export default Footer;
