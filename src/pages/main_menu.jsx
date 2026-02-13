import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function MainMenu() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const lastScore = useSelector((state) => state.auth.lastScore); // Nanti ditambahin di slice

  const handlePlayGame = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 sm:p-12">
        
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
            Welcome, {user?.fullName || 'Player'}! 👋
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Ready to test your knowledge?
          </p>
        </div>

        {/* Last Game Statistics */}
        {lastScore ? (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8 border border-indigo-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Last Game Statistics
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-gray-600 text-sm mb-1">Score</p>
                <p className="text-3xl font-bold text-indigo-600">
                  {lastScore.percentage}%
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-gray-600 text-sm mb-1">Time</p>
                <p className="text-3xl font-bold text-purple-600">
                  {lastScore.minutes} min
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200 text-center">
            <p className="text-gray-500 text-sm">
              No previous game data. Start playing to see your stats!
            </p>
          </div>
        )}

        {/* Play Button */}
        <button
          onClick={handlePlayGame}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          🎮 Start Game
        </button>

        {/* Logout Button */}
        <button
          onClick={() => navigate('/login')}
          className="w-full mt-4 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default MainMenu;