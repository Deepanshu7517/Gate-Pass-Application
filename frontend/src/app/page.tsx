import { Button } from "../components/ui/button";
import logoImage from "../assets/LOGO.png"
import {
  Card,
  CardContent,
  CardHeader,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd have authentication logic here.
    navigate("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#eef0f2] p-4">
      <div className="w-full max-w-md ">
        <Card className="shadow-2xl border-[#d4d7de] bg-white">
          <CardHeader className="items-center text-center">
            <img src={logoImage} className=" h-30 text-primary text-[#4051b5] rounded-lg" alt="" />
            {/* <img src={faviconImage} className="mb-4 h-16 w-16 text-primary text-[#4051b5] rounded-lg" alt="" />
            <Logo className="mb-4 h-16 w-16 text-primary text-[#4051b5]" /> */}
            {/* <CardTitle className=" font-headline text-3xl font-bold text-gray-400">
              Visitor Management
            </CardTitle> */}
            {/* <CardDescription className={"text-[#8d7c8b]"}>
              Employee Sign In for Visitor Management System
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  placeholder="Enter your employee ID"
                  required
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  required
                  type="password"
                />
              </div>
              <Button size="default" variant="default" type="submit" className="w-full ">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
