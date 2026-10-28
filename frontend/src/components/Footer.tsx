const Footer = () => {
  return (
    <footer className="bg-blue-900 text-blue-200 py-6 px-8 border-t border-blue-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="text-center md:text-left">
          <p className="text-white font-semibold tracking-wide">
            Created by Piyush Atrish
          </p>
          <p className="text-sm text-blue-400 mt-1">
            Based on Cohort 3 teachings
          </p>
        </div>

        {/* Right Side: Social Links */}
        <div className="flex items-center gap-6 font-medium">
          <a 
            href="https://github.com/piyush-atrish" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            GitHub
          </a>
          <a 
            href="https://leetcode.com/u/Piyush_Leetcode19/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            LeetCode
          </a>
        </div>

      </div>
    </footer>
  )
}

export default Footer