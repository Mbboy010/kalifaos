import { Link, useNavigate } from 'react-router-dom';
import { Frown, Home, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import type { RootState } from '../../components/redux/store';
import { useSelector } from 'react-redux';


export default function NotCon() {
  const navigate = useNavigate();

  const isColor = useSelector((state: RootState) => state.color.value);

  return (
    <div className="min-h-screen flex flex-col items-center  p-6">
      {/* 404 text with animated zero */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-9xl font-bold relative">
          4
          <span className="inline-block text-blue-600 animate-bounce">
            0
          </span>
          4
        </h1>
      </div>

      {/* Message section */}
      <div className="text-center max-w-md mb-10 animate-fade-in animation-delay-100">
        <div className="flex justify-center mb-4">
          <Frown className="w-12 h-12 text-yellow-500 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Oops! Page Not Found</h2>
        <p className=" mb-6">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-200">
        <button
          onClick={() => navigate(-1)}
          style={{backgroundColor: isColor ? "#d7d7d719" : "#72727236"}} 
          className="flex items-center justify-center gap-2 px-6 py-3  border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>
        <Link
          to="/"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          Return Home
        </Link>
      </div>

      {/* Additional help */}
      <div className="mt-12 text-center text-sm animate-fade-in animation-delay-300">
        <p>Need help? <Link to="/contact" className="text-blue-600 hover:underline">Contact support</Link></p>
      </div>

      {/* Add these to your global CSS or Tailwind config */}
      <style >{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}