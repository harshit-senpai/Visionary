"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export const Footer = () => {
  return (
    <footer className="max-w-xl gap-5">
      <div className="grid w-full gap-3">
        <Label className="text-muted-foreground">Yor Prompt</Label>
        <div className="relative">
          <Textarea
            placeholder="Describe your image..."
            className="focus-visible:ring-offset-0 transition-colors focus-visible:ring-0 resize-none"
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-5">
            <Button variant="outline" className="transition-colors">
              <Send className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};
