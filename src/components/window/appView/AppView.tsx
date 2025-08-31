"use client";

import Comments from "./Comments";
import Link from "next/link";
import { useEffect, useState } from "react";
import Suggestions from "./Suggestions";
import {
  Download,
  Tag,
  HardDrive,
  Monitor,
  Cpu,
  Calendar,
  Shield,
  Star,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const tool = {
  id: "1",
  title: "Windows Password Reset",
  description: `
### Overview
This tool helps you reset your Windows password with a clean UI and step-by-step instructions.

[red]Warning:[/red] Use responsibly on your own system!  
[green]Tip:[/green] Verified to work on most Windows editions.  
[blue]Support:[/blue] Offline mode supported.  

### Features
- Fast recovery in under 5 minutes  
- Works on both [blue]UEFI[/blue] and [blue]Legacy BIOS[/blue]  
- Safe and secure with no data loss  

### Usage
1. Download the ISO  
2. Burn to USB / DVD  
3. Boot your PC and follow on-screen steps  
  `,
  image: "/images (1).jpeg",
  downloadLink: "#",

  price: "Free",
  size: "120 MB",
  os: "Windows 7/8/10/11",
  architecture: "32-bit / 64-bit",
  date: "Aug 25, 2025",
  downloads: "15K+",
  rating: "4.6/5",
  security: "Verified",

  screenshots: [
    "https://images.unsplash.com/photo-1566241477600-ac026ad43874?q=80&w=400",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400",
    "https://images.unsplash.com/photo-1551782450-17144efb9c50?q=80&w=400",
  ],
};

function formatDescription(text: string) {
  let formatted = text.replace(/\r\n/g, "\n");

  formatted = formatted
    .replace(/\[red\](.*?)\[\/red\]/g, '<span class="text-red-500 font-bold">$1</span>')
    .replace(/\[green\](.*?)\[\/green\]/g, '<span class="text-green-500 font-bold">$1</span>')
    .replace(/\[blue\](.*?)\[\/blue\]/g, '<span class="text-blue-500 font-bold">$1</span>');

  formatted = formatted.replace(
    /\[img\](.*?)\[\/img\]/g,
    '<img src="$1" alt="tool image" class="rounded-lg shadow-md my-2" />'
  );

  return formatted;
}

export default function ToolDetails() {
  const [fullscreen, setFullscreen] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

  // disable/enable scroll on fullscreen open
  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setAnimate(true), 10); // trigger zoom-in
    } else {
      document.body.style.overflow = "";
      setAnimate(false);
    }
  }, [fullscreen]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Tool Header */}
      <div className="flex mt-16 flex-col gap-6 my-6">
        <div className="flex h-full flex-row items-center gap-4">
          <img
            src={tool.image}
            alt={tool.title}
            width={100}
            height={100}
            className="rounded-xl shadow-md"
          />
          <div className="flex flex-col h-full gap-2 text-[1rem]">
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-indigo-500" /> Downloads:{" "}
              {tool.downloads}
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-4 text-yellow-500" /> Rating: {tool.rating}
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" /> Security:{" "}
              {tool.security}
            </div>
          </div>
        </div>

        {/* Tool Info */}
        <div>
          <p className="text-3xl text-blue-500 font-bold mb-3">{tool.title}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm ">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-500" /> Price: {tool.price}
            </div>
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-green-500" /> Size: {tool.size}
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-purple-500" /> System: {tool.os}
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-orange-500" /> Arch:{" "}
              {tool.architecture}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-red-500" /> Date: {tool.date}
            </div>
          </div>
        </div>
      </div>

      {/* Screenshots */}
      <div className="mb-6">
        <p className="text-xl font-semibold mb-3">Screenshots</p>
        <div className="flex gap-4 overflow-x-auto pb-3">
          {tool.screenshots.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt="screenshot"
              className="h-36 rounded-lg shadow-md cursor-pointer hover:scale-105 transition"
              onClick={() => setFullscreen(src)}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Modal with zoom animation */}
      {fullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 transition-all duration-300">
          <button
            onClick={() => setFullscreen(null)}
            className="absolute top-4 right-4 text-white"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={fullscreen}
            alt="fullscreen"
            className={`max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg transform transition-all duration-300 ${
              animate ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          />
        </div>
      )}

      {/* Description */}
      <div className="py-5 rounded-xl mb-6">
        <div className="space-y-4">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <p className="text-2xl font-bold mt-6 mb-3">{children}</p>
              ),
              h2: ({ children }) => (
                <p className="text-xl font-semibold mt-5 mb-2">{children}</p>
              ),
              h3: ({ children }) => (
                <p className="text-lg font-semibold mt-4 mb-2">{children}</p>
              ),
              p: ({ children }) => (
                <p className="leading-relaxed">{children}</p>
              ),
            }}
          >
            {formatDescription(tool.description)}
          </ReactMarkdown>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 my-6">
        <Link
          href={tool.downloadLink}
          className="inline-flex w-fit items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          <Download className="w-4 h-4" />
          Download
        </Link>
      </div>

      <Suggestions currentToolId={tool.id} />
      <Comments />
    </div>
  );
}