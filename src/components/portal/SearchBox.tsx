import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SearchBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative flex items-center">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Abrir busca"
        >
          <Search size={18} />
        </button>
      ) : (
        <div className={cn(
          'flex items-center gap-2 bg-background border border-border rounded-full px-3 py-1.5',
          'animate-in slide-in-from-right-4 duration-200'
        )}>
          <Search size={16} className="text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar notícias..."
            className="bg-transparent border-none outline-none text-sm w-40 md:w-56 text-foreground placeholder:text-muted-foreground"
          />
          <button
            onClick={handleClose}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar busca"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
