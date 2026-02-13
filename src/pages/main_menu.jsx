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
    <div className="min-h-screen bg-zinc-50/50 flex items-center justify-center p-4 selection:bg-zinc-900 selection:text-white">
      <div className="w-full max-w-md bg-white rounded-2xl border border-zinc-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="h-10 w-10 bg-zinc-100 rounded-full flex items-center justify-center mb-4 border border-zinc-200">
            <span className="text-lg">👋</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Welcome back, {user?.fullName || 'Player'}
          </h1>
          <p className="text-zinc-500 mt-2 text-[15px] leading-relaxed">
            Ready to challenge yourself today? Let's verify your knowledge.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-8">
          {lastScore ? (
            <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 transition-all hover:border-zinc-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white border border-zinc-200 text-zinc-900 shadow-sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900">Last Session</h3>
                    <p className="text-xs text-zinc-500">Performance score</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-bold tracking-tight text-zinc-900">
                    {lastScore.percentage}%
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-6 text-center">
              <p className="text-sm text-zinc-500">
                No recent activity. Start a game to see your stats here.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handlePlayGame}
            className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-[15px] rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm ring-1 ring-zinc-900/10"
          >
            <span>Start New Game</span>
            <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            onClick={() => navigate('/login')}
            className="w-full h-11 bg-white hover:bg-zinc-50 text-zinc-600 font-medium text-[15px] rounded-xl border border-zinc-200 transition-colors duration-200 flex items-center justify-center"
          >
            Sign out
          </button>
        </div>

      </div>
    </div>
  );
}

export default MainMenu;