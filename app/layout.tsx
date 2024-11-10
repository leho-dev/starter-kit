import { ReactNode } from "react";
import "@/app/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Starter Kit",
    default: "Starter Kit"
  },
  description: "Starter Kit"
};

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
  return children;
}
