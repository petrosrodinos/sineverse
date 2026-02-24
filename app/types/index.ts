import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface DashboardSidebarItem {
  label: string;
  name: string;
  href: string;
  icon: string;
}
