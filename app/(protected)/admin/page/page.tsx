import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSettings } from "@/lib/actions/settings-action";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import Event from "./Event";

export default async function Page() {
  const setting = await getSettings();

  return (
    <Card className="border-slate-200/80 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-200/70">
        <h1 className="text-2xl font-bold text-slate-950">Pages</h1>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <Tabs defaultValue="home" className="gap-4">
          <TabsList variant="line" className="w-full justify-start">
            <TabsTrigger value="home">Home Page</TabsTrigger>
            <TabsTrigger value="services">Service Page</TabsTrigger>
            <TabsTrigger value="events">Event Page</TabsTrigger>

          </TabsList>

          <div className="pt-4">
            <TabsContent value="home">
              <Home setting={setting} />
            </TabsContent>
            <TabsContent value="about">
              <About />
            </TabsContent>
            <TabsContent value="services">
              <Services setting={setting} />
            </TabsContent>
            <TabsContent value="events">
              <Event setting={setting} />
            </TabsContent>
            <TabsContent value="contact">
              <Contact />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
