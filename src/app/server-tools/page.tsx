"use client";

import { useState } from "react";

// Updated data structure with unique IDs for dynamic routing
const pricingData = [
  {
    id: "samsung-frp-lvl5",
    category: "SAMSUNG ANDROID 15/16/17 FRP Work ID Level-5",
    hot: true,
    items: [
      { id: "sam-frp-vip", name: "SAMSUNG FRP ALL MODEL - Work id 24/7 - WW LEVEL 5 (VIP Series) - [ANDROID 15/16/17 INSTANT] - Series S & Z Fold & Flip ✅", delivery: "1-30 Minutes", price: "$80.10" },
      { id: "sam-frp-amf", name: "SAMSUNG FRP ALL MODEL - Work id 24/7 - WW LEVEL 5 - [ANDROID 15/16/17 INSTANT] - [Series A & M & F] ✅", delivery: "1-30 Minutes", price: "$54.10" },
      { id: "sam-frp-imei", name: "SAMSUNG FRP RESET BY IMEI WORLDWIDE LEVEL 5 - ANDROID 15/16/17 (A Series & M & F Cheap Models Supported)", delivery: "1-30 Minutes", price: "$39.00" },
    ],
  },
  {
    id: "remote-unlock",
    category: "REMOTE SERVICE FRP/PIN/DEMO UNLOCK",
    items: [
      { id: "vivo-iqoo-auth", name: "VIVO / IQOO WORLDWIDE AUTH - QLC / MTK / SPD DEVICE SUPPORT - PIN / PATTERN / FRP / DEMO UNLOCK", delivery: "Minutes", price: "$26.50" },
    ],
  },
  {
    id: "samsung-api-premium",
    category: "SAMSUNG FRP REMOVAL PREMIUM DIRECT API SERVICE",
    items: [
      { id: "sam-ww-br-kr", name: "SAMSUNG [Worldwide & Brazil & Korea] FRP Remove By IMEI /Auto Api (Work ID Level -1) ✅ (Android 12-14 Only Supported)", delivery: "1-10 Minutes", price: "$0.00" },
      { id: "sam-ww-vip-api", name: "SAMSUNG FRP WORLDWIDE [Android 12-14] Auto Api Instant Level-VIP ✅ Limited Time Offer", delivery: "1-10 Minutes", price: "$0.00" },
    ],
  },
  {
    id: "sam-usb-remotely",
    category: "Samsung Frp Remotely USB Service",
    items: [
      { id: "sam-usb-server-1", name: "Samsung FRP REMOVE VIA USB Online – All Models (Android 16 Only Supported) Server#1", delivery: "1-15 Minutes", price: "$4.00" },
    ],
  },
  {
    id: "hfz-activator-a5-a6",
    category: "HFZ Activator A5/A6 hello untethered bypass",
    items: [
      { id: "hfz-a5-a6-chip", name: "HFZ bypass A5 chip • iPhone 4S • iPod touch (5th gen) • iPad 2 • iPad mini (1st gen) • iPad (3rd gen) A6 chip • iPhone 5 • iPhone 5c • iPad (4th gen)", delivery: "Minutes", price: "$3.05" },
    ],
  },
  {
    id: "frpfile-a12-no-signal",
    category: "FRPFILE ACTIVATOR A12+ Bypass No Signal",
    items: [
      { id: "frpfile-xr-17pm", name: "FRPFILE ACTIVATOR A12+ Bypass Hello Screen iPhone XR to 17 Pro Max - iPad A12+ To M3 - No Notification, iCloud Service (Windows Tool) ✅", delivery: "Instant", price: "$3.50" },
      { id: "frpfile-11-16pm", name: "FRPFILE ACTIVATOR A12+ Bypass Hello Screen iPhone 11 to 16 Pro Max - iPad A12+ To M3 (iOS 17.0 to iOS 26.1) With iCloud Service, Notification (Windows Tool) ✅", delivery: "Instant", price: "$6.00" },
    ],
  },
  {
    id: "a12-bypass-tools",
    category: "A12+ BYPASS No Signal All Tools [No Refund For Any Reason]",
    items: [
      { id: "iremoval-pro-a12", name: "iRemoval Pro A12+ ALL Model iPhone & iPad iOS 18.6 - 18.7 - 26 - 26.1 [DO NOT ORDER FOR CH/A]", delivery: "Instant", price: "$10.00" },
      { id: "iremove-mac-a12", name: "iRemove A12+ Mac Tool [iPhone & iPad All Model] CH/CHINA Supported", delivery: "Instant", price: "$8.90" },
      { id: "hfz-a12-win", name: "HFZ Activator A12+ Premium Windows Tool BYPASS NO SIGNAL (A12 All Models) ✅", delivery: "Minutes", price: "$6.70" },
      { id: "ihello-hfz-a12", name: "iHello HFZ AiO Premium Bypass A12 (All Models) CH/CHINA Supported (Mac/Windows Tool)", delivery: "1-5 Minutes", price: "$5.53" },
    ],
  },
  {
    id: "iapro-a12-activator",
    category: "iAPro A12+ Activator Premium Windows Tool Bypass 2025",
    items: [
      { id: "iapro-v19-win", name: "iAPro A12+ Activator V1.9 Windows Tool BYPASS NO SIGNAL 18.6-26.1 iOS Supported", delivery: "Minutes", price: "$3.50" },
    ],
  },
  {
    id: "lu-a12-bypass",
    category: "LU A12+ Bypass",
    items: [
      { id: "lu-wifi-a12", name: "LU-WIFI A12+ iPhone XR To 16 Pro Max - iPads (IOS 18.7-26.xx) Windows Tool No Refund China Device", delivery: "Minutes", price: "$4.30" },
    ],
  },
  {
    id: "lu-a5-bypass",
    category: "LU - A5 Bypass",
    items: [
      { id: "lu-a5-no-arduino", name: "LU - A5 Bypass Tool A5X Devices Only No Arduino ✅", delivery: "Minutes", price: "$2.80" },
    ],
  },
  {
    id: "iapro-a5-bypass",
    category: "iAPro A5 Bypass Windows Tool 2025",
    items: [
      { id: "iapro-a5-all", name: "iAPro A5 Bypass (4, 4S, Touch 5, Mini 1, iPad 2, 3) Windows Tool", delivery: "Instant", price: "$0.95" },
    ],
  },
  {
    id: "tmobile-usa-promo",
    category: "T-Mobile USA Premium (Promotional Offer)",
    hot: true,
    items: [
      { id: "tmo-sprint-unlocked", name: "T-Mobile / Sprint - All Models iP 5S TO 17 Pro Max - Unlocked Instant To 24 Hours Full Premium 100% success ✅", delivery: "1-24 Hours", price: "$89.10" },
    ],
  },
  {
    id: "icloud-fmi-off",
    category: "iCloud FMI OFF OPEN MENU ⛑️",
    items: [
      { id: "frpfile-fmi-iphone", name: "FRPFILE Open Menu iCloud Remove for iPhone, iPad FMI AUTO TOOL", delivery: "Instant", price: "$3.00" },
      { id: "frpfile-fmi-mac", name: "FRPFILE Open Menu iCloud Remove for MacBook", delivery: "Instant", price: "$6.00" },
      { id: "fmi-off-no-pc", name: "FMI OFF Open Menu (Without PC - Without Tool) - iPhone / iPad", delivery: "Minutes", price: "$3.00" },
    ],
  },
  {
    id: "mdm-tecno-infinix",
    category: "MDM/ID REMOVE TECNO INFINIX ALL MODEL SUPPORT",
    items: [
      { id: "tecno-infinix-id", name: "Tecno ID & Infinix ID Removal - Cloud ID Officially OFF All MODEL SUPPORTED Auto Api [Monday To Friday]", delivery: "24-72 Hours", price: "$9.00" },
      { id: "mdm-tecno-itel", name: "MDM Lock Removal & IMEI Unlock for Tecno, iTel & Infinix (1–3 Working Days) 100% ✅", delivery: "1-72 Hours", price: "$15.00" },
      { id: "tecno-inf-mdm-perm", name: "Tecno - Infinix - Itel MDM Remove Permanently (Monday To Friday) Full Premium Pro [Level 3] ⭐⭐⭐", delivery: "1-48 Hours", price: "$19.70" },
    ],
  },
  {
    id: "tecno-info-check",
    category: "TECNO | INFINIX FULL INFO CHECK",
    items: [
      { id: "itel-tecno-inf-sales", name: "ITEL | TECNO | INFINIX | SALES COUNTRY | FULL INFO CHECK", delivery: "Instant", price: "$0.045" },
    ],
  },
  {
    id: "frpfile-screen-time",
    category: "FRPFILE Remove Screen Time & Bypass iCloud Open Menu",
    items: [
      { id: "ipad-a12-a15", name: "iPad CPU A12-A15", delivery: "Instant", price: "$22.00" },
      { id: "iphone-17-series", name: "iPhone 17/17 AIR/17 PRO/17 PRO MAX", delivery: "Instant", price: "$35.00" },
      { id: "ipad-m1-m4", name: "iPad CPU M1 to M4", delivery: "Instant", price: "$28.00" },
      { id: "iphone-se2-se3", name: "iPhone SE2/SE3", delivery: "Instant", price: "$13.00" },
      { id: "iphone-16-series", name: "iPhone 16/16e/16 PRO/16 PRO MAX", delivery: "Instant", price: "$27.00" },
      { id: "iphone-xr-xs", name: "iPhone XR/XS/XS Max", delivery: "Instant", price: "$14.00" },
      { id: "iphone-11-series", name: "iPhone 11/11 PRO/11 PRO MAX", delivery: "Instant", price: "$18.00" },
      { id: "iphone-12-series", name: "iPhone 12/12 MINI/12 PRO/12 PRO MAX", delivery: "Instant", price: "$19.00" },
      { id: "iphone-13-series", name: "iPhone 13/13 MINI/13 PRO/13 PRO MAX", delivery: "Instant", price: "$19.00" },
      { id: "iphone-14-series", name: "iPhone 14/14 PLUS/14 PRO/14 PRO MAX", delivery: "Instant", price: "$28.00" },
      { id: "iphone-15-series", name: "iPhone 15/15 PLUS/15 PRO/15 PRO MAX", delivery: "Instant", price: "$27.00" },
    ],
  },
  {
    id: "frpfile-official",
    category: "FRPFILE TOOL SERVICE (Official Distributor)",
    items: [
      { id: "frpfile-ramdisk-hello", name: "FRPFILE RAMDISK Bypass Hello Screen/Broken Baseband iOS 14/15/16 without Jailbreak [AUTO API]", delivery: "Instant", price: "$3.00" },
      { id: "frpfile-premium-api", name: "FRPFILE Premium Tool Bypass iCloud, Passcode Disable, Baseband Broken, MDM [AUTO API]", delivery: "Instant", price: "$2.00" },
      { id: "frpfile-ramdisk-pass", name: "FRPFILE RAMDISK Bypass Passcode/Disable iOS 14/15.7/16 without Jailbreak [AUTO API]", delivery: "Instant", price: "$3.00" },
      { id: "frpfile-wifi-untethered", name: "FRPFILE WIFI TOOL Untethered Bypass Hello Screen iPhone-iPad iOS 15-17 with Notification", delivery: "Instant", price: "$3.00" },
      { id: "frpfile-6s-x-no-signal", name: "FRPFILE iPad - iPhone 6S To X Bypass Hello Screen iOS 15–16 no Signal", delivery: "Instant", price: "$3.00" },
      { id: "frpfile-t2-mac", name: "FRPFILE T2 iCloud Bypass for MacOS Devices T2 - FULL Untethered iBridgeOS 9.x", delivery: "Instant", price: "$15.00" },
      { id: "frpfile-mdm-all", name: "FRPFILE MDM Bypass Tool support All iPhone, iPad, All iOS version", delivery: "Instant", price: "$2.00" },
      { id: "frpfile-win-t2", name: "Windows Tool FRPFILE T2 & Apple Configurator iCloud Bypass for MacOS Devices", delivery: "Instant", price: "$15.00" },
    ],
  },
  {
    id: "iapro-bypass-2025",
    category: "iAPRO BYPASS 2025 ✅",
    items: [
      { id: "iapro-wifi-a9-a11", name: "iAPro WIFI Bypass Hello Screen No Signal Without SN Change A9-A11 Windows TOOL", delivery: "Instant", price: "$1.10" },
      { id: "iapro-t2-mac-2025", name: "iAPro T2 MAC Tool Untethered iCloud Bypass 2025 for MacOS Devices BridgeOS 9.X", delivery: "Instant", price: "$6.50" },
      { id: "iapro-mac-mdm", name: "iAPro MAC Permanent MDM Removal Tool", delivery: "Instant", price: "$1.00" },
    ],
  },
  {
    id: "mina-a12-rebypass",
    category: "MIna Tool A12+ Rebypass",
    items: [
      { id: "mina-win-mac-a12", name: "Mina Windows/Mac Tool A12+ iPhone iPad Rebypass Old Registered Device [Bypass Again]", delivery: "Instant", price: "$10.00" },
    ],
  },
  {
    id: "esim-qpe",
    category: "E-SIM CODE [QPE METHOD]",
    items: [
      { id: "esim-code-qpe", name: "E-SIM Code - [QPE Method] - [Esim code]", delivery: "1-30 Minutes", price: "$2.85" },
    ],
  },
  {
    id: "lpro-max-5s-x",
    category: "LPro Max 5S To X Bypass (Windows & Mac Tool) ✅",
    items: [
      { id: "lpro-5s", name: "LPro Max Hello Bypass with Signal iPhone 5S", delivery: "1-5 Minutes", price: "$7.00" },
      { id: "lpro-6", name: "LPro Max Hello Bypass with Signal iPhone 6/6Plus", delivery: "1-5 Minutes", price: "$13.00" },
      { id: "lpro-6s", name: "LPro Max Hello Bypass with Signal iPhone 6s/6s Plus", delivery: "1-5 Minutes", price: "$16.00" },
      { id: "lpro-7", name: "LPro Max Hello Bypass with Signal iPhone 7/7 Plus", delivery: "1-5 Minutes", price: "$22.50" },
      { id: "lpro-8", name: "LPro Max Hello Bypass with Signal iPhone 8/8 Plus", delivery: "1-5 Minutes", price: "$28.50" },
      { id: "lpro-x", name: "LPro Max Hello Bypass with Signal iPhone X", delivery: "1-5 Minutes", price: "$34.00" },
      { id: "lpro-ipad-2017", name: "LPro Max Hello Bypass iPads Till 2017", delivery: "1-5 Minutes", price: "$19.00" },
      { id: "lpro-ipad-after-2017", name: "LPro Max Hello Bypass iPad After 2017", delivery: "1-5 Minutes", price: "$25.00" },
    ],
  },
  {
    id: "iremove-win-mac",
    category: "IREMOVE TOOL [WINDOWS+MAC TOOL]",
    items: [
      { id: "iremove-5s", name: "iRemove iCloud Bypass - iPhone 5S (iOS 12, With Network)", delivery: "1-5 Minutes", price: "$4.60" },
      { id: "iremove-6", name: "iRemove iCloud Bypass - iPhone 6/6 Plus (iOS 12, With Network)", delivery: "1-5 Minutes", price: "$9.50" },
      { id: "iremove-6s", name: "iRemove iCloud Bypass - iPhone 6S/6S Plus/SE (iOS 15/16, With Network)", delivery: "1-5 Minutes", price: "$13.10" },
      { id: "iremove-7", name: "iRemove iCloud Bypass - iPhone 7/7 Plus (iOS 15/16, With Network)", delivery: "1-5 Minutes", price: "$20.90" },
      { id: "iremove-8", name: "iRemove iCloud Bypass - iPhone 8/8 Plus (iOS 15/16/17, With Network)", delivery: "1-5 Minutes", price: "$33.00" },
      { id: "iremove-x", name: "iRemove iCloud Bypass - iPhone X (iOS 15/16/17, With Network)", delivery: "1-5 Minutes", price: "$43.00" },
      { id: "iremove-ipad-2017", name: "iRemove iCloud Bypass - iPad till 2017 Cellular [WITH SIGNAL]", delivery: "1-5 Minutes", price: "$25.00" },
    ],
  },
  {
    id: "honor-frp-unlock",
    category: "HONOR FRP UNLOCK KEY ⚡",
    items: [
      { id: "honor-frp-imei", name: "Honor FRP Reset Key By IMEI/SN - INSTANT - 24/7 Auto Api", delivery: "1-60 Minutes", price: "$48.45" },
      { id: "honor-frp-google", name: "Honor FRP Key - Google Account Removal [Auto API] ✅", delivery: "1-24 Hours", price: "$32.70" },
      { id: "honor-info-imei", name: "HONOR FULL INFO IMEI/SN", delivery: "1-5 Minutes", price: "$0.456" },
    ],
  },
  {
    id: "mdm-macbook-recovery",
    category: "Bypass MDM for Macbook, iMac in recovery mode",
    items: [
      { id: "mdm-mac-t2-m4", name: "Bypass MDM on Macbook Pro/Air T2/M1/M2/M3/M4 Ventura, Sonoma", delivery: "Instant", price: "$7.00" },
    ],
  },
  {
    id: "mac-finder-info",
    category: "Finder Owner Info For Macbook, iMac Screen Lock Password",
    items: [
      { id: "mac-finder-t2-m4", name: "Macbook, iMac Finder Owner Info for Mac T2, M1, M2, M3, M4", delivery: "Instant", price: "$4.50" },
    ],
  },
  {
    id: "nothing-phone-unlock",
    category: "Nothing Phone Unlock",
    items: [
      { id: "nothing-region-imei", name: "Nothing Phone Region Lock Direct Unlock BY IMEI [All Model Support] Fast Service 100% Success ✅", delivery: "1-24 Hours", price: "$2.00" },
    ],
  },
  {
    id: "realme-network-unlock",
    category: "Realme Network Unlock",
    items: [
      { id: "realme-ww-172", name: "Realme [WORLDWIDE] Region / Call Failed / Network Unlock 172 Digit Code - Fast Service", delivery: "1-10 days", price: "$14.50" },
      { id: "realme-india-172", name: "Realme Region Lock 172 Digit Unlock Code [Only INDIA] Monday-Friday 100% Success", delivery: "1-72 Hours", price: "$4.70" },
    ],
  },
  {
    id: "gsx-direct-source",
    category: "GSX SERVICES / DIRECT SOURCE",
    items: [
      { id: "gsx-full-imei", name: "Apple GSX Full Report – Sold By, Case History & MDM Check by IMEI/SN", delivery: "1-5 Minutes", price: "$1.60" },
      { id: "sold-info-imei", name: "Sold by Info Check All iPhone, iPad, and iWatch Supported by IMEI/SN [Server 1]", delivery: "1-5 Minutes", price: "$1.40" },
      { id: "gsx-full-history", name: "Apple GSX Full Report – Sold By, Case History & Replacement Check", delivery: "1-5 Minutes", price: "$2.10" },
      { id: "sales-model-country", name: "Sales Model / Part Number + Country checker", delivery: "1-5 Minutes", price: "$0.30" },
      { id: "mac-ipad-history", name: "Mac, iPad & iWatch: Repair, Replacement & Case History Check (Picture Service)", delivery: "1-5 Minutes", price: "$1.87" },
    ],
  },
  {
    id: "apple-id-finder",
    category: "APPLE ID OWNER INFO",
    items: [
      { id: "icloud-finder-sprint", name: "iCloud ID Finder BY IMEI 100% [Sprint USA Only] (Owner Info)", delivery: "1-72 Hours", price: "$12.40" },
      { id: "icloud-finder-tmo", name: "iCloud ID Finder BY IMEI 100% [T-Mobile USA Only] (Owner Info)", delivery: "1-72 Hours", price: "$12.40" },
      { id: "icloud-finder-verizon", name: "iCloud ID Finder BY IMEI 100% [Verizon USA Only] (Owner Info)", delivery: "1-72 Hours", price: "$12.40" },
    ],
  },
  {
    id: "ww-icloud-removal",
    category: "Worldwide iCloud Lock Remove All Model ✅",
    items: [
      { id: "ww-activation-lock", name: "Worldwide All Countries iCloud Activation Lock Remove (iPhone All Model) - Clean 85% Success ✅", delivery: "1-30 days", price: "$220.00" },
    ],
  },
  {
    id: "icloud-removal-eu",
    category: "iCloud Removal (EUROPE) Countries High Success ✅",
    items: [
      { id: "eu-icloud-11", name: "iCloud Activation Lock Remove - Europe Fresh IMEI ONLY (iPhone 11 Series) - Clean 85% Success", delivery: "1-30 days", price: "$140.00" },
      { id: "eu-icloud-12", name: "iCloud Activation Lock Remove - Europe Fresh IMEI ONLY (iPhone 12 Series) - Clean 85% Success", delivery: "1-30 days", price: "$150.00" },
      { id: "eu-icloud-13", name: "iCloud Activation Lock Remove - Europe Fresh IMEI ONLY (iPhone 13 Series) - Clean 85% Success", delivery: "1-30 days", price: "$160.00" },
      { id: "eu-icloud-14", name: "iCloud Activation Lock Remove - Europe Fresh IMEI ONLY (iPhone 14 Series) - Clean 85% Success", delivery: "1-30 days", price: "$170.00" },
      { id: "eu-icloud-15", name: "iCloud Activation Lock Remove - Europe Fresh IMEI ONLY (iPhone 15 Series) - Clean 85% Success", delivery: "1-30 days", price: "$180.00" },
      { id: "eu-icloud-16", name: "iCloud Activation Lock Remove - Europe Fresh IMEI ONLY (iPhone 16 Series) - Clean 85% Success", delivery: "1-30 days", price: "$200.00" },
    ],
  },
  {
    id: "icloud-removal-arabic",
    category: "iCloud Removal Arabic Countries High Success ✅",
    items: [
      { id: "me-icloud-11", name: "iCloud Activation Lock Remove - Middle East Fresh IMEI (iPhone 11 Series)", delivery: "1-35 days", price: "$140.00" },
      { id: "me-icloud-12", name: "iCloud Activation Lock Remove - Middle East Fresh IMEI (iPhone 12 Series)", delivery: "1-35 days", price: "$150.00" },
      { id: "me-icloud-13", name: "iCloud Activation Lock Remove - Middle East Fresh IMEI (iPhone 13 Series)", delivery: "1-35 days", price: "$160.00" },
      { id: "me-icloud-14", name: "iCloud Activation Lock Remove - Middle East Fresh IMEI (iPhone 14 Series)", delivery: "1-35 days", price: "$170.00" },
      { id: "me-icloud-15", name: "iCloud Activation Lock Remove - Middle East Fresh IMEI (iPhone 15 Series)", delivery: "1-35 days", price: "$200.00" },
      { id: "me-icloud-16", name: "iCloud Activation Lock Remove - Middle East Fresh IMEI (iPhone 16 Series)", delivery: "1-35 days", price: "$220.00" },
    ],
  },
  {
    id: "generic-info-check",
    category: "GENERIC PREMIUM CHECK SERVICE",
    items: [
      { id: "nothing-info", name: "NOTHING PHONE INFO", delivery: "Instant", price: "$0.033" },
      { id: "realme-info", name: "REALME INFO", delivery: "Instant", price: "$0.20" },
      { id: "samsung-info", name: "SAMSUNG INFO", delivery: "Instant", price: "$0.10" },
      { id: "oneplus-info", name: "ONEPLUS INFO", delivery: "Instant", price: "$0.10" },
      { id: "motorola-info", name: "MOTOROLA INFO", delivery: "Instant", price: "$0.15" },
      { id: "pixel-info", name: "GOOGLE PIXEL INFO", delivery: "Instant", price: "$0.20" },
      { id: "vivo-iqoo-info", name: "VIVO | IQOO INFO", delivery: "Instant", price: "$0.08" },
      { id: "huawei-info", name: "HUAWEI INFO", delivery: "Instant", price: "$0.18" },
      { id: "alcatel-info", name: "ALCATEL INFO", delivery: "Instant", price: "$0.20" },
      { id: "lg-info", name: "LG INFO", delivery: "Instant", price: "$0.10" },
      { id: "lenovo-info", name: "LENOVO INFO", delivery: "Instant", price: "$0.12" },
    ],
  },
  {
    id: "emea-iphone",
    category: "EMEA SERVICE - iPHONE",
    items: [
      { id: "emea-ww-premium", name: "EMEA iPhone All Model Support Premium Fast Service", delivery: "1-24 Hours", price: "$2.399" },
    ],
  },
  {
    id: "canada-networks",
    category: "CANADA NETWORKS SERVICE",
    items: [
      { id: "ca-telus-koodo-promo", name: "CANADA TELUS/KOODO IPHONE ALL MODELS PREMIUM FAST SERVICE - PROMO ON", delivery: "1-72 Hours", price: "$2.70" },
      { id: "ca-telus-koodo-clean", name: "Telus/Koodo Canada Clean Unlock All iPhones", delivery: "1-72 Hours", price: "$3.70" },
      { id: "ca-rogers-fido", name: "Rogers/Fido Canada iPhone & Generic Network Unlock", delivery: "24-72 Hours", price: "$6.00" },
      { id: "ca-videotron-code", name: "Canada Videotron Generic All Model Unlock Code", delivery: "1-5 days", price: "$4.00" },
      { id: "ca-sasktel-iphone", name: "Canada SaskTel iPhone All Model Support Clean Only", delivery: "1-5 days", price: "$16.50" },
      { id: "ca-bell-clean", name: "Canada Bell/Virgin Up to 8 Clean IMEI High Success", delivery: "1-5 days", price: "$5.00" },
      { id: "ca-bell-generic", name: "Canada Bell/BellMTS/Virgin - Generic Code {Sony, Lumia, Samsung etc}", delivery: "1-5 days", price: "$2.50" },
      { id: "ca-bell-mts-premium", name: "Canada Bell/MTS Premium iPhone Network Unlock Up To 17 Series – 48H Delivery", delivery: "1-72 Hours", price: "$150.00" },
    ],
  },
  {
    id: "blackberry-services",
    category: "BLACKBERRY SERVICES",
    items: [
      { id: "bb-mep-calc", name: "Black Berry Calculator By MEP [1-10 Minutes]", delivery: "1-10 Minutes", price: "$1.70" },
      { id: "bb-prd-calc", name: "BlackBerry Calculator by PRD [1-10 Minutes]", delivery: "1-10 Minutes", price: "$1.70" },
    ],
  },
  {
    id: "htc-unlock-code",
    category: "HTC Unlock Code",
    items: [
      { id: "htc-db-2017", name: "HTC Unlock Code Via IMEI - [2009-2017 Database]", delivery: "1-60 Minutes", price: "$3.00" },
      { id: "htc-db-2019", name: "HTC Unlock Code Via IMEI - [Till 2019 Database]", delivery: "1-60 Minutes", price: "$3.50" },
      { id: "htc-db-ultimate", name: "HTC Unlock Code Via IMEI - [Ultimate Latest Database]", delivery: "1-60 Minutes", price: "$5.00" },
    ],
  },
  {
    id: "huawei-frp-reset",
    category: "HUAWEI FRP RESET KEY (FRP UNLOCK CODE)",
    items: [
      { id: "huawei-testpoint", name: "HUAWEI RESET FRP INSTANT SERVICE UNLOCK BY (TESTPOINT)", delivery: "5-10 Minutes", price: "$3.00" },
    ],
  },
  {
    id: "imei-check-service",
    category: "IMEI Check Service",
    items: [
      { id: "sam-info-imei", name: "Samsung Info Check By IMEI", delivery: "1-30 Minutes", price: "$0.10" },
      { id: "iphone-aio-basic", name: "iPhone All In One Basic Check By IMEI 100%", delivery: "Minutes", price: "$0.08" },
      { id: "lg-info-imei", name: "LG INFO CHECK BY IMEI", delivery: "1-5 Minutes", price: "$0.10" },
      { id: "huawei-info-imeisn", name: "HUAWEI INFO CHECK BY IMEI/SN", delivery: "1-5 Minutes", price: "$0.10" },
      { id: "lenovo-warranty-check", name: "Lenovo Model / Country / Warranty Check + Blacklist Status", delivery: "1-5 Minutes", price: "$0.10" },
      { id: "moto-lenovo-imei", name: "MOTOROLA & LENOVO IMEI CHECK INFO", delivery: "1-5 Minutes", price: "$0.15" },
      { id: "nokia-info-check", name: "NOKIA INFO CHECK", delivery: "1-5 Minutes", price: "$0.10" },
      { id: "sam-carrier-checker", name: "Samsung Full Info + Carrier Checker BY IMEI", delivery: "1-5 Minutes", price: "$0.10" },
      { id: "sony-info-check", name: "SONY INFO CHECK", delivery: "1-5 Minutes", price: "$0.10" },
      { id: "tmo-clean-status", name: "T-MOBILE USA CLEAN/BLOCKED/UNPAID STATUS", delivery: "1-5 Minutes", price: "$0.05" },
      { id: "tmo-device-unlock-status", name: "T-MOBILE USA Device Unlock App Simlock Status Checker", delivery: "1-5 Minutes", price: "$0.10" },
      { id: "zte-info-check", name: "ZTE INFO CHECK", delivery: "1-5 Minutes", price: "$0.13" },
    ],
  },
  {
    id: "iphone-carrier-check",
    category: "iPHONE IMEI-SN CARRIER CHECK SERVICE",
    items: [
      { id: "iphone-simlock-carrier", name: "iPhone SimLock + Carrier Checker by IMEI/SN", delivery: "Instant", price: "$0.15" },
      { id: "iphone-carrier-icloud-gsma", name: "iPhone Carrier, SIM Lock, iCloud & GSMA Blacklist Status Check (Premium)", delivery: "Instant", price: "$0.32" },
      { id: "mac-fmi-lost-checker", name: "Apple Macbook/iMac FMI ON/OFF & iCloud Clean/Lost Checker (By SN)", delivery: "1-5 Minutes", price: "$0.55" },
      { id: "apple-mdm-checker", name: "Apple iPhone/iPad/iMac/Macbook MDM Checker (IMEI/SN)", delivery: "1-5 Minutes", price: "$0.80" },
    ],
  },
  {
    id: "saudi-ksa-unlock",
    category: "iPhone Network Unlock - Saudi Arabia KSA",
    items: [
      { id: "iphone-zain-ksa", name: "iPhone/iPad All Models Including 13 Pro Max Unlock Saudi Arabic Zain Network KSA", delivery: "1-3 days", price: "$80.00" },
    ],
  },
  {
    id: "ipad-sn-wifi-bt",
    category: "iPHONE/IPAD SN / SERVICE SERIAL + WIFI + BT",
    items: [
      { id: "ipad-sn-wifi-bt-a5-a6", name: "Premium Service [SERIAL + WIFI + BT] IPAD A5/A6/A6X AUTO REPLY INSTANT SUPPORT", delivery: "1-30 Minutes", price: "$1.50" },
      { id: "ipad-air-pro-bt-wifi-sn", name: "iPad BT, Wifi, SN - iPad Air 2, iPad Pro 10.5-inch, iPad Pro 12.9-inch 2nd gen", delivery: "1-10 Minutes", price: "$7.00" },
    ],
  },
  {
    id: "att-usa-semi-premium",
    category: "AT&T USA Generic - Semi Premium",
    items: [
      { id: "att-usa-lg-sam-semi", name: "At&t USA - LG / Samsung / Nokia / ZTE / Sony / Generic - Semi Premium", delivery: "1-48 Hours", price: "$11.00" },
    ],
  },
  {
    id: "bahrain-network-unlock",
    category: "BAHRAIN NETWORK UNLOCK SERVICE",
    items: [
      { id: "bahrain-zain-iphone", name: "Bahrain Zain Network iPhone All Models Including 14/14 Pro/14 Pro Max", delivery: "1-5 days", price: "$85.00" },
    ],
  },
  {
    id: "japan-jcom-unlock",
    category: "JAPAN JCOM - UNLOCKING NETWORKS",
    items: [
      { id: "jp-jcom-14-14pm", name: "Japan JCOM - iPhone 14 To 14Pro Max (Network Unlock Clean IMEI)", delivery: "1-48 Hours", price: "$19.00" },
      { id: "jp-jcom-6s-13pm", name: "Japan JCOM - iPhone 6s To 13Pro Max (Network Unlock Clean IMEI)", delivery: "1-48 Hours", price: "$7.50" },
    ],
  },
  {
    id: "japan-network-unlock",
    category: "JAPAN NETWORK",
    items: [
      { id: "jp-au-kddi-6s-13", name: "Japan AU KDDI - iP 6s/6s+/SE/7/7+/8/8+/X/Xr/Xs/XsMax/11/12/13 (Clean IMEI Only)", delivery: "1-24 Hours", price: "$5.00" },
      { id: "jp-au-kddi-clean", name: "JAPAN AU/KDDI iPhone & Generic All Model CLEAN Unlock", delivery: "1-72 Hours", price: "$3.00" },
      { id: "jp-au-kddi-semi-premium", name: "KDDI AU Japan - iP XR/XS/XSMAX/11/12/13 SEMI PREMIUM 99% SUCCESS", delivery: "1-4 days", price: "$23.00" },
      { id: "jp-docomo-generic-code", name: "Japan Docomo NTT/Docomo Generic Code Service [Clean & Unpaid]", delivery: "1-5 days", price: "$5.00" },
      { id: "jp-docomo-clean-unpaid", name: "Ntt Docomo Japan - iPhone & Generic (All Model Supported) Clean + Unpaid ✅", delivery: "1-24 Hours", price: "$3.15" },
      { id: "jp-docomo-xr-13-premium", name: "Ntt Docomo Japan - iPhone XR/XS/XS MAX/11/12 & 13 Premium Fast Service", delivery: "1-30 Hours", price: "$5.055" },
      { id: "jp-au-kddi-clean-unpaid", name: "AU KDDI Japan - iPhone & Generic (All Model Supported) Clean + Unpaid ✅", delivery: "1-24 Hours", price: "$4.15" },
      { id: "jp-docomo-se-13pm-premium", name: "NTT Docomo Japan - iPhone SE to 13 Pro Max (Premium Unlock Service)", delivery: "1-48 Hours", price: "$12.00" },
      { id: "jp-docomo-clean-lost-check", name: "NTT Docomo Japan - Clean, Lost Check Service", delivery: "1-5 Minutes", price: "$0.10" },
    ],
  },
  {
    id: "japan-softbank-unlock",
    category: "JAPAN SOFTBANK",
    items: [
      { id: "jp-softbank-generic-code", name: "Softbank Japan Generic Code LG / Samsung / Nokia / ZTE / Sony / Moto etc.", delivery: "24-72 Hours", price: "$2.17" },
      { id: "jp-softbank-clean-unpaid", name: "Softbank Japan - iPhone & Generic (All Model Supported) Clean + Unpaid ✅", delivery: "1-24 Hours", price: "$2.17" },
      { id: "jp-softbank-all-clean", name: "Japan SoftBank - iPhone All Models Including 13 Pro Max [Clean only]", delivery: "1-48 Hours", price: "$27.00" },
      { id: "jp-softbank-6s-12-clean-unpaid", name: "Japan Softbank - iP 6S/6S+/SE/7/7+/8/8+/X/Xr/Xs/XsMax/11/12 (Clean & Unpaid Supported)", delivery: "1-48 Hours", price: "$3.50" },
    ],
  },
  {
    id: "macbook-sn-checkers",
    category: "MacBook SN - Checkers",
    items: [
      { id: "mac-icloud-clean-lost", name: "MacBook iCloud Clean/Lost Check [IMEI/SN]", delivery: "1-5 Minutes", price: "$0.70" },
      { id: "mac-fmi-onoff", name: "MacBook FMI On/Off Check", delivery: "1-5 Minutes", price: "$0.31" },
      { id: "mac-fmi-onoff-model", name: "MacBook FMI On/Off + Model Check", delivery: "1-5 Minutes", price: "$0.305" },
    ],
  },
  {
    id: "motorola-unlock",
    category: "MOTOROLA",
    items: [
      { id: "moto-nck-cricket-no", name: "Motorola NCK Code By IMEI [Cricket Not Supported] Instant Premium", delivery: "1-10 Minutes", price: "$4.00" },
      { id: "moto-ww-nck-instant", name: "Motorola - Worldwide NCK Code [24/7 INSTANT] (Code Not Found Also Supported)", delivery: "1-10 Minutes", price: "$1.15" },
      { id: "moto-ww-nck-fast", name: "Motorola - Worldwide NCK Code SUPER FAST", delivery: "1-5 Minutes", price: "$0.65" },
    ],
  },
  {
    id: "nokia-services-unlock",
    category: "NOKIA SERVICES",
    items: [
      { id: "nokia-ww-nck-code", name: "Nokia WorldWide [Listed Models Only] NCK Code Only", delivery: "1-24 Hours", price: "$13.00" },
    ],
  },
  {
    id: "oppo-network-unlock",
    category: "OPPO NETWORK UNLOCK SERVICE",
    items: [
      { id: "oppo-realme-16digit", name: "OPPO/Realme Network Unlock NCK Code (16 Digit) Dual IMEI Worldwide (❤️ Promo Offer)", delivery: "1-60 Minutes", price: "$0.40" },
      { id: "oppo-network-single-imei", name: "OPPO NETWORK LOCK SINGLE IMEI (Thailand - Australia And Japan not supported)", delivery: "1-24 Hours", price: "$10.00" },
      { id: "oppo-jp-single-nck", name: "OPPO Network Unlock (Japan Country Only) Single Sim NCK Codes", delivery: "1-24 Hours", price: "$6.20" },
    ],
  },
  {
    id: "philippines-unlock",
    category: "Philippines Network Unlock",
    items: [
      { id: "ph-globe-semi-premium", name: "Globe Philippines - iPhone (All Model Support) Semi Premium", delivery: "1-5 days", price: "$15.50" },
      { id: "ph-globe-singtel-5-x", name: "Philippines Globe (SingTel) iPhone 5 to X (Only Clean IMEI Supported)", delivery: "7-15 days", price: "$20.50" },
    ],
  },
  {
    id: "s-tool-pro-activ",
    category: "S-TOOL PRO",
    items: [
      { id: "scoin-s-tool-pro", name: "Buy SCoin for S-Tool Pro", delivery: "1-30 Minutes", price: "$1.20" },
      { id: "s-tool-pro-1year", name: "S-Tool Pro 1 Year Activation/Renew", delivery: "1-30 Minutes", price: "$36.00" },
      { id: "s-tool-pro-6month", name: "S-Tool Pro 6 Months Activation/Renew", delivery: "1-30 Minutes", price: "$26.00" },
      { id: "s-tool-pro-3month", name: "S-Tool Pro 3 Months Activation/Renew", delivery: "1-30 Minutes", price: "$18.00" },
    ],
  },
  {
    id: "samsung-ww-s22",
    category: "SAMSUNG SERVICE",
    items: [
      { id: "sam-ww-s22-zfold3", name: "Samsung World Wide - S22, S22 Ultra, Z Fold 3, Z Flip 3 (Unlock Service)", delivery: "3-7 days", price: "$55.00" },
    ],
  },
  {
    id: "spectrum-usa-unlock",
    category: "SPECTRUM USA - iPHONE & GENERIC UNLOCK ✅",
    items: [
      { id: "spectrum-usa-12-14-clean", name: "SPECTRUM USA - iPhone [Clean+Finance] Unlock iPhone 12/13/14 Series ✅", delivery: "1-15 days", price: "$159.00" },
    ],
  },
  {
    id: "tmo-sprint-premium",
    category: "T-MOBILE USA / Sprint NETWORK UNLOCK",
    hot: true,
    items: [
      { id: "tmo-sprint-11-14pm-premium", name: "T-Mobile/Sprint - All Models Supported Till iPhone 11 To 14 Pro Max [Premium Clean + Financed]", delivery: "1-48 Hours", price: "$112.00" },
      { id: "tmo-sprint-15pm-express", name: "T-Mobile/Sprint/Metropcs - 15 Pro / 15 Pro Max Premium 100% Express ✅", delivery: "1-48 Hours", price: "$138.00" },
      { id: "tmo-sprint-15-plus-express", name: "T-Mobile/Sprint/Metropcs - Till 15/15 Plus Premium 100% Express ✅", delivery: "1-48 Hours", price: "$133.00" },
      { id: "tmo-sprint-16-plus-premium", name: "T-Mobile/Sprint/Metropcs - All Models Till 16/16+ [Premium] Express ✅", delivery: "1-48 Hours", price: "$148.00" },
      { id: "tmo-metropcs-16-plus-express", name: "T-Mobile/METROPCS/SPRINT USA iPhone 16/16+ [CLEAN/PREMIUM + FINANCE] Express ✅", delivery: "1-48 Hours", price: "$148.00" },
      { id: "tmo-metropcs-16pm-express", name: "T-Mobile/METROPCS/SPRINT USA iPhone 16 PRO/16PRO MAX [CLEAN/PREMIUM + FINANCE] Express ✅", delivery: "1-48 Hours", price: "$148.00" },
    ],
  },
  {
    id: "tecno-network-nck",
    category: "TECNO NETWORK UNLOCK",
    items: [
      { id: "tecno-network-code", name: "Tecno Network Unlock Code By IMEI", delivery: "1-3 Hours", price: "$4.00" },
    ],
  },
  {
    id: "uk-iphone-unlock",
    category: "UK iPHONE Network Unlock",
    items: [
      { id: "vodafone-uk-clean", name: "Vodafone UK - iPhone All Models (Clean Unlock Service)", delivery: "1-5 days", price: "$15.00" },
      { id: "uk-vodafone-11-12-premium", name: "UK VODAFONE iPHONE XR/XS/XS MAX/11 & 12 Series [PREMIUM] UNLOCK SERVICE", delivery: "1-5 days", price: "$30.00" },
      { id: "3hutch-cpw-uk-clean", name: "3 Hutchison & CPW & Flex Policy UK - iPhone All Models (Clean Unlock Service)", delivery: "1-15 days", price: "$30.00" },
      { id: "ee-orange-6month-clean", name: "EE/Orange/T-Mobile UK - iPhone All Models (6+ Month Old Clean Unlock Service)", delivery: "1-4 days", price: "$8.00" },
      { id: "ee-orange-xr-11pm-premium", name: "EE/Orange/T-Mobile UK - iPhone XR to 11 Pro Max (Over 6+ Months Premium)", delivery: "1-10 days", price: "$20.00" },
      { id: "uk-ee-xr-13pm-premium", name: "UK EE iPHONE XR/XS/XS MAX/11/12 & 13 Premium Unlock Service", delivery: "1-72 days", price: "$13.00" },
      { id: "uk-ee-clean-eligible", name: "UK EE/T Mobile/Orange iPhone/iPad/Generic All Models Clean Service (Eligible)", delivery: "1-48 Hours", price: "$3.35" },
      { id: "uk-ee-clean-service", name: "UK EE/T Mobile/Orange iPhone/iPad/Generic All Models Clean Service", delivery: "1-72 Hours", price: "$8.00" },
      { id: "uk-vodafone-generic-fast", name: "UK VODAFONE ALL GENERIC CODE [iPhone Not Supported] FAST SERVICE", delivery: "1-48 Hours", price: "$2.80" },
      { id: "uk-ee-xr-15-premium", name: "UK EE/TMobile/Orange iPhone XR TO 15 SERIES Clean/Blacklist/Block Full Premium", delivery: "1-72 Hours", price: "$5.55" },
      { id: "uk-ee-generic-code", name: "UK EE/T-Mobile/Orange UK Generic Code (Samsung, Nokia, Huawei, Google Pixel)", delivery: "1-72 Hours", price: "$2.75" },
    ],
  },
  {
    id: "uk-o2-tesco-unlock",
    category: "UK O2 / TESCO UNLOCK SERVICES",
    items: [
      { id: "uk-o2-generic-express", name: "UK O2 Generic Service [iPhone Not Supported] 1-3 Days Express Service", delivery: "1-72 Hours", price: "$4.00" },
      { id: "uk-o2-tesco-fast", name: "UK O2 Tesco - iPhone/iPad All Models Fast Service", delivery: "1-10 days", price: "$4.40" },
    ],
  },
  {
    id: "uk-vodafone-unlock-service",
    category: "UK Vodafone Unlocking Service",
    items: [
      { id: "uk-vodafone-clean-100success", name: "UK Vodafone iPhone All Models Clean IMEI Only ✅ 100% SUCCESS RATE", delivery: "1-6 days", price: "$13.34" },
      { id: "uk-vodafone-generic-clean-superfast", name: "Uk Vodafone Generic All Models Clean IMEI Only SUPER FAST SERVICE", delivery: "24-72 Hours", price: "$6.05" },
    ],
  },
  {
    id: "us-reseller-flex-unlock",
    category: "US RESELLER FLEX POLICY",
    items: [
      { id: "us-flex-12-16-emergency", name: "US Reseller Flex Policy Unlock 12/13/14/15/16 series 99% RATIO Emergency Service", delivery: "24-72 Hours", price: "$28.50" },
      { id: "us-flex-15pm-clean", name: "US Reseller Flex Policy - All iPhones Till 15 Pro Max [Clean 100% Success]", delivery: "1-72 Hours", price: "$115.00" },
    ],
  },
  {
    id: "att-usa-clean-unlock",
    category: "USA AT&T iPhone & GENERIC CLEAN SERVICE",
    items: [
      { id: "att-usa-12-exclusive", name: "USA AT&T iPhone Till 12 Series Exclusive Service", delivery: "1-7 days", price: "$40.00" },
      { id: "att-usa-clean-check", name: "AT&T USA ➢ iPhone Clean Unlock All Models + Check Status", delivery: "1-24 Hours", price: "$0.64" },
      { id: "att-usa-active-line-issue", name: "AT&T USA ATT - iPhone All Model (Active Line / Active On Another AT&T Account / IMEI Issue)", delivery: "1-4 days", price: "$5.68" },
      { id: "att-usa-clean-support", name: "At&t USA ATT - iPhone & Generic (All Model Support) Clean Service", delivery: "1-24 Hours", price: "$0.59" },
    ],
  },
  {
    id: "cricket-usa-unlock",
    category: "USA CRICKET SERVICE",
    items: [
      { id: "cricket-usa-generic-6month", name: "Cricket USA - Generic (6+ Month Old Clean Unlock Service)", delivery: "1-5 days", price: "$10.50" },
      { id: "cricket-usa-iphone-6month", name: "Cricket USA - iPhone All Models (6+ Month Old Clean Unlock Service)", delivery: "1-4 days", price: "$10.50" },
    ],
  },
  {
    id: "usa-iphone-premium",
    category: "USA iPHONE SERVICES",
    items: [
      { id: "tmo-usa-express-clean", name: "T-Mobile USA - iPhone All Models (Express Service) (Clean & Financed)", delivery: "1-72 Hours", price: "$205.00" },
      { id: "att-usa-active-issue", name: "AT&T USA - iPhone All Models (Active Line, Active Other, IMEI Issue)", delivery: "1-4 days", price: "$10.00" },
      { id: "verizon-usa-13pm-premium", name: "Verizon USA - iPhone 5s to 13 Pro Max (Premium Unlock Service)", delivery: "1-4 days", price: "$8.00" },
      { id: "att-usa-finance-blacklist", name: "AT&T USA: Finance/Contract/Blacklist Check + Unlock (iPhone & Generic) - Express", delivery: "1-24 Hours", price: "$3.50" },
      { id: "tmo-usa-14-express", name: "T-Mobile USA - iPhone 14 Series (Express Service) (Clean & Financed)", delivery: "48-72 Hours", price: "$290.00" },
      { id: "usa-tracfone-clean-unpaid", name: "USA Tracfone/StraightTalk - All iPhone Clean/Unpaid (01 Year Activated)", delivery: "1-10 days", price: "$23.00" },
      { id: "us-flex-se2-14-premium", name: "US Reseller Flex Policy SE2/SE3/12/13/14 Series / Premium Unlock Service)", delivery: "1-3 days", price: "$45.00" },
    ],
  },
  {
    id: "usa-network-android",
    category: "USA NETWORK SERVICES",
    items: [
      { id: "metro-usa-android-unlock", name: "MetroPCS USA - Mobile Device Unlock App (Android Official Unlock) (6+ Month Old)", delivery: "1-72 Hours", price: "$5.00" },
      { id: "att-usa-gophone-active", name: "AT&T USA - Generic (Active Line, GoPhone, Active Other, IMEI Issue)", delivery: "1-5 days", price: "$8.20" },
      { id: "metro-usa-generic-promo", name: "USA Metro PCS Generic Unlock Code Service /PROMO ON", delivery: "1-72 Hours", price: "$5.00" },
    ],
  },
  {
    id: "usa-samsung-activ",
    category: "USA SAMSUNG SERVICES",
    items: [
      { id: "sam-usa-s10-older", name: "Samsung USA - S10, N10 and Older Models (AT&T, Spectrum, Cricket, Xfinity)", delivery: "1-5 days", price: "$29.50" },
      { id: "sam-usa-a-series", name: "Samsung USA - A Series (AT&T, Spectrum, Cricket, Xfinity)", delivery: "1-5 days", price: "$31.50" },
      { id: "sam-usa-s20-zflip", name: "Samsung USA - S20 Series, Z-Flip (AT&T, Spectrum, Cricket, Xfinity)", delivery: "1-5 days", price: "$31.50" },
      { id: "sam-usa-s21-zfold3", name: "Samsung USA - S21 Series, Z-Fold 3, Z-Flip 3 (AT&T, Spectrum, Cricket, Xfinity)", delivery: "1-4 days", price: "$31.50" },
      { id: "sam-usa-s22-zfold4-codes", name: "Samsung USA: All Level Unlock Codes S22/S23 Series/Z Fold 3/4/Z Flip 3/4 Series", delivery: "1-4 days", price: "$87.00" },
    ],
  },
  {
    id: "xiaomi-mi-official",
    category: "XIAOMI MI ACCOUNT LOCK REMOVE OFFICIAL ✅",
    items: [
      { id: "xiaomi-pakistan-clean", name: "Xiaomi Mi Account Lock Remove (+92 Pakistan) Clean Only", delivery: "1-60 Minutes", price: "$2.43" },
      { id: "xiaomi-malaysia-clean", name: "Xiaomi Mi Account Remove-Malaysia (Clean Device Only)", delivery: "1-72 Hours", price: "$19.20" },
      { id: "xiaomi-ww-clean", name: "Xiaomi Mi Account Lock Remove (Worldwide, China Not Support) Clean Device ✅", delivery: "1-24 Hours", price: "$27.30" },
      { id: "xiaomi-asia-official", name: "Xiaomi Mi Account Removal Official (Bangladesh, India, Nepal, Bhutan, Sri Lanka)", delivery: "1-48 Hours", price: "$29.40" },
      { id: "xiaomi-turkey-clean", name: "Xiaomi Mi Account Lock Remove (Turkey) Clean Only", delivery: "1-48 Hours", price: "$17.50" },
      { id: "xiaomi-indonesia-clean", name: "Xiaomi Mi Account Lock Remove (Indonesia) Clean Device Only", delivery: "1-24 Hours", price: "$8.50" },
      { id: "xiaomi-eu-api", name: "Xiaomi Mi Account Remove [Europe - AUTO API 24/7]", delivery: "1-3 Hours", price: "$16.30" },
      { id: "xiaomi-ksa-clean", name: "Xiaomi Mi Account Lock Remove (Saudi Arabia KSA) Clean Device", delivery: "1-3 Hours", price: "$9.55" },
      { id: "xiaomi-india-clean", name: "Xiaomi Mi Account Lock Remove (INDIA) Clean Device Only", delivery: "1-48 Hours", price: "$29.00" },
      { id: "xiaomi-brazil-clean", name: "Xiaomi Mi Account Lock Remove (Brazil) Clean Device Only 100% Success ✅", delivery: "1-24 Hours", price: "$24.00" },
    ],
  },
  {
    id: "xiaomi-redmi-sim",
    category: "Xiaomi Redmi Sim Unlock Service",
    items: [
      { id: "xiaomi-sim-nck-service", name: "Xiaomi Redmi Sim Network Unlock Code Service", delivery: "1-48 Hours", price: "$14.50" },
    ],
  },
  {
    id: "xiaomi-imei-checker",
    category: "XIAOMI-MI-IMEI & LOCK CODE CHECKER",
    items: [
      { id: "xiaomi-full-info-imei", name: "XIAOMI CHECK FULL INFO SALE/ACTIVATION/USED REGION STATUS - IMEI", delivery: "1-5 Minutes", price: "$0.25" },
      { id: "xiaomi-sold-info-imei-s1", name: "Xiaomi Check information Sold By IMEI", delivery: "1-5 Minutes", price: "$0.175" },
      { id: "xiaomi-sold-info-imei-s2", name: "Xiaomi Check information Sold By IMEI Server 2", delivery: "1-5 Minutes", price: "$0.30" },
    ],
  },
  {
    id: "zte-network-nck-unlock",
    category: "ZTE Network Service",
    items: [
      { id: "zte-ww-nck-code", name: "ZTE Unlock Worldwide NCK Code Only", delivery: "5-15 days", price: "$20.50" },
    ],
  },
  {
    id: "claro-network-unlock",
    category: "CLARO - Network Unlock",
    items: [
      { id: "claro-4-xsmax", name: "Claro All Country iPhone 4 to XS MAX", delivery: "1-9 days", price: "$15.00" },
      { id: "claro-11-series", name: "Claro All Country iPhone 11 Series", delivery: "1-9 days", price: "$26.00" },
      { id: "claro-12-series", name: "Claro All Country iPhone 12/12 Pro Max", delivery: "1-9 days", price: "$31.00" },
      { id: "claro-13-series", name: "Claro All Country iPhone 13 Series", delivery: "1-9 days", price: "$36.00" },
      { id: "claro-15-series", name: "Claro All Countries iPhone 15 Series", delivery: "1-9 days", price: "$64.00" },
      { id: "claro-16-series", name: "Claro All Country iPhone 16 Series", delivery: "1-9 days", price: "$99.00" },
    ],
  },
];

