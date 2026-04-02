import React from "react";
import { LucideIcon } from "lucide-react";

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  footer?: string;
}

export interface PlaceholderProps {
  label: string;
  icon: LucideIcon;
  aspectRatio?: string;
}
