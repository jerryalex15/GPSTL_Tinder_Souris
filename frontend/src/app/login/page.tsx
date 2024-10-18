  "use client";
  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";
  import { Input } from "@/components/shadcn/input";
  import { Label } from "@/components/shadcn/label";
  import { Button } from "@/components/shadcn/button";
  import { useRouter } from 'next/navigation';

  export default function Login() {
    let router = useRouter();

    return <div className="flex justify-center items-center min-w-screen min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Se connecter</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">{"Nom d'utilisateur"}</Label>
                <Input id="name" placeholder="Nom d'utilisateur" />
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="pass">{"Mot de passe"}</Label>
                <Input id="pass" type="password" placeholder="Mot de passe" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>Retourner</Button>
          <Button>Se connecter</Button>
        </CardFooter>
      </Card>
    </div>;
  }
