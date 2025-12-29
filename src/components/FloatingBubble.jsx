// src/components/FloatingBubble.jsx
import { useState, useEffect } from 'react';

export default function FloatingBubble() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering on server
  if (!mounted) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {/* Skeleton/placeholder for SSR */}
        <div className="w-14 h-14 bg-cyan-500 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main bubble button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-cyan-500 hover:bg-cyan-400 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-300"
        aria-label="Open menu"
        type="button"
      >
        <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm4.78 7.37l-1.95 9.19c-.14.64-.52.8-.86.48l-2.97-2.19-1.52 1.46c-.17.17-.31.31-.63.31l.22-3.08 5.78-5.23c.25-.22-.06-.35-.37-.13l-7.14 4.5-2.75-.86c-.6-.19-.61-.6.13-.89l11.43-4.16c.48-.18 1.05.11.92.8z"/>
        </svg>
      </button>

      {/* Slide-up panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          
          {/* Panel */}
          <div
            className="absolute bottom-20 right-0 w-72 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-800 z-50"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Subscription options"
          >
            <h3 className="text-xl font-bold mb-5 text-center text-black dark:text-white">
              Get Daily Alpha
            </h3>

            <div className="space-y-4">
              {/* Telegram */}
              <a
                href="https://t.me/txchyon"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-xl font-bold text-lg transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  // Optional: Close panel when link is clicked
                  // setOpen(false);
                }}
              >
                Join Txchyon Defi TG
              </a>

              {/* Beehiiv Newsletter */}
              <a
                href="https://txchyon.beehiiv.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black text-center py-4 rounded-xl font-bold text-lg transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                Get Txchyon Defi 
              </a>
            </div>

            {/* Close button */}
            <button 
              onClick={() => setOpen(false)} 
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
              aria-label="Close menu"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}