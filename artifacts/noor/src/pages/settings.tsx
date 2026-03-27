import { useI18n } from "@/lib/i18n";
import { useGetPreferences, useUpdatePreferences } from "@workspace/api-client-react";
import { Globe, Moon, Bell } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const { language, setLanguage, t } = useI18n();
  const updatePrefs = useUpdatePreferences();

  const handleLangChange = (val: any) => {
    setLanguage(val);
    updatePrefs.mutate({ data: { language: val } });
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-4xl font-bold text-foreground mb-8">{t("settings")}</h1>

      <div className="space-y-6">
        <div className="glass-card p-6 rounded-3xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Language</h3>
              <p className="text-muted-foreground text-sm">Choose your preferred language</p>
            </div>
          </div>
          <Select value={language} onValueChange={handleLangChange}>
            <SelectTrigger className="w-40 bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ar">العربية (Arabic)</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="glass-card p-6 rounded-3xl flex items-center justify-between opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Moon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Theme</h3>
              <p className="text-muted-foreground text-sm">Currently locked to Dark Mode for premium feel</p>
            </div>
          </div>
          <Button disabled variant="outline">Dark</Button>
        </div>

        <div className="glass-card p-6 rounded-3xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Notifications</h3>
              <p className="text-muted-foreground text-sm">Prayer time alerts and reminders</p>
            </div>
          </div>
          <Button className="bg-primary text-primary-foreground px-6 py-2 rounded-xl">Enable</Button>
        </div>
      </div>
    </div>
  );
}
