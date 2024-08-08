import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname } from "next/navigation";

const SidebarLeft = ({ ...props }) => {
  const path = usePathname();

  return (
    <Tabs defaultValue={path[2]} className="w-fit">
      <TabsList className="grid grid-cols-1">
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="reel">Reel</TabsTrigger>
        <TabsTrigger value="explore">Explore</TabsTrigger>
      </TabsList>
      <TabsContent value="home">Make changes to your account here.</TabsContent>
      <TabsContent value="reel">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default SidebarLeft;
