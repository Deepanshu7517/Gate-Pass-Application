import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../../../components/ui/card";
import { Users, ArrowRightLeft, Bell, BarChart, Settings } from "lucide-preact";
import { Link } from "react-router-dom";
import AppLayout from "../layout";
import { useEffect } from "preact/hooks";
import { fetchVisitors } from "../../../server-connection/fetchVisitors";

const features = [
  {
    title: "Visitor List",
    description: "View and manage all visitors",
    icon: Users,
    href: "/visitor-list",
  },
  {
    title: "Visitor Entry/Exit",
    description: "Check in or check out visitors",
    icon: ArrowRightLeft,
    href: "/visitor-entry-exit",
  },
  {
    title: "Requests",
    description: "Manage gate passes & pending visitors",
    icon: Bell,
    href: "/requests",
  },
  {
    title: "Reports",
    description: "Generate and view visitor reports",
    icon: BarChart,
    href: "/reports",
  },
  {
    title: "Settings",
    description: "Configure application settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function DashboardPage() {
  useEffect(() => {
    const loadVisitors = async () => {
      const visitors = await fetchVisitors();
      console.log("Visitors from backend:", visitors);
    };
    loadVisitors();
  }, []);
  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="mb-8 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            Visitor Management System
          </h1>
          <p className="text-[#8d7c8b]">
            Welcome! Select an option to get started.
          </p>
        </header>
        <div className="grid gap-4 md:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {features.map((feature, index) => (
            <Link to={feature.href} key={index}>
              <Card className="shadow-lg transition-transform hover:scale-105 flex flex-col justify-center items-center aspect-square text-center cursor-pointer p-4 duration-300">
                <feature.icon className="h-10 w-10 md:h-12 md:w-12 mb-3 text-[#4051b5]" />
                <CardHeader className="p-0">
                  <CardTitle className="text-base sm:text-lg font-medium">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-1 hidden sm:block">
                  <CardDescription className="text-xs sm:text-sm text-[#8d7c8b]">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
