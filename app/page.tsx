'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-indigo-600 to-teal-500 flex items-center justify-center p-6">
      <div className="text-center text-white max-w-2xl">
        <h1 className="text-6xl md:text-7xl font-bold mb-6">StudyFlowAI</h1>
        <p className="text-3xl mb-8">AI Co-Pilot for Teachers & Students</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold mb-3">👩‍🏫 Teachers</h2>
            <p className="text-lg opacity-90">Smart grading, scheduling, analytics &amp; behavioral insights</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold mb-3">👨‍🎓 Students</h2>
            <p className="text-lg opacity-90">Assignment tracker, AI study buddy &amp; personalized learning</p>
          </div>
        </div>

        <p className="mt-16 text-lg opacity-75">Modern • Fun • Powerful</p>
      </div>
    </div>
  );
}
