import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Map, 
  AlertTriangle, 
  ShoppingBag, 
  BarChart3, 
  Database,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { analysisData } from "@/data/analysisData";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { 
      icon: LayoutDashboard, 
      label: "Overview", 
      href: "/" 
    },
    ...analysisData.map((item, index) => ({
      icon: index === 0 ? ShoppingBag : 
            index === 1 ? Map : 
            index === 2 ? BarChart3 : 
            index === 3 ? AlertTriangle : Database,
      label: item.title,
      href: `/analysis/${item.id}`
    }))
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <img 
            src="/images/meliuz-logo.svg" 
            alt="Méliuz" 
            className="h-8 w-auto"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-4">
          <nav className="space-y-2 py-4">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer group",
                      isActive 
                        ? "bg-primary/10 text-primary shadow-sm" 
                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon 
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                      )} 
                    />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="p-6 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-sidebar-accent/50">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
              DV
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground">Danilo Vargas</span>
              <span className="text-[10px] text-muted-foreground">Data Analyst</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <div className="lg:hidden p-4 flex items-center justify-between border-b bg-background/80 backdrop-blur-md sticky top-0 z-30">
          <img src="/images/meliuz-logo.svg" alt="Méliuz" className="h-6 w-auto" />
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 lg:p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
