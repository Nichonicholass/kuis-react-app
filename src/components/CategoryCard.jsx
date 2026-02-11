// src/components/CategoryCard.jsx

function CategoryCard({ category, onClick }) {
  return (
    <button
      onClick={() => onClick(category.id)}
      className="relative group flex flex-col items-center justify-center p-6 h-40 rounded-2xl 
                 bg-white dark:bg-dark-card shadow-sm border-2 border-transparent 
                 hover:border-primary/50 hover:shadow-xl hover:-translate-y-2 
                 transition-all duration-300 w-full overflow-hidden"
    >
      {/* Background Decor (Optional glow) */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${category.color.split(' ')[0]}`} />

      {/* Icon Wrapper */}
      <div className={`
        w-14 h-14 rounded-full flex items-center justify-center text-3xl mb-3 
        shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3
        ${category.color}
      `}>
        {category.icon}
      </div>

      {/* Text */}
      <span className="font-bold text-gray-700 dark:text-gray-200 text-base text-center z-10">
        {category.name}
      </span>
    </button>
  );
}

export default CategoryCard;