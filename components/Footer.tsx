"use client";

import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";

interface FooterProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  iterativeMode: boolean;
  onIterativeModeChange: (value: boolean) => void;
}

export const Footer = ({
  prompt,
  onPromptChange,
  iterativeMode,
  onIterativeModeChange,
}: FooterProps) => {
  return (
    <footer className="max-w-xl gap-5 relative">
      <div className="absolute -top-2 -right-1 flex items-center gap-2 text-sm">
        consistancy mode
        <Switch checked={iterativeMode} onCheckedChange={onIterativeModeChange} />
      </div>
      <div className="grid w-full gap-3">
        <Label className="text-muted-foreground">Yor Prompt</Label>
        <div className="relative">
          <Textarea
            placeholder="Describe your image..."
            spellCheck={false}
            required
            rows={4}
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            className="focus-visible:ring-offset-0 transition-colors focus-visible:ring-0 resize-none"
          />
        </div>
      </div>
    </footer>
  );
};
