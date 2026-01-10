export interface Tool {
  id: string;
  title: string;
  display_name: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  route: string;
  tags?: string[];
  category?: string;
}

export interface ToolCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  tools: Tool[];
}

