import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router";
import { Home, User, Mail, Mic, Briefcase, BotMessageSquare, LogIn, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton, useUser, SignInButton } from '@clerk/clerk-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

function Header() {
  const { pathname } = useLocation(); // Gets current URL path (/home, /about etc.)
const navigate = useNavigate(); // Helps move between pages
const { isSignedIn } = useUser(); // Checks if user is logged in
const [sheetOpen, setSheetOpen] = useState(false); // Controls mobile menu open/close

  const routes = [
    { path: "/", name: "Home", icon: Home },
    { path: "/interview", name: "Interview", icon: Mic },
    { path: "/apply", name: "Apply", icon: Briefcase },
    { path: "/about", name: "About", icon: User },
    { path: "/contact", name: "Contact", icon: Mail }
  ];

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate("/");
    setSheetOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-lg border-b border-purple-900/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo - Always on left */}
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="flex items-center gap-2 ml-2 md:ml-0"
        >
          <div className={cn(
            "p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900",
            "ring-2 ring-purple-500/30 ring-offset-2 ring-offset-gray-950"
          )}>
            <BotMessageSquare className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-100 bg-clip-text text-transparent">
            PreHire
          </span>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center gap-1 mx-4">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                pathname === route.path 
                  ? "bg-purple-500/10 text-purple-300 border border-purple-500/20 shadow-lg shadow-purple-500/10"
                  : "text-gray-400 hover:text-purple-200 hover:bg-purple-900/30"
              )}
            >
              <route.icon className="h-4 w-4" />
              <span>{route.name}</span>
            </Link>
          ))}
        </nav>

        {/* Right-side elements (mobile menu + desktop auth) */}
        <div className="flex items-center gap-4">
          {/* Mobile Sheet Trigger - Now on the right */}
          <div className="md:hidden">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger className="p-2 rounded-lg hover:bg-purple-900/30">
                <Menu className="h-5 w-5 text-gray-300" />
              </SheetTrigger>
              <SheetContent side="right" className="bg-gray-950 border-l border-purple-900/50">
                <div className="flex flex-col h-full pt-6">
                  {/* Logo in Sheet */}
                  <Link 
                    to="/" 
                    onClick={handleLogoClick}
                    className="flex items-center gap-2 mb-8 px-4"
                  >
                    <div className={cn(
                      "p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900",
                      "ring-2 ring-purple-500/30 ring-offset-2 ring-offset-gray-950"
                    )}>
                      <BotMessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-100 bg-clip-text text-transparent">
                      PreHire
                    </span>
                  </Link>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-1 flex-grow">
                    {routes.map((route) => (
                      <SheetClose asChild key={route.path}>
                        <Link
                          to={route.path}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all",
                            pathname === route.path 
                              ? "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                              : "text-gray-400 hover:text-purple-200 hover:bg-purple-900/30"
                          )}
                        >
                          <route.icon className="h-5 w-5" />
                          <span>{route.name}</span>
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  {/* Mobile Auth Button */}
                  <div className="mt-auto p-4">
                    {isSignedIn ? (
                      <div className="flex justify-center">
                        <UserButton afterSignOutUrl="/" />
                      </div>
                    ) : (
                      <SignInButton mode="modal">
                        <button className={cn(
                          "w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg",
                          "text-base font-medium bg-purple-600 hover:bg-purple-700 transition-colors",
                          "text-white"
                        )}>
                          <LogIn className="h-5 w-5" />
                          <span>Sign In</span>
                        </button>
                      </SignInButton>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Auth - Hidden on mobile */}
          <div className="hidden md:flex justify-end min-w-[40px]">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link to="/signin" mode="modal">
                <button className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md",
                  "text-sm font-medium bg-purple-600 hover:bg-purple-700 transition-colors",
                  "text-white"
                )}>
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;