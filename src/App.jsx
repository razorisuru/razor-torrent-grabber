import React from 'react';
import SearchBar from './components/SearchBar';
import TorrentCard from './components/TorrentCard';
import { useTorrentSearch } from './hooks/useTorrentSearch';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';
import { Toaster } from 'sonner';

function App() {
  const { results, loading, error, searchTorrents } = useTorrentSearch();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-cyan-500/30">
      <Toaster position="top-center" theme="dark" richColors />
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[128px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="p-1 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg shadow-cyan-500/20">
              {/* <Database className="w-8 h-8 text-white" /> */}
              <img className="w-8 h-8" src="favicon.png" alt="" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
              RaZoR Torrent Grabber
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Search and discover torrents instantly with a premium experience.
          </motion.p>
        </div>

        {/* Search Section */}
        <SearchBar onSearch={searchTorrents} loading={loading} />

        {/* Results Section */}
        <div className="space-y-6">
          {error && (
            <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              {error}
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-slate-800/30 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((torrent, index) => (
                <TorrentCard key={index} torrent={torrent} />
              ))}
            </div>
          )}

          {!loading && results.length === 0 && !error && (
            <div className="text-center text-slate-500 mt-12">
              <p>Start searching to see results</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-slate-500 text-sm">
          <p>
            Made with <span className="text-red-500">♥</span>{' '}
            <a
              href="https://razorisuru.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              razorisuru.com
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
