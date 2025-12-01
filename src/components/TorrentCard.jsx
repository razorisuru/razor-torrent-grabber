import React from 'react';
import { Copy, Download, HardDrive, Calendar, File } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const TorrentCard = ({ torrent }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(torrent.link);
    toast.success('Magnet link copied to clipboard!');
  };

  const handleOpenMagnet = () => {
    window.location.href = torrent.link;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/80 transition duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors">
          {torrent.title}
        </h3>
        
        <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-6">
          <div className="flex items-center gap-1.5">
            <HardDrive className="w-4 h-4 text-cyan-500" />
            <span>{torrent.size}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>{new Date(torrent.pubDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <File className="w-4 h-4 text-emerald-500" />
            <span>{torrent.category}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-700/50 hover:bg-slate-700 text-white py-2.5 rounded-xl font-medium transition duration-300 border border-slate-600/50 hover:border-slate-500"
          >
            <Copy className="w-4 h-4" />
            Copy Link
          </button>
          <button
            onClick={handleOpenMagnet}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02] transition duration-300"
          >
            <Download className="w-4 h-4" />
            Open
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TorrentCard;