export default function ResellerPricingIMEI() {
  const [search, setSearch] = useState("");
  const [openGroups, setOpenGroups] = useState({});
  const [showHotOnly, setShowHotOnly] = useState(false);

  const toggle = (cat) =>
    setOpenGroups((prev) => ({ ...prev, [cat]: !prev[cat] }));

  const filtered = pricingData.filter((group) => {
    if (showHotOnly && !group.hot) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      group.category.toLowerCase().includes(q) ||
      group.items.some((i) => i.name.toLowerCase().includes(q))
    );
  });

  return (
    <div style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif", background: "#050505", minHeight: "100vh", color: "#e0e0e0" }}>
      {/* Dynamic Route/Cyber Header */}
      <div style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
        borderBottom: "1px solid #1a1a1a",
        padding: "40px 24px 30px",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ 
              width: 10, height: 10, borderRadius: "50%", background: "#00ff66", 
              boxShadow: "0 0 10px #00ff66", animation: "pulse 2s infinite" 
            }} />
            <span style={{ color: "#666", fontSize: 11, letterSpacing: 3, fontWeight: 600 }}>
              TERMINAL SECURE ACCESS
            </span>
          </div>
          <h1 style={{
            margin: "0 0 8px",
            fontSize: 32,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.03em",
          }}>
            IMEI <span style={{ color: "#00ff66" }}>Services</span>
          </h1>
          <p style={{ margin: 0, color: "#888", fontSize: 14, fontWeight: 400 }}>
            Managed Pricing API • Secure Distributor Console
          </p>
        </div>
      </div>

      {/* Control Module */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(5, 5, 5, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1a1a1a",
        padding: "16px 24px",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <input
              type="text"
              placeholder="FILTER_DATABASE_SCAN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                background: "#0a0a0a",
                border: "1px solid #1a1a1a",
                borderRadius: 4,
                padding: "10px 16px",
                color: "#00ff66",
                fontSize: 13,
                outline: "none",
                fontFamily: "'JetBrains Mono', monospace",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.target.style.borderColor = "#00ff66"}
              onBlur={(e) => e.target.style.borderColor = "#1a1a1a"}
            />
          </div>
          <button
            onClick={() => setShowHotOnly(!showHotOnly)}
            style={{
              background: showHotOnly ? "#00ff66" : "transparent",
              border: `1px solid ${showHotOnly ? "#00ff66" : "#333"}`,
              borderRadius: 4,
              padding: "10px 20px",
              color: showHotOnly ? "#000" : "#888",
              fontSize: 11,
              cursor: "pointer",
              fontWeight: 700,
              letterSpacing: 2,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            🔥 URGENT_PRIORITY
          </button>
        </div>
      </div>

      {/* Dynamic Data Module */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "30px 24px 80px" }}>
        {filtered.map((group) => {
          const isOpen = openGroups[group.id] !== false;
          return (
            <div
              key={group.id}
              id={group.id}
              style={{
                marginBottom: 12,
                border: "1px solid #111",
                borderRadius: 4,
                overflow: "hidden",
                background: "#080808",
              }}
            >
              {/* Category Header */}
              <button
                onClick={() => toggle(group.id)}
                style={{
                  width: "100%",
                  background: isOpen ? "#0c0c0c" : "#080808",
                  border: "none",
                  borderBottom: isOpen ? "1px solid #1a1a1a" : "none",
                  padding: "16px 20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "left",
                  transition: "background 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {group.hot && (
                    <span style={{
                      background: "#00ff66",
                      color: "#000",
                      fontSize: 10,
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: 2,
                      boxShadow: "0 0 10px rgba(0, 255, 102, 0.4)",
                    }}>HOT</span>
                  )}
                  <span style={{ color: "#fff", fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>
                    {group.category}
                  </span>
                </div>
                <span style={{ color: "#00ff66", fontSize: 18, fontFamily: "monospace" }}>
                  {isOpen ? "[−]" : "[+]"}
                </span>
              </button>

              {/* Items Table */}
              {isOpen && (
                <div style={{ background: "#050505" }}>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 130px 100px",
                    padding: "10px 20px",
                    background: "#0a0a0a",
                    borderBottom: "1px solid #1a1a1a",
                  }}>
                    <span style={{ color: "#444", fontSize: 10, fontWeight: 700, letterSpacing: 1.5 }}>SERVICE_ID</span>
                    <span style={{ color: "#444", fontSize: 10, fontWeight: 700, letterSpacing: 1.5 }}>LATENCY</span>
                    <span style={{ color: "#444", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textAlign: "right" }}>COST_USD</span>
                  </div>
                  {group.items.map((item, i) => (
                    <div
                      key={item.id}
                      id={item.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 130px 100px",
                        padding: "14px 20px",
                        borderBottom: i < group.items.length - 1 ? "1px solid #111" : "none",
                        alignItems: "center",
                        transition: "all 0.1s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#0d0d0d";
                        e.currentTarget.style.borderLeft = "2px solid #00ff66";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderLeft = "none";
                      }}
                    >
                      <span style={{ color: "#bbb", fontSize: 13, lineHeight: 1.6, paddingRight: 20 }}>
                        {item.name}
                      </span>
                      <span style={{ color: "#666", fontSize: 12, fontWeight: 500 }}>
                        {item.delivery}
                      </span>
                      <span style={{
                        color: item.price === "$0.00" ? "#333" : "#00ff66",
                        fontSize: 14,
                        fontWeight: 700,
                        textAlign: "right",
                        fontFamily: "'JetBrains Mono', monospace"
                      }}>
                        {item.price === "$0.00" ? "FREE" : item.price}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
