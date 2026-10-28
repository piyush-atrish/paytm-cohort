import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-blue-600 p-4">
      
      <Link to="/" className="text-white text-xl font-bold tracking-wide">
        Pay-tmrw
      </Link>

      <div>
        <Link to="/signin" className="text-white mx-2 hover:text-gray-200">Signin</Link>
        <Link to="/signup" className="text-white mx-2 hover:text-gray-200">Signup</Link>
      </div>
      
    </div>
  )
}

export default Navbar