import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  MessageSquare, 
  Share2, 
  Settings,
  Fingerprint,
  MoreVertical
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const isSetupMode = location.pathname === '/onboarding';

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Create Twin', path: '/onboarding', icon: BrainCircuit },
    { name: 'Chat', path: '/chat', icon: MessageSquare },
    { name: 'Share', path: '/share', icon: Share2 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-surface-container-lowest/80 backdrop-blur-xl z-50 flex flex-col justify-between p-space-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-space-lg">
        <div className="flex items-center gap-space-sm px-space-xs pt-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BrainCircuit className="text-on-primary w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">Twin</span>
              <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-tertiary font-label-sm text-label-sm tracking-wider uppercase font-semibold">PRO</span>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-1 mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-space-sm px-space-md py-space-sm rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-surface-container-high text-primary font-medium' 
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="font-label-lg text-label-lg">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {!isSetupMode && (
        <div className="flex flex-col gap-space-md pt-space-md pb-4">
          <div className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-lg bg-surface-container-low">
            <div className="relative flex items-center justify-center w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-tertiary"></span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Model Synced • Latency 14ms</span>
          </div>
          <div className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low">
            <div className="flex items-center gap-space-sm">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden">
                <Fingerprint className="text-primary w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface font-medium leading-none">Persona</span>
                <span className="font-label-sm text-label-sm text-tertiary mt-0.5">Active</span>
              </div>
            </div>
            <MoreVertical className="text-outline w-4 h-4" />
          </div>
        </div>
      )}
    </aside>
  );
}
