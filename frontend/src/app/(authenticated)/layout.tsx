import { type ComponentChildren } from "preact";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button"; // the simple Button
import { Home, LogOut } from "lucide-preact";
import logoImage from "../../assets/LOGO.png"
type AppLayoutProps = {
  children: ComponentChildren;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-[#eef0f2]">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 border-[#d4d7de]">
        <Link to="/" className="flex items-center gap-3">
          {/* <Logo className="h-8 w-8 text-[#4051b5]" /> */}
          <img className={"h-12 text-[#4051b5]"} src={logoImage} alt="" />
          {/* <span className="max-md:hidden md:text-xl font-bold">Vistor Management System</span> */}
        </Link>
        <div className="flex items-center gap-2 ">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <Home className="h-5 w-5 " />
            <span className="sr-only">Dashboard</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate("/login")}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
    </div>
  );
}
