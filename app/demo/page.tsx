import { InteractiveDemo } from "@/components/interactive-demo";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import motion from "framer-motion";


export default function DemoPage() {
  return (
    <div>
      <Navigation isAuthenticated={false} />
      <InteractiveDemo />
      <Footer />
    </div>
  );
}