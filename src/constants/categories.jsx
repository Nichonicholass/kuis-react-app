import { 
  Brain, 
  Monitor, 
  Trophy, 
  ScrollText, 
  Palette, 
  Clapperboard, 
} from 'lucide-react';

export const CATEGORIES = [
  { 
    id: 9, 
    name: 'General Knowledge', 
    icon: <Brain size={32} />, 
    color: 'bg-blue-100 text-blue-600' 
  },
  { 
    id: 18, 
    name: 'Computers', 
    icon: <Monitor size={32} />, 
    color: 'bg-purple-100 text-purple-600' 
  },
  { 
    id: 21, 
    name: 'Sports', 
    icon: <Trophy size={32} />, 
    color: 'bg-green-100 text-green-600' 
  },
  { 
    id: 23, 
    name: 'History', 
    icon: <ScrollText size={32} />, 
    color: 'bg-yellow-100 text-yellow-600' 
  },
  { 
    id: 25, 
    name: 'Art', 
    icon: <Palette size={32} />, 
    color: 'bg-pink-100 text-pink-600' 
  },
  { 
    id: 11, 
    name: 'Film', 
    icon: <Clapperboard size={32} />, 
    color: 'bg-red-100 text-red-600' 
  },
];