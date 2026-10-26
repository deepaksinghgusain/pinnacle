import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Mail, Share2 } from "lucide-react"
import GeneralComponent from './general'
import EmailComponent from './email'
import SocialComponent from './social'
import { getSettings } from "@/lib/actions/settings-action"

const tabMeta = {
  general: {
    title: "General",
    description: "Company identity, contact details, and public metadata.",
    icon: Building2,
  },
  email: {
    title: "Email",
    description: "SMTP and sender identity for outbound messages.",
    icon: Mail,
  },
  social: {
    title: "Social Media",
    description: "Official profiles and sharing links for the brand.",
    icon: Share2,
  },
} as const

export default async function ConfigurationPage() {

  const setting = await getSettings()

  return (
    <Card className="border-slate-200/80 bg-white shadow-sm">
      <CardHeader className="border-b border-slate-200/70">
        <h1 className="text-2xl font-bold text-slate-950">Configuration</h1>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <Tabs defaultValue="general" className="gap-4">
          <TabsList variant="line" className="flex w-full flex-wrap gap-4 border-b border-slate-200 pb-0">
            {Object.entries(tabMeta).map(([value, meta]) => {
              const Icon = meta.icon
              return (
                <TabsTrigger key={value} value={value} className="rounded-none px-0 py-2">
                  <span className="flex items-center gap-2">
                    <Icon className="size-4" />
                    {meta.title}
                  </span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          <div className="pt-4">
            <TabsContent value="general">
              <GeneralComponent setting={setting} />
            </TabsContent>
            <TabsContent value="email">
              <EmailComponent  setting={setting} />
            </TabsContent>
            <TabsContent value="social">
              <SocialComponent setting={setting} />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
