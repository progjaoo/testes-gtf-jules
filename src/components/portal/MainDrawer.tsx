import React, { useState } from 'react';
import { Menu, ChevronDown, ChevronRight, X, Newspaper, Users, Settings, Home, Bookmark, Clock, Star } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

// Menu items - serão alimentados via API
const menuItems: MenuItem[] = [
  { id: 'home', label: 'Início', icon: <Home size={18} /> },
  { 
    id: 'editorias', 
    label: 'Editorias', 
    icon: <Newspaper size={18} />,
    children: [
      { id: 'nacional', label: 'Nacional' },
      { id: 'esportes', label: 'Esportes' },
      { id: 'negocios', label: 'Negócios' },
      { id: 'inovacao', label: 'Inovação' },
      { id: 'cultura', label: 'Cultura' },
      { id: 'servicos', label: 'Serviços' },
    ]
  },
  { id: 'ultimas', label: 'Últimas Notícias', icon: <Clock size={18} /> },
  { id: 'destaques', label: 'Destaques', icon: <Star size={18} /> },
  { id: 'salvos', label: 'Salvos', icon: <Bookmark size={18} /> },
  { 
    id: 'programas', 
    label: 'Programas', 
    icon: <Users size={18} />,
    children: [
      { id: 'programa1', label: 'Programa Manhã' },
      { id: 'programa2', label: 'Jornal da Tarde' },
      { id: 'programa3', label: 'Esporte Total' },
    ]
  },
  { id: 'configuracoes', label: 'Configurações', icon: <Settings size={18} /> },
];

function MenuItemComponent({ item, level = 0 }: { item: MenuItem; level?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div>
      <button
        onClick={() => hasChildren ? setIsOpen(!isOpen) : null}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3 text-left',
          'hover:bg-muted/50 transition-colors',
          level > 0 && 'pl-10 text-sm'
        )}
      >
        <div className="flex items-center gap-3">
          {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
          <span className="font-medium text-foreground">{item.label}</span>
        </div>
        {hasChildren && (
          <span className="text-muted-foreground">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
      </button>
      {hasChildren && isOpen && (
        <div className="bg-muted/30">
          {item.children!.map((child) => (
            <MenuItemComponent key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function MainDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Abrir menu"
        >
          <Menu size={20} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 bg-card">
        <SheetHeader className="p-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-left">
            <span className="text-sm text-muted-foreground">89.7</span>
            <span className="text-sm font-bold text-foreground">GTF</span>
            <span className="text-sm font-bold text-primary">NEWS</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="py-2">
          {menuItems.map((item) => (
            <MenuItemComponent key={item.id} item={item} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
