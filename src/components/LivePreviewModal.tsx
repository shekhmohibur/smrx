import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export const LivePreviewModal = ({
  isOpen,
  onClose,
  url,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8"
      >
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-6xl h-full max-h-[90vh] glass-dark rounded-3xl overflow-hidden flex flex-col"
        >
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-neutral-900">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-sm font-mono text-neutral-400 truncate max-w-50 md:max-w-none">
                {title} — Live Preview
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 bg-white">
            <iframe
              src={url}
              className="w-full h-full border-none"
              title={title}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
