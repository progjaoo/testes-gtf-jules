import React from 'react';
import { useEditorial } from '@/contexts/EditorialContext';
import { EditorialDTO } from '@/services/editorial/editorial.service';

export function CategoryNav() {
  const { editorials, setEditorial } = useEditorial();

  return (
    <nav className="bg-card border-b border-border">
      <div className="container flex gap-4 py-3 overflow-x-auto">
        {editorials.map((editorial: EditorialDTO) => (
          <button
            key={editorial.id}
            onClick={() => setEditorial(editorial.id)}
            className="flex items-center gap-2 opacity-80 hover:opacity-100"
          >
            <span
              className="w-2 h-2 rounded-sm"
              style={{ backgroundColor: editorial.tema?.corPrimaria }}
            />
            <span>{editorial.nome}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

