import { Link } from "react-router-dom";
import Header from "../components/Header";
import pic1 from "../assets/images/1.png";
import pic2 from "../assets/images/2.png";
import pic3 from "../assets/images/3.jpg";

function Home() {
  return (
    <>
      <Header />
      <div className="mt-8 flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <img src={pic1} alt="Online Exam" className="w-50 h-40 object-cover" />
          <span className="mt-4 text-lg font-medium text-gray-700">Online Exam</span>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            <Link
              to="/StudentLogin"
              className="flex flex-col items-center hover:scale-105 transform transition duration-300"
            >
              <img src={pic2} alt="Student" className="w-40 h-40 object-cover rounded-lg shadow-md" />
              <span className="mt-2 text-lg font-semibold text-gray-800">Student</span>
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <Link
              to="/admin-sign-in"
              className="flex flex-col items-center hover:scale-105 transform transition duration-300"
            >
              <img src={pic3} alt="Admin" className="w-40 h-40 object-cover rounded-lg shadow-md" />
              <span className="mt-2 text-lg font-semibold text-gray-800">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
