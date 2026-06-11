export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
      <div className="text-center text-white px-6">
        <h1 className="text-6xl font-bold mb-4">StudyFlowAI</h1>
        <p className="text-2xl mb-8">AI Assistant for Teachers & Students</p>
        <p className="text-lg opacity-90">Deployment successful! 🎉</p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
          <div className="bg-white/10 p-6 rounded-2xl">
            <h3 className="text-xl mb-2">👩‍🏫 Teachers</h3>
            <p>Grading • Planning • Analytics</p>
          </div>
          <div className="bg-white/10 p-6 rounded-2xl">
            <h3 className="text-xl mb-2">👨‍🎓 Students</h3>
            <p>Assignments • Study Coach</p>
          </div>
        </div>
      </div>
    </div>
  );
}
