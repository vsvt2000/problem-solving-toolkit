import React from 'react';
import Link from 'next/link';

const ToolkitHomepage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      {/* Navigation Header */}
      <nav className="border-b border-gray-100 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">AI</div>
          <span className="font-bold tracking-tight text-lg">Problem-Solving Toolkit</span>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-500">
          <Link href="/instructions" target='blank' className="hover:text-blue-600 transition-colors">Documentation</Link>
          <Link href="https://github.com/vsvt2000/problem-solving-toolkit"  target='blank' className="hover:text-blue-600 transition-colors">Github</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 pt-16 md:pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-500">
          Solve Organizational Problems <br /> with Forensic AI Strategy.
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Move beyond vague aspirations. Our 5-phase system helps companies identify root causes, 
          map digital footprints, and deploy AI solutions with ethical and financial governance.
        </p>

        {/* Primary Call to Actions */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-20">
          <Link href="/form" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xl shadow-blue-200 transition-all transform hover:-translate-y-1">
            Start Diagnostic Flow
          </Link>
          <Link href="/instructions" className="px-8 py-4 bg-white border border-gray-200 hover:border-gray-400 text-gray-700 font-bold rounded-xl transition-all">
            How to Use This Tool
          </Link>
        </div>

        {/* Feature Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-gray-100 pt-16">
          <div className="space-y-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">1</div>
            <h3 className="font-bold text-gray-900">Diagnostic Readiness</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Complete a 40-question survey to measure AI maturity, stakeholder readiness, and organizational context before investing.
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">2</div>
            <h3 className="font-bold text-gray-900">Forensic Mapping</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Expose Delusion Gaps using SIPOC 4.0 and Digital Shadow Mapping to ensure your AI is trained on reality, not management theory. 
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">3</div>
            <h3 className="font-bold text-gray-900">Governance & ROI</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Secure your deployment with Socratic ethics audits and real-time ROI tracking to ensure permanent institutional improvement. 
            </p>
          </div>
        </div>
      </main>

      {/* Corporate Summary Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto border border-gray-200 bg-white rounded-3xl p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">How This Tool Helps Your Company</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">For Leadership</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">✓</span> 
                  Reduces project failure by identifying Barrier Points in adoption early. 
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">✓</span> 
                  Provides a defensible financial case for CFO approval via Value Case Drafts. 
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest">For Operations</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">✓</span> 
                  Eliminates waste by targeting AI at steps with the highest Wait Times. 
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">✓</span> 
                  Stabilizes technical pipelines with automated data health monitoring. 
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          AI Problem-Solving Toolkit — Forensic Diagnostic 1.0
        </p>
      </footer>
    </div>
  );
};

export default ToolkitHomepage;