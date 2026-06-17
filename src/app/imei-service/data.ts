export interface PricingItem {
  id: string;
  name: string;
  delivery: string;
  price: string;
  description: string;
}

export interface PricingGroup {
  id: string;
  category: string;
  hot?: boolean;
  items: PricingItem[];
}

export const pricingData: PricingGroup[] = [
  {
    id: "samsung-frp-lvl5",
    category: "SAMSUNG ANDROID 15/16/17 FRP Work ID Level-5",
    hot: true,
    items: [
      { id: "sam-frp-vip", name: "SAMSUNG FRP ALL MODEL - Work id 24/7 - WW LEVEL 5 (VIP Series) - [ANDROID 15/16/17 INSTANT] - Series S & Z Fold & Flip ✅", delivery: "1-30 Minutes", price: "$80.10", description: "<b style='color: #10b981;'>VIP PREMIUM:</b> Instant bypass for flagship <b>S & Z Series</b>. <br/>Supports Android 15/16/17 via Work ID." },
      { id: "sam-frp-amf", name: "SAMSUNG FRP ALL MODEL - Work id 24/7 - WW LEVEL 5 - [ANDROID 15/16/17 INSTANT] - [Series A & M & F] ✅", delivery: "1-30 Minutes", price: "$54.10", description: "Standard FRP bypass for <b>A, M, and F series</b>. <br/><span style='color: #3b82f6;'>Reliable 24/7 Server Access.</span>" },
      { id: "sam-frp-imei", name: "SAMSUNG FRP RESET BY IMEI WORLDWIDE LEVEL 5 - ANDROID 15/16/17 (A Series & M & F Cheap Models Supported)", delivery: "1-30 Minutes", price: "$39.00", description: "<b style='text-decoration: underline;'>IMEI-Based Reset:</b> Optimized for budget models. <br/>No tools required, processed via IMEI." },
    ],
  },
  {
    id: "remote-unlock",
    category: "REMOTE SERVICE FRP/PIN/DEMO UNLOCK",
    items: [
      { id: "vivo-iqoo-auth", name: "VIVO / IQOO WORLDWIDE AUTH - QLC / MTK / SPD DEVICE SUPPORT - PIN / PATTERN / FRP / DEMO UNLOCK", delivery: "Minutes", price: "$26.50", description: "<b>Remote Auth Unlock:</b> Supports QLC/MTK/SPD. <br/><span style='color: #10b981;'>Removes PIN, Pattern, FRP, and Demo mode.</span>" },
    ],
  },
  {
    id: "samsung-api-premium",
    category: "SAMSUNG FRP REMOVAL PREMIUM DIRECT API SERVICE",
    items: [
      { id: "sam-ww-br-kr", name: "SAMSUNG [Worldwide & Brazil & Korea] FRP Remove By IMEI /Auto Api (Work ID Level -1) ✅ (Android 12-14 Only Supported)", delivery: "1-10 Minutes", price: "$0.00", description: "<b>Automated API:</b> Region-specific (BR/KR). <br/>Supports Android 12-14 only. <i style='color: #ef4444;'>Level-1 Work ID.</i>" },
      { id: "sam-ww-vip-api", name: "SAMSUNG FRP WORLDWIDE [Android 12-14] Auto Api Instant Level-VIP ✅ Limited Time Offer", delivery: "1-10 Minutes", price: "$0.00", description: "<span style='background: #10b981; color: white; padding: 2px 5px; border-radius: 4px;'>VIP INSTANT</span><br/>Worldwide API removal for Android 12-14." },
    ],
  },
  {
    id: "sam-usb-remotely",
    category: "Samsung Frp Remotely USB Service",
    items: [
      { id: "sam-usb-server-1", name: "Samsung FRP REMOVE VIA USB Online – All Models (Android 16 Only Supported) Server#1", delivery: "1-15 Minutes", price: "$4.00", description: "Remote USB Service for <b>Android 16</b>. <br/>Requires stable PC and USB cable connection." },
    ],
  },
  {
    id: "hfz-activator-a5-a6",
    category: "HFZ Activator A5/A6 hello untethered bypass",
    items: [
      { id: "hfz-a5-a6-chip", name: "HFZ bypass A5 chip • iPhone 4S • iPod touch (5th gen) • iPad 2 • iPad mini (1st gen) • iPad (3rd gen) A6 chip • iPhone 5 • iPhone 5c • iPad (4th gen)", delivery: "Minutes", price: "$3.05", description: "<b>Legacy Bypass:</b> Untethered solution for A5/A6 chips. <br/>Ideal for iPhone 4S, 5, 5C and early iPads." },
    ],
  },
  {
    id: "frpfile-a12-no-signal",
    category: "FRPFILE ACTIVATOR A12+ Bypass No Signal",
    items: [
      { id: "frpfile-xr-17pm", name: "FRPFILE ACTIVATOR A12+ Bypass Hello Screen iPhone XR to 17 Pro Max - iPad A12+ To M3 - No Notification, iCloud Service (Windows Tool) ✅", delivery: "Instant", price: "$3.50", description: "<b>Windows Tool:</b> Bypass XR to 17 Pro Max. <br/><b style='color: #ef4444;'>No Notifications/Signal.</b> iCloud login supported." },
      { id: "frpfile-11-16pm", name: "FRPFILE ACTIVATOR A12+ Bypass Hello Screen iPhone 11 to 16 Pro Max - iPad A12+ To M3 (iOS 17.0 to iOS 26.1) With iCloud Service, Notification (Windows Tool) ✅", delivery: "Instant", price: "$6.00", description: "<b style='color: #10b981;'>Full Bypass:</b> 11 to 16 Pro Max. <br/>Includes <b>Notifications & iCloud</b>. iOS 17-26.1." },
    ],
  },
  {
    id: "a12-bypass-tools",
    category: "A12+ BYPASS No Signal All Tools [No Refund For Any Reason]",
    items: [
      { id: "iremoval-pro-a12", name: "iRemoval Pro A12+ ALL Model iPhone & iPad iOS 18.6 - 18.7 - 26 - 26.1 [DO NOT ORDER FOR CH/A]", delivery: "Instant", price: "$10.00", description: "<b>iRemoval Pro:</b> Supports iOS 18.6+. <br/><span style='color: #ef4444;'>No China (CH/A) support. No Refunds.</span>" },
      { id: "iremove-mac-a12", name: "iRemove A12+ Mac Tool [iPhone & iPad All Model] CH/CHINA Supported", delivery: "Instant", price: "$8.90", description: "<b>Mac Exclusive:</b> Premium tool for A12+ devices. <br/><b style='color: #10b981;'>CH/CHINA Models Supported.</b>" },
      { id: "hfz-a12-win", name: "HFZ Activator A12+ Premium Windows Tool BYPASS NO SIGNAL (A12 All Models) ✅", delivery: "Minutes", price: "$6.70", description: "<b>HFZ Premium:</b> Stable Windows tool for A12 models. <br/>Efficient and fast bypass performance." },
      { id: "ihello-hfz-a12", name: "iHello HFZ AiO Premium Bypass A12 (All Models) CH/CHINA Supported (Mac/Windows Tool)", delivery: "1-5 Minutes", price: "$5.53", description: "<b>All-in-One:</b> Cross-platform (Win/Mac). <br/>Supports China devices. High success rate." },
    ],
  },
  {
    id: "iapro-a12-activator",
    category: "iAPro A12+ Activator Premium Windows Tool Bypass 2025",
    items: [
      { id: "iapro-v19-win", name: "iAPro A12+ Activator V1.9 Windows Tool BYPASS NO SIGNAL 18.6-26.1 iOS Supported", delivery: "Minutes", price: "$3.50", description: "<b>v1.9 Activator:</b> Optimized for 2025. <br/>Supports latest iOS versions up to 26.1." },
    ],
  },
  {
    id: "lu-a12-bypass",
    category: "LU A12+ Bypass",
    items: [
      { id: "lu-wifi-a12", name: "LU-WIFI A12+ iPhone XR To 16 Pro Max - iPads (IOS 18.7-26.xx) Windows Tool No Refund China Device", delivery: "Minutes", price: "$4.30", description: "<b>LU WiFi Tool:</b> Targeted at 18.7-26.xx. <br/><b style='color: #ef4444;'>No Refund Policy for China Devices.</b>" },
    ],
  },
  {
    id: "lu-a5-bypass",
    category: "LU - A5 Bypass",
    items: [
      { id: "lu-a5-no-arduino", name: "LU - A5 Bypass Tool A5X Devices Only No Arduino ✅", delivery: "Minutes", price: "$2.80", description: "<b>Specialized LU:</b> A5X Bypass. <br/><span style='color: #3b82f6;'>No Arduino hardware required.</span>" },
    ],
  },
  {
    id: "iapro-a5-bypass",
    category: "iAPro A5 Bypass Windows Tool 2025",
    items: [
      { id: "iapro-a5-all", name: "iAPro A5 Bypass (4, 4S, Touch 5, Mini 1, iPad 2, 3) Windows Tool", delivery: "Instant", price: "$0.95", description: "<b>iAPro Budget:</b> Bypass for legacy iPad/iPhone. <br/>Instant Windows tool activation." },
    ],
  },
  {
    id: "tmobile-usa-promo",
    category: "T-Mobile USA Premium (Promotional Offer)",
    hot: true,
    items: [
      { id: "tmo-sprint-unlocked", name: "T-Mobile / Sprint - All Models iP 5S TO 17 Pro Max - Unlocked Instant To 24 Hours Full Premium 100% success ✅", delivery: "1-24 Hours", price: "$89.10", description: "<b style='color: #10b981;'>100% SUCCESS:</b> Full premium network unlock. <br/>Supports iPhone 5S up to 17 Pro Max." },
    ],
  },
  {
    id: "icloud-fmi-off",
    category: "iCloud FMI OFF OPEN MENU ⛑️",
    items: [
      { id: "frpfile-fmi-iphone", name: "FRPFILE Open Menu iCloud Remove for iPhone, iPad FMI AUTO TOOL", delivery: "Instant", price: "$3.00", description: "<b>Open Menu Only:</b> Official FMI OFF via Auto Tool. <br/>Fast and automated processing." },
      { id: "frpfile-fmi-mac", name: "FRPFILE Open Menu iCloud Remove for MacBook", delivery: "Instant", price: "$6.00", description: "<b>MacBook FMI:</b> Removes iCloud from open menu Macs. <br/>Instant and reliable." },
      { id: "fmi-off-no-pc", name: "FMI OFF Open Menu (Without PC - Without Tool) - iPhone / iPad", delivery: "Minutes", price: "$3.00", description: "<b>PC-Free Method:</b> No software needed. <br/><span style='color: #3b82f6;'>Manual processing for open menu devices.</span>" },
    ],
  },
  {
    id: "mdm-tecno-infinix",
    category: "MDM/ID REMOVE TECNO INFINIX ALL MODEL SUPPORT",
    items: [
      { id: "tecno-infinix-id", name: "Tecno ID & Infinix ID Removal - Cloud ID Officially OFF All MODEL SUPPORTED Auto Api [Monday To Friday]", delivery: "24-72 Hours", price: "$9.00", description: "<b>Official Cloud ID OFF:</b> Direct API removal. <br/>Available Monday to Friday." },
      { id: "mdm-tecno-itel", name: "MDM Lock Removal & IMEI Unlock for Tecno, iTel & Infinix (1–3 Working Days) 100% ✅", delivery: "1-72 Hours", price: "$15.00", description: "<b>100% Verified MDM Unlock:</b> Removal for all Tecno, iTel, and Infinix models." },
      { id: "tecno-inf-mdm-perm", name: "Tecno - Infinix - Itel MDM Remove Permanently (Monday To Friday) Full Premium Pro [Level 3] ⭐⭐⭐", delivery: "1-48 Hours", price: "$19.70", description: "<b>Permanent [Level 3]:</b> Full premium MDM removal. <br/>Does not relock after factory reset." },
    ],
  },
  {
    id: "tecno-info-check",
    category: "TECNO | INFINIX FULL INFO CHECK",
    items: [
      { id: "itel-tecno-inf-sales", name: "ITEL | TECNO | INFINIX | SALES COUNTRY | FULL INFO CHECK", delivery: "Instant", price: "$0.045", description: "<b>Full Info Check:</b> Provides sales country, model, and activation status." },
    ],
  },
  {
    id: "frpfile-screen-time",
    category: "FRPFILE Remove Screen Time & Bypass iCloud Open Menu",
    items: [
      { id: "ipad-a12-a15", name: "iPad CPU A12-A15", delivery: "Instant", price: "$22.00", description: "<b>Screen Time Bypass:</b> A12-A15 CPU iPads. <br/>Retains all user data." },
      { id: "iphone-17-series", name: "iPhone 17/17 AIR/17 PRO/17 PRO MAX", delivery: "Instant", price: "$35.00", description: "<b>Newest Models:</b> Screen Time removal for iPhone 17 line. <br/><span style='color: #10b981;'>Premium API.</span>" },
      { id: "ipad-m1-m4", name: "iPad CPU M1 to M4", delivery: "Instant", price: "$28.00", description: "<b>M-Series iPads:</b> Screen Time bypass for M1, M2, M3, M4." },
      { id: "iphone-se2-se3", name: "iPhone SE2/SE3", delivery: "Instant", price: "$13.00", description: "Screen Time bypass for budget iPhone models." },
      { id: "iphone-16-series", name: "iPhone 16/16e/16 PRO/16 PRO MAX", delivery: "Instant", price: "$27.00", description: "Full Screen Time support for the iPhone 16 series." },
      { id: "iphone-xr-xs", name: "iPhone XR/XS/XS Max", delivery: "Instant", price: "$14.00", description: "Instant Screen Time removal for XR/XS series." },
      { id: "iphone-11-series", name: "iPhone 11/11 PRO/11 PRO MAX", delivery: "Instant", price: "$18.00", description: "Instant Screen Time removal for 11 series." },
      { id: "iphone-12-series", name: "iPhone 12/12 MINI/12 PRO/12 PRO MAX", delivery: "Instant", price: "$19.00", description: "Instant Screen Time removal for 12 series." },
      { id: "iphone-13-series", name: "iPhone 13/13 MINI/13 PRO/13 PRO MAX", delivery: "Instant", price: "$19.00", description: "Instant Screen Time removal for 13 series." },
      { id: "iphone-14-series", name: "iPhone 14/14 PLUS/14 PRO/14 PRO MAX", delivery: "Instant", price: "$28.00", description: "Instant Screen Time removal for 14 series." },
      { id: "iphone-15-series", name: "iPhone 15/15 PLUS/15 PRO/15 PLUS MAX", delivery: "Instant", price: "$27.00", description: "Instant Screen Time removal for 15 series." },
    ],
  },
  {
    id: "frpfile-official",
    category: "FRPFILE TOOL SERVICE (Official Distributor)",
    items: [
      { id: "frpfile-ramdisk-hello", name: "FRPFILE RAMDISK Bypass Hello Screen/Broken Baseband iOS 14/15/16 without Jailbreak [AUTO API]", delivery: "Instant", price: "$3.00", description: "<b>Ramdisk Hello:</b> iOS 14-16 support. <br/><span style='color: #ef4444;'>No Signal/Broken Baseband supported.</span>" },
      { id: "frpfile-premium-api", name: "FRPFILE Premium Tool Bypass iCloud, Passcode Disable, Baseband Broken, MDM [AUTO API]", delivery: "Instant", price: "$2.00", description: "<b>Multi-Tool API:</b> Passcode, MDM, and iCloud. <br/>Official FRPFILE global server." },
      { id: "frpfile-ramdisk-pass", name: "FRPFILE RAMDISK Bypass Passcode/Disable iOS 14/15.7/16 without Jailbreak [AUTO API]", delivery: "Instant", price: "$3.00", description: "<b>Passcode/Disable:</b> iOS 14-16. No Jailbreak needed. <br/>Instant Auto API processing." },
      { id: "frpfile-wifi-untethered", name: "FRPFILE WIFI TOOL Untethered Bypass Hello Screen iPhone-iPad iOS 15-17 with Notification", delivery: "Instant", price: "$3.00", description: "<b>WiFi Bypass:</b> Hello Screen + Notifications. <br/>Supports iOS 15 through 17." },
      { id: "frpfile-6s-x-no-signal", name: "FRPFILE iPad - iPhone 6S To X Bypass Hello Screen iOS 15–16 no Signal", delivery: "Instant", price: "$3.00", description: "Hello screen bypass for older iOS 15-16 devices." },
      { id: "frpfile-t2-mac", name: "FRPFILE T2 iCloud Bypass for MacOS Devices T2 - FULL Untethered iBridgeOS 9.x", delivery: "Instant", price: "$15.00", description: "<b>Mac T2 Bypass:</b> Full untethered solution for MacOS T2 chips." },
      { id: "frpfile-mdm-all", name: "FRPFILE MDM Bypass Tool support All iPhone, iPad, All iOS version", delivery: "Instant", price: "$2.00", description: "<b>Universal MDM:</b> Supports all iOS versions and Apple mobile devices." },
      { id: "frpfile-win-t2", name: "Windows Tool FRPFILE T2 & Apple Configurator iCloud Bypass for MacOS Devices", delivery: "Instant", price: "$15.00", description: "Windows-based tool for Mac T2 iCloud bypass." },
    ],
  },
  {
    id: "iapro-bypass-2025",
    category: "iAPRO BYPASS 2025 ✅",
    items: [
      { id: "iapro-wifi-a9-a11", name: "iAPro WIFI Bypass Hello Screen No Signal Without SN Change A9-A11 Windows TOOL", delivery: "Instant", price: "$1.10", description: "<b>No SN Change:</b> WiFi Hello bypass for A9-A11 chips. Windows based." },
      { id: "iapro-t2-mac-2025", name: "iAPro T2 MAC Tool Untethered iCloud Bypass 2025 for MacOS Devices BridgeOS 9.X", delivery: "Instant", price: "$6.50", description: "<b>Mac 2025:</b> T2 iCloud bypass for iBridgeOS 9.X. Untethered." },
      { id: "iapro-mac-mdm", name: "iAPro MAC Permanent MDM Removal Tool", delivery: "Instant", price: "$1.00", description: "<b>Permanent Mac MDM:</b> Removal via official tool. Budget friendly." },
    ],
  },
  {
    id: "mina-a12-rebypass",
    category: "MIna Tool A12+ Rebypass",
    items: [
      { id: "mina-win-mac-a12", name: "Mina Windows/Mac Tool A12+ iPhone iPad Rebypass Old Registered Device [Bypass Again]", delivery: "Instant", price: "$10.00", description: "<b>Re-Bypass:</b> For previously registered devices on Mina servers." },
    ],
  },
  {
    id: "esim-qpe",
    category: "E-SIM CODE [QPE METHOD]",
    items: [
      { id: "esim-code-qpe", name: "E-SIM Code - [QPE Method] - [Esim code]", delivery: "1-30 Minutes", price: "$2.85", description: "<b>QPE Method:</b> E-SIM activation code for network unlocking." },
    ],
  },
  {
    id: "lpro-max-5s-x",
    category: "LPro Max 5S To X Bypass (Windows & Mac Tool) ✅",
    items: [
      { id: "lpro-5s", name: "LPro Max Hello Bypass with Signal iPhone 5S", delivery: "1-5 Minutes", price: "$7.00", description: "<b style='color: #10b981;'>WITH SIGNAL:</b> Full Hello Screen bypass for iPhone 5S." },
      { id: "lpro-6", name: "LPro Max Hello Bypass with Signal iPhone 6/6Plus", delivery: "1-5 Minutes", price: "$13.00", description: "Full bypass with signal for iPhone 6 series." },
      { id: "lpro-6s", name: "LPro Max Hello Bypass with Signal iPhone 6s/6s Plus", delivery: "1-5 Minutes", price: "$16.00", description: "Full bypass with signal for iPhone 6s series." },
      { id: "lpro-7", name: "LPro Max Hello Bypass with Signal iPhone 7/7 Plus", delivery: "1-5 Minutes", price: "$22.50", description: "Full bypass with signal for iPhone 7 series." },
      { id: "lpro-8", name: "LPro Max Hello Bypass with Signal iPhone 8/8 Plus", delivery: "1-5 Minutes", price: "$28.50", description: "Full bypass with signal for iPhone 8 series." },
      { id: "lpro-x", name: "LPro Max Hello Bypass with Signal iPhone X", delivery: "1-5 Minutes", price: "$34.00", description: "Full bypass with signal for iPhone X." },
      { id: "lpro-ipad-2017", name: "LPro Max Hello Bypass iPads Till 2017", delivery: "1-5 Minutes", price: "$19.00", description: "Hello Screen bypass for iPads manufactured up to 2017." },
      { id: "lpro-ipad-after-2017", name: "LPro Max Hello Bypass iPad After 2017", delivery: "1-5 Minutes", price: "$25.00", description: "Hello Screen bypass for newer iPad models." },
    ],
  },
  {
    id: "iremove-win-mac",
    category: "IREMOVE TOOL [WINDOWS+MAC TOOL]",
    items: [
      { id: "iremove-5s", name: "iRemove iCloud Bypass - iPhone 5S (iOS 12, With Network)", delivery: "1-5 Minutes", price: "$4.60", description: "<b>iRemove Premium:</b> iOS 12 bypass with network support for 5S." },
      { id: "iremove-6", name: "iRemove iCloud Bypass - iPhone 6/6 Plus (iOS 12, With Network)", delivery: "1-5 Minutes", price: "$9.50", description: "Full network bypass for the iPhone 6 series." },
      { id: "iremove-6s", name: "iRemove iCloud Bypass - iPhone 6S/6S Plus/SE (iOS 15/16, With Network)", delivery: "1-5 Minutes", price: "$13.10", description: "Modern iOS (15/16) network bypass for 6S/SE." },
      { id: "iremove-7", name: "iRemove iCloud Bypass - iPhone 7/7 Plus (iOS 15/16, With Network)", delivery: "1-5 Minutes", price: "$20.90", description: "Modern iOS (15/16) network bypass for 7 series." },
      { id: "iremove-8", name: "iRemove iCloud Bypass - iPhone 8/8 Plus (iOS 15/16/17, With Network)", delivery: "1-5 Minutes", price: "$33.00", description: "Supports newest iOS 17 with network for 8 series." },
      { id: "iremove-x", name: "iRemove iCloud Bypass - iPhone X (iOS 15/16/17, With Network)", delivery: "1-5 Minutes", price: "$43.00", description: "Premium network bypass for iPhone X up to iOS 17." },
      { id: "iremove-ipad-2017", name: "iRemove iCloud Bypass - iPad till 2017 Cellular [WITH SIGNAL]", delivery: "1-5 Minutes", price: "$25.00", description: "Cellular iPad bypass with full signal support." },
    ],
  },
  {
    id: "honor-frp-unlock",
    category: "HONOR FRP UNLOCK KEY ⚡",
    items: [
      { id: "honor-frp-imei", name: "Honor FRP Reset Key By IMEI/SN - INSTANT - 24/7 Auto Api", delivery: "1-60 Minutes", price: "$48.45", description: "<b style='color: #10b981;'>INSTANT API:</b> Official FRP key via IMEI. 24/7 processing." },
      { id: "honor-frp-google", name: "Honor FRP Key - Google Account Removal [Auto API] ✅", delivery: "1-24 Hours", price: "$32.70", description: "Google account FRP key for all Honor models." },
      { id: "honor-info-imei", name: "HONOR FULL INFO IMEI/SN", delivery: "1-5 Minutes", price: "$0.456", description: "Comprehensive check for Honor devices." },
    ],
  },
  {
    id: "mdm-macbook-recovery",
    category: "Bypass MDM for Macbook, iMac in recovery mode",
    items: [
      { id: "mdm-mac-t2-m4", name: "Bypass MDM on Macbook Pro/Air T2/M1/M2/M3/M4 Ventura, Sonoma", delivery: "Instant", price: "$7.00", description: "<b>Recovery Mode Bypass:</b> For T2 and M-series Macs. <br/>Supports Ventura & Sonoma." },
    ],
  },
  {
    id: "mac-finder-info",
    category: "Finder Owner Info For Macbook, iMac Screen Lock Password",
    items: [
      { id: "mac-finder-t2-m4", name: "Macbook, iMac Finder Owner Info for Mac T2, M1, M2, M3, M4", delivery: "Instant", price: "$4.50", description: "Retrieves owner details from locked Mac screens." },
    ],
  },
  {
    id: "nothing-phone-unlock",
    category: "Nothing Phone Unlock",
    items: [
      { id: "nothing-region-imei", name: "Nothing Phone Region Lock Direct Unlock BY IMEI [All Model Support] Fast Service 100% Success ✅", delivery: "1-24 Hours", price: "$2.00", description: "<b>Region Unlock:</b> 100% success for all Nothing Phone models." },
    ],
  },
  {
    id: "realme-network-unlock",
    category: "Realme Network Unlock",
    items: [
      { id: "realme-ww-172", name: "Realme [WORLDWIDE] Region / Call Failed / Network Unlock 172 Digit Code - Fast Service", delivery: "1-10 days", price: "$14.50", description: "Worldwide 172-digit unlock code for Realme devices." },
      { id: "realme-india-172", name: "Realme Region Lock 172 Digit Unlock Code [Only INDIA] Monday-Friday 100% Success", delivery: "1-72 Hours", price: "$4.70", description: "India-specific 172-digit code. Mon-Fri processing." },
    ],
  },
  {
    id: "gsx-direct-source",
    category: "GSX SERVICES / DIRECT SOURCE",
    items: [
      { id: "gsx-full-imei", name: "Apple GSX Full Report – Sold By, Case History & MDM Check by IMEI/SN", delivery: "1-5 Minutes", price: "$1.60", description: "<b>GSX Full Report:</b> Case history, MDM, and 'Sold-by' info." },
      { id: "sold-info-imei", name: "Sold by Info Check All iPhone, iPad, and iWatch Supported by IMEI/SN [Server 1]", delivery: "1-5 Minutes", price: "$1.40", description: "Detailed retailer info for all Apple hardware." },
      { id: "gsx-full-history", name: "Apple GSX Full Report – Sold By, Case History & Replacement Check", delivery: "1-5 Minutes", price: "$2.10", description: "Includes replacement status and full hardware history." },
      { id: "sales-model-country", name: "Sales Model / Part Number + Country checker", delivery: "1-5 Minutes", price: "$0.30", description: "Checks model, part number, and origin country." },
      { id: "mac-ipad-history", name: "Mac, iPad & iWatch: Repair, Replacement & Case History Check (Picture Service)", delivery: "1-5 Minutes", price: "$1.87", description: "Repair and case history check with picture report." },
    ],
  },
  {
    id: "apple-id-finder",
    category: "APPLE ID OWNER INFO",
    items: [
      { id: "icloud-finder-sprint", name: "iCloud ID Finder BY IMEI 100% [Sprint USA Only] (Owner Info)", delivery: "1-72 Hours", price: "$12.40", description: "Sprint USA specific owner info retrieval." },
      { id: "icloud-finder-tmo", name: "iCloud ID Finder BY IMEI 100% [T-Mobile USA Only] (Owner Info)", delivery: "1-72 Hours", price: "$12.40", description: "T-Mobile USA specific owner info retrieval." },
      { id: "icloud-finder-verizon", name: "iCloud ID Finder BY IMEI 100% [Verizon USA Only] (Owner Info)", delivery: "1-72 Hours", price: "$12.40", description: "Verizon USA specific owner info retrieval." },
    ],
  },
  {
    id: "ww-icloud-removal",
    category: "Worldwide iCloud Lock Remove All Model ✅",
    items: [
      { id: "ww-activation-lock", name: "Worldwide All Countries iCloud Activation Lock Remove (iPhone All Model) - Clean 85% Success ✅", delivery: "1-30 days", price: "$220.00", description: "<b style='color: #10b981;'>WORLDWIDE:</b> 85% success for clean devices." },
    ],
  },
  {
    id: "icloud-removal-eu",
    category: "iCloud Removal (EUROPE) Countries High Success ✅",
    items: [
      { id: "eu-icloud-11", name: "iCloud Activation Lock Remove - Europe Fresh IMEI ONLY (iPhone 11 Series) - Clean 85% Success", delivery: "1-30 days", price: "$140.00", description: "<b>Europe Clean:</b> 11 Series high success rate." },
      { id: "eu-icloud-12", name: "iCloud Activation Lock Remove - Europe Fresh IMEI ONLY (iPhone 12 Series) - Clean 85% Success", delivery: "1-30 days", price: "$150.00", description: "<b>Europe Clean:</b> 12 Series high success rate." },
      { id: "eu-icloud-13", name: "iCloud Activation Lock Remove - Europe Fresh IMEI ONLY (iPhone 13 Series) - Clean 85% Success", delivery: "1-30 days", price: "$160.00", description: "<b>Europe Clean:</b> 13 Series high success rate." },
      { id: "eu-icloud-14", name: "iCloud Activation Lock Remove - Europe Fresh IMEI ONLY (iPhone 14 Series) - Clean 85% Success", delivery: "1-30 days", price: "$170.00", description: "<b>Europe Clean:</b> 14 Series high success rate." },
      { id: "eu-icloud-15", name: "iCloud Activation Lock Remove - Europe Fresh IMEI ONLY (iPhone 15 Series) - Clean 85% Success", delivery: "1-30 days", price: "$180.00", description: "<b>Europe Clean:</b> 15 Series high success rate." },
      { id: "eu-icloud-16", name: "iCloud Activation Lock Remove - Europe Fresh IMEI ONLY (iPhone 16 Series) - Clean 85% Success", delivery: "1-30 days", price: "$200.00", description: "<b>Europe Clean:</b> 16 Series high success rate." },
    ],
  },
  {
    id: "icloud-removal-arabic",
    category: "iCloud Removal Arabic Countries High Success ✅",
    items: [
      { id: "me-icloud-11", name: "iCloud Activation Lock Remove - Middle East Fresh IMEI (iPhone 11 Series)", delivery: "1-35 days", price: "$140.00", description: "<b>Middle East:</b> Removal for iPhone 11 series." },
      { id: "me-icloud-12", name: "iCloud Activation Lock Remove - Middle East Fresh IMEI (iPhone 12 Series)", delivery: "1-35 days", price: "$150.00", description: "<b>Middle East:</b> Removal for iPhone 12 series." },
      { id: "me-icloud-13", name: "iCloud Activation Lock Remove - Middle East Fresh IMEI (iPhone 13 Series)", delivery: "1-35 days", price: "$160.00", description: "<b>Middle East:</b> Removal for iPhone 13 series." },
      { id: "me-icloud-14", name: "iCloud Activation Lock Remove - Middle East Fresh IMEI (iPhone 14 Series)", delivery: "1-35 days", price: "$170.00", description: "<b>Middle East:</b> Removal for iPhone 14 series." },
      { id: "me-icloud-15", name: "iCloud Activation Lock Remove - Middle East Fresh IMEI (iPhone 15 Series)", delivery: "1-35 days", price: "$200.00", description: "<b>Middle East:</b> Removal for iPhone 15 series." },
      { id: "me-icloud-16", name: "iCloud Activation Lock Remove - Middle East Fresh IMEI (iPhone 16 Series)", delivery: "1-35 days", price: "$220.00", description: "<b>Middle East:</b> Removal for iPhone 16 series." },
    ],
  },
  {
    id: "generic-info-check",
    category: "GENERIC PREMIUM CHECK SERVICE",
    items: [
      { id: "nothing-info", name: "NOTHING PHONE INFO", delivery: "Instant", price: "$0.033", description: "Basic info check for Nothing Phone." },
      { id: "realme-info", name: "REALME INFO", delivery: "Instant", price: "$0.20", description: "Basic info check for Realme." },
      { id: "samsung-info", name: "SAMSUNG INFO", delivery: "Instant", price: "$0.10", description: "Basic info check for Samsung." },
      { id: "oneplus-info", name: "ONEPLUS INFO", delivery: "Instant", price: "$0.10", description: "Basic info check for OnePlus." },
      { id: "motorola-info", name: "MOTOROLA INFO", delivery: "Instant", price: "$0.15", description: "Basic info check for Motorola." },
      { id: "pixel-info", name: "GOOGLE PIXEL INFO", delivery: "Instant", price: "$0.20", description: "Basic info check for Pixel." },
      { id: "vivo-iqoo-info", name: "VIVO | IQOO INFO", delivery: "Instant", price: "$0.08", description: "Basic info check for Vivo/iQOO." },
      { id: "huawei-info", name: "HUAWEI INFO", delivery: "Instant", price: "$0.18", description: "Basic info check for Huawei." },
      { id: "alcatel-info", name: "ALCATEL INFO", delivery: "Instant", price: "$0.20", description: "Basic info check for Alcatel." },
      { id: "lg-info", name: "LG INFO", delivery: "Instant", price: "$0.10", description: "Basic info check for LG." },
      { id: "lenovo-info", name: "LENOVO INFO", delivery: "Instant", price: "$0.12", description: "Basic info check for Lenovo." },
    ],
  },
  {
    id: "emea-iphone",
    category: "EMEA SERVICE - iPHONE",
    items: [
      { id: "emea-ww-premium", name: "EMEA iPhone All Model Support Premium Fast Service", delivery: "1-24 Hours", price: "$2.399", description: "<b>EMEA Premium:</b> Fast network unlock for the EMEA region." },
    ],
  },
  {
    id: "canada-networks",
    category: "CANADA NETWORKS SERVICE",
    items: [
      { id: "ca-telus-koodo-promo", name: "CANADA TELUS/KOODO IPHONE ALL MODELS PREMIUM FAST SERVICE - PROMO ON", delivery: "1-72 Hours", price: "$2.70", description: "<b>Promo Rate:</b> Premium unlock for Telus/Koodo Canada." },
      { id: "ca-telus-koodo-clean", name: "Telus/Koodo Canada Clean Unlock All iPhones", delivery: "1-72 Hours", price: "$3.70", description: "Standard clean unlock for Telus/Koodo iPhones." },
      { id: "ca-rogers-fido", name: "Rogers/Fido Canada iPhone & Generic Network Unlock", delivery: "24-72 Hours", price: "$6.00", description: "Network unlock for Rogers/Fido Canada." },
      { id: "ca-videotron-code", name: "Canada Videotron Generic All Model Unlock Code", delivery: "1-5 days", price: "$4.00", description: "Generic unlock code for Videotron Canada." },
      { id: "ca-sasktel-iphone", name: "Canada SaskTel iPhone All Model Support Clean Only", delivery: "1-5 days", price: "$16.50", description: "SaskTel Canada clean iPhone unlock." },
      { id: "ca-bell-clean", name: "Canada Bell/Virgin Up to 8 Clean IMEI High Success", delivery: "1-5 days", price: "$5.00", description: "Bell/Virgin Canada clean IMEI unlock." },
      { id: "ca-bell-generic", name: "Canada Bell/BellMTS/Virgin - Generic Code {Sony, Lumia, Samsung etc}", delivery: "1-5 days", price: "$2.50", description: "Generic code for Bell/Virgin networks." },
      { id: "ca-bell-mts-premium", name: "Canada Bell/MTS Premium iPhone Network Unlock Up To 17 Series – 48H Delivery", delivery: "1-72 Hours", price: "$150.00", description: "<b>Premium 48H:</b> Unlock up to iPhone 17 series." },
    ],
  },
  {
    id: "blackberry-services",
    category: "BLACKBERRY SERVICES",
    items: [
      { id: "bb-mep-calc", name: "Black Berry Calculator By MEP [1-10 Minutes]", delivery: "1-10 Minutes", price: "$1.70", description: "MEP code unlock calculator." },
      { id: "bb-prd-calc", name: "BlackBerry Calculator by PRD [1-10 Minutes]", delivery: "1-10 Minutes", price: "$1.70", description: "PRD code unlock calculator." },
    ],
  },
  {
    id: "htc-unlock-code",
    category: "HTC Unlock Code",
    items: [
      { id: "htc-db-2017", name: "HTC Unlock Code Via IMEI - [2009-2017 Database]", delivery: "1-60 Minutes", price: "$3.00", description: "Unlock code for HTC models up to 2017." },
      { id: "htc-db-2019", name: "HTC Unlock Code Via IMEI - [Till 2019 Database]", delivery: "1-60 Minutes", price: "$3.50", description: "Unlock code for HTC models up to 2019." },
      { id: "htc-db-ultimate", name: "HTC Unlock Code Via IMEI - [Ultimate Latest Database]", delivery: "1-60 Minutes", price: "$5.00", description: "Ultimate database unlock for newest HTC." },
    ],
  },
  {
    id: "huawei-frp-reset",
    category: "HUAWEI FRP RESET KEY (FRP UNLOCK CODE)",
    items: [
      { id: "huawei-testpoint", name: "HUAWEI RESET FRP INSTANT SERVICE UNLOCK BY (TESTPOINT)", delivery: "5-10 Minutes", price: "$3.00", description: "<b>Instant FRP:</b> Reset via Testpoint method." },
    ],
  },
  {
    id: "imei-check-service",
    category: "IMEI Check Service",
    items: [
      { id: "sam-info-imei", name: "Samsung Info Check By IMEI", delivery: "1-30 Minutes", price: "$0.10", description: "Basic Samsung IMEI info check." },
      { id: "iphone-aio-basic", name: "iPhone All In One Basic Check By IMEI 100%", delivery: "Minutes", price: "$0.08", description: "100% accurate AIO check for iPhones." },
      { id: "lg-info-imei", name: "LG INFO CHECK BY IMEI", delivery: "1-5 Minutes", price: "$0.10", description: "Basic LG IMEI info check." },
      { id: "huawei-info-imeisn", name: "HUAWEI INFO CHECK BY IMEI/SN", delivery: "1-5 Minutes", price: "$0.10", description: "Huawei info via IMEI or SN." },
      { id: "lenovo-warranty-check", name: "Lenovo Model / Country / Warranty Check + Blacklist Status", delivery: "1-5 Minutes", price: "$0.10", description: "Full warranty and blacklist status for Lenovo." },
      { id: "moto-lenovo-imei", name: "MOTOROLA & LENOVO IMEI CHECK INFO", delivery: "1-5 Minutes", price: "$0.15", description: "IMEI info check for Moto/Lenovo." },
      { id: "nokia-info-check", name: "NOKIA INFO CHECK", delivery: "1-5 Minutes", price: "$0.10", description: "Basic Nokia info check." },
      { id: "sam-carrier-checker", name: "Samsung Full Info + Carrier Checker BY IMEI", delivery: "1-5 Minutes", price: "$0.10", description: "Carrier and full info for Samsung." },
      { id: "sony-info-check", name: "SONY INFO CHECK", delivery: "1-5 Minutes", price: "$0.10", description: "Basic Sony info check." },
      { id: "tmo-clean-status", name: "T-MOBILE USA CLEAN/BLOCKED/UNPAID STATUS", delivery: "1-5 Minutes", price: "$0.05", description: "Financial and blacklist status check." },
      { id: "tmo-device-unlock-status", name: "T-MOBILE USA Device Unlock App Simlock Status Checker", delivery: "1-5 Minutes", price: "$0.10", description: "T-Mobile USA simlock status check." },
      { id: "zte-info-check", name: "ZTE INFO CHECK", delivery: "1-5 Minutes", price: "$0.13", description: "Basic ZTE info check." },
    ],
  },
  {
    id: "iphone-carrier-check",
    category: "iPHONE IMEI-SN CARRIER CHECK SERVICE",
    items: [
      { id: "iphone-simlock-carrier", name: "iPhone SimLock + Carrier Checker by IMEI/SN", delivery: "Instant", price: "$0.15", description: "Find out if your iPhone is locked and to which carrier." },
      { id: "iphone-carrier-icloud-gsma", name: "iPhone Carrier, SIM Lock, iCloud & GSMA Blacklist Status Check (Premium)", delivery: "Instant", price: "$0.32", description: "<b>Premium Multi-Check:</b> Carrier, SIM, iCloud, and GSMA status." },
      { id: "mac-fmi-lost-checker", name: "Apple Macbook/iMac FMI ON/OFF & iCloud Clean/Lost Checker (By SN)", delivery: "1-5 Minutes", price: "$0.55", description: "Macbook FMI and clean/lost status." },
      { id: "apple-mdm-checker", name: "Apple iPhone/iPad/iMac/Macbook MDM Checker (IMEI/SN)", delivery: "1-5 Minutes", price: "$0.80", description: "MDM status checker for all Apple devices." },
    ],
  },
  {
    id: "saudi-ksa-unlock",
    category: "iPhone Network Unlock - Saudi Arabia KSA",
    items: [
      { id: "iphone-zain-ksa", name: "iPhone/iPad All Models Including 13 Pro Max Unlock Saudi Arabic Zain Network KSA", delivery: "1-3 days", price: "$80.00", description: "Network unlock for Zain KSA Apple devices." },
    ],
  },
  {
    id: "ipad-sn-wifi-bt",
    category: "iPHONE/IPAD SN / SERVICE SERIAL + WIFI + BT",
    items: [
      { id: "ipad-sn-wifi-bt-a5-a6", name: "Premium Service [SERIAL + WIFI + BT] IPAD A5/A6/A6X AUTO REPLY INSTANT SUPPORT", delivery: "1-30 Minutes", price: "$1.50", description: "<b>Auto Reply:</b> SN, WiFi, and BT for A5/A6 iPads." },
      { id: "ipad-air-pro-bt-wifi-sn", name: "iPad BT, Wifi, SN - iPad Air 2, iPad Pro 10.5-inch, iPad Pro 12.9-inch 2nd gen", delivery: "1-10 Minutes", price: "$7.00", description: "Retrieve hardware IDs for iPad Air/Pro." },
    ],
  },
  {
    id: "att-usa-semi-premium",
    category: "AT&T USA Generic - Semi Premium",
    items: [
      { id: "att-usa-lg-sam-semi", name: "At&t USA - LG / Samsung / Nokia / ZTE / Sony / Generic - Semi Premium", delivery: "1-48 Hours", price: "$11.00", description: "Semi-premium unlock for AT&T USA Androids." },
    ],
  },
  {
    id: "bahrain-network-unlock",
    category: "BAHRAIN NETWORK UNLOCK SERVICE",
    items: [
      { id: "bahrain-zain-iphone", name: "Bahrain Zain Network iPhone All Models Including 14/14 Pro/14 Pro Max", delivery: "1-5 days", price: "$85.00", description: "Network unlock for Zain Bahrain iPhones." },
    ],
  },
  {
    id: "japan-jcom-unlock",
    category: "JAPAN JCOM - UNLOCKING NETWORKS",
    items: [
      { id: "jp-jcom-14-14pm", name: "Japan JCOM - iPhone 14 To 14Pro Max (Network Unlock Clean IMEI)", delivery: "1-48 Hours", price: "$19.00", description: "Clean network unlock for JCOM Japan 14 series." },
      { id: "jp-jcom-6s-13pm", name: "Japan JCOM - iPhone 6s To 13Pro Max (Network Unlock Clean IMEI)", delivery: "1-48 Hours", price: "$7.50", description: "Clean network unlock for JCOM Japan 6s-13." },
    ],
  },
  {
    id: "japan-network-unlock",
    category: "JAPAN NETWORK",
    items: [
      { id: "jp-au-kddi-6s-13", name: "Japan AU KDDI - iP 6s/6s+/SE/7/7+/8/8+/X/Xr/Xs/XsMax/11/12/13 (Clean IMEI Only)", delivery: "1-24 Hours", price: "$5.00", description: "Clean AU KDDI Japan iPhone unlock." },
      { id: "jp-au-kddi-clean", name: "JAPAN AU/KDDI iPhone & Generic All Model CLEAN Unlock", delivery: "1-72 Hours", price: "$3.00", description: "Clean generic/iPhone unlock for AU KDDI." },
      { id: "jp-au-kddi-semi-premium", name: "KDDI AU Japan - iP XR/XS/XSMAX/11/12/13 SEMI PREMIUM 99% SUCCESS", delivery: "1-4 days", price: "$23.00", description: "<b>99% Success:</b> Semi-premium AU KDDI unlock." },
      { id: "jp-docomo-generic-code", name: "Japan Docomo NTT/Docomo Generic Code Service [Clean & Unpaid]", delivery: "1-5 days", price: "$5.00", description: "Docomo NTT generic unlock code." },
      { id: "jp-docomo-clean-unpaid", name: "Ntt Docomo Japan - iPhone & Generic (All Model Supported) Clean + Unpaid ✅", delivery: "1-24 Hours", price: "$3.15", description: "Clean and unpaid Docomo NTT unlock." },
      { id: "jp-docomo-xr-13-premium", name: "Ntt Docomo Japan - iPhone XR/XS/XS MAX/11/12 & 13 Premium Fast Service", delivery: "1-30 Hours", price: "$5.055", description: "Fast premium unlock for Docomo NTT iPhones." },
      { id: "jp-au-kddi-clean-unpaid", name: "AU KDDI Japan - iPhone & Generic (All Model Supported) Clean + Unpaid ✅", delivery: "1-24 Hours", price: "$4.15", description: "Clean and unpaid AU KDDI unlock." },
      { id: "jp-docomo-se-13pm-premium", name: "NTT Docomo Japan - iPhone SE to 13 Pro Max (Premium Unlock Service)", delivery: "1-48 Hours", price: "$12.00", description: "Premium Docomo NTT unlock service." },
      { id: "jp-docomo-clean-lost-check", name: "NTT Docomo Japan - Clean, Lost Check Service", delivery: "1-5 Minutes", price: "$0.10", description: "Docomo NTT Japan status checker." },
    ],
  },
  {
    id: "japan-softbank-unlock",
    category: "JAPAN SOFTBANK",
    items: [
      { id: "jp-softbank-generic-code", name: "Softbank Japan Generic Code LG / Samsung / Nokia / ZTE / Sony / Moto etc.", delivery: "24-72 Hours", price: "$2.17", description: "Softbank Japan generic unlock code." },
      { id: "jp-softbank-clean-unpaid", name: "Softbank Japan - iPhone & Generic (All Model Supported) Clean + Unpaid ✅", delivery: "1-24 Hours", price: "$2.17", description: "Clean and unpaid Softbank Japan unlock." },
      { id: "jp-softbank-all-clean", name: "Japan SoftBank - iPhone All Models Including 13 Pro Max [Clean only]", delivery: "1-48 Hours", price: "$27.00", description: "Softbank Japan clean iPhone unlock." },
      { id: "jp-softbank-6s-12-clean-unpaid", name: "Japan Softbank - iP 6S/6S+/SE/7/7+/8/8+/X/Xr/Xs/XsMax/11/12 (Clean & Unpaid Supported)", delivery: "1-48 Hours", price: "$3.50", description: "Clean and unpaid Softbank unlock for older iPhones." },
    ],
  },
  {
    id: "macbook-sn-checkers",
    category: "MacBook SN - Checkers",
    items: [
      { id: "mac-icloud-clean-lost", name: "MacBook iCloud Clean/Lost Check [IMEI/SN]", delivery: "1-5 Minutes", price: "$0.70", description: "iCloud status check for MacBooks." },
      { id: "mac-fmi-onoff", name: "MacBook FMI On/Off Check", delivery: "1-5 Minutes", price: "$0.31", description: "Find My Mac status checker." },
      { id: "mac-fmi-onoff-model", name: "MacBook FMI On/Off + Model Check", delivery: "1-5 Minutes", price: "$0.305", description: "Find My Mac and model info check." },
    ],
  },
  {
    id: "motorola-unlock",
    category: "MOTOROLA",
    items: [
      { id: "moto-nck-cricket-no", name: "Motorola NCK Code By IMEI [Cricket Not Supported] Instant Premium", delivery: "1-10 Minutes", price: "$4.00", description: "Premium NCK code for Motorola (Excludes Cricket)." },
      { id: "moto-ww-nck-instant", name: "Motorola - Worldwide NCK Code [24/7 INSTANT] (Code Not Found Also Supported)", delivery: "1-10 Minutes", price: "$1.15", description: "Instant worldwide NCK code for Motorola." },
      { id: "moto-ww-nck-fast", name: "Motorola - Worldwide NCK Code SUPER FAST", delivery: "1-5 Minutes", price: "$0.65", description: "Super fast NCK code for Motorola." },
    ],
  },
  {
    id: "nokia-services-unlock",
    category: "NOKIA SERVICES",
    items: [
      { id: "nokia-ww-nck-code", name: "Nokia WorldWide [Listed Models Only] NCK Code Only", delivery: "1-24 Hours", price: "$13.00", description: "Worldwide NCK code for select Nokia models." },
    ],
  },
  {
    id: "oppo-network-unlock",
    category: "OPPO NETWORK UNLOCK SERVICE",
    items: [
      { id: "oppo-realme-16digit", name: "OPPO/Realme Network Unlock NCK Code (16 Digit) Dual IMEI Worldwide (❤️ Promo Offer)", delivery: "1-60 Minutes", price: "$0.40", description: "<b>Promo Offer:</b> 16-digit NCK code for OPPO/Realme." },
      { id: "oppo-network-single-imei", name: "OPPO NETWORK LOCK SINGLE IMEI (Thailand - Australia And Japan not supported)", delivery: "1-24 Hours", price: "$10.00", description: "Single IMEI network unlock for OPPO." },
      { id: "oppo-jp-single-nck", name: "OPPO Network Unlock (Japan Country Only) Single Sim NCK Codes", delivery: "1-24 Hours", price: "$6.20", description: "Japan Country Only OPPO network unlock." },
    ],
  },
  {
    id: "philippines-unlock",
    category: "Philippines Network Unlock",
    items: [
      { id: "ph-globe-semi-premium", name: "Globe Philippines - iPhone (All Model Support) Semi Premium", delivery: "1-5 days", price: "$15.50", description: "Semi-premium unlock for Globe Philippines." },
      { id: "ph-globe-singtel-5-x", name: "Philippines Globe (SingTel) iPhone 5 to X (Only Clean IMEI Supported)", delivery: "7-15 days", price: "$20.50", description: "Clean unlock for Globe Philippines iPhones." },
    ],
  },
  {
    id: "s-tool-pro-activ",
    category: "S-TOOL PRO",
    items: [
      { id: "scoin-s-tool-pro", name: "Buy SCoin for S-Tool Pro", delivery: "1-30 Minutes", price: "$1.20", description: "Purchase SCoin credits for S-Tool Pro software." },
      { id: "s-tool-pro-1year", name: "S-Tool Pro 1 Year Activation/Renew", delivery: "1-30 Minutes", price: "$36.00", description: "1-year activation/renewal for S-Tool Pro." },
      { id: "s-tool-pro-6month", name: "S-Tool Pro 6 Months Activation/Renew", delivery: "1-30 Minutes", price: "$26.00", description: "6-month activation/renewal for S-Tool Pro." },
      { id: "s-tool-pro-3month", name: "S-Tool Pro 3 Months Activation/Renew", delivery: "1-30 Minutes", price: "$18.00", description: "3-month activation/renewal for S-Tool Pro." },
    ],
  },
  {
    id: "samsung-ww-s22",
    category: "SAMSUNG SERVICE",
    items: [
      { id: "sam-ww-s22-zfold3", name: "Samsung World Wide - S22, S22 Ultra, Z Fold 3, Z Flip 3 (Unlock Service)", delivery: "3-7 days", price: "$55.00", description: "Worldwide unlock for Samsung flagships." },
    ],
  },
  {
    id: "spectrum-usa-unlock",
    category: "SPECTRUM USA - iPHONE & GENERIC UNLOCK ✅",
    items: [
      { id: "spectrum-usa-12-14-clean", name: "SPECTRUM USA - iPhone [Clean+Finance] Unlock iPhone 12/13/14 Series ✅", delivery: "1-15 days", price: "$159.00", description: "Spectrum USA clean and financed unlock." },
    ],
  },
  {
    id: "tmo-sprint-premium",
    category: "T-MOBILE USA / Sprint NETWORK UNLOCK",
    hot: true,
    items: [
      { id: "tmo-sprint-11-14pm-premium", name: "T-Mobile/Sprint - All Models Supported Till iPhone 11 To 14 Pro Max [Premium Clean + Financed]", delivery: "1-48 Hours", price: "$112.00", description: "<b>Premium Service:</b> Unlock for T-Mobile/Sprint iPhones." },
      { id: "tmo-sprint-15pm-express", name: "T-Mobile/Sprint/Metropcs - 15 Pro / 15 Pro Max Premium 100% Express ✅", delivery: "1-48 Hours", price: "$138.00", description: "<b>Express:</b> 100% success for iPhone 15 Pro Max." },
      { id: "tmo-sprint-15-plus-express", name: "T-Mobile/Sprint/Metropcs - Till 15/15 Plus Premium 100% Express ✅", delivery: "1-48 Hours", price: "$133.00", description: "<b>Express:</b> 100% success up to iPhone 15 Plus." },
      { id: "tmo-sprint-16-plus-premium", name: "T-Mobile/Sprint/Metropcs - All Models Till 16/16+ [Premium] Express ✅", delivery: "1-48 Hours", price: "$148.00", description: "<b>Express Premium:</b> Unlock up to iPhone 16 Plus." },
      { id: "tmo-metropcs-16-plus-express", name: "T-Mobile/METROPCS/SPRINT USA iPhone 16/16+ [CLEAN/PREMIUM + FINANCE] Express ✅", delivery: "1-48 Hours", price: "$148.00", description: "<b>Express:</b> Clean/Finance unlock for iPhone 16." },
      { id: "tmo-metropcs-16pm-express", name: "T-Mobile/METROPCS/SPRINT USA iPhone 16 PRO/16PRO MAX [CLEAN/PREMIUM + FINANCE] Express ✅", delivery: "1-48 Hours", price: "$148.00", description: "<b>Express:</b> Clean/Finance unlock for iPhone 16 Pro Max." },
    ],
  },
  {
    id: "tecno-network-nck",
    category: "TECNO NETWORK UNLOCK",
    items: [
      { id: "tecno-network-code", name: "Tecno Network Unlock Code By IMEI", delivery: "1-3 Hours", price: "$4.00", description: "Tecno network unlock code via IMEI." },
    ],
  },
  {
    id: "uk-iphone-unlock",
    category: "UK iPHONE Network Unlock",
    items: [
      { id: "vodafone-uk-clean", name: "Vodafone UK - iPhone All Models (Clean Unlock Service)", delivery: "1-5 days", price: "$15.00", description: "Clean unlock for Vodafone UK iPhones." },
      { id: "uk-vodafone-11-12-premium", name: "UK VODAFONE iPHONE XR/XS/XS MAX/11 & 12 Series [PREMIUM] UNLOCK SERVICE", delivery: "1-5 days", price: "$30.00", description: "Premium unlock for Vodafone UK XR-12 series." },
      { id: "3hutch-cpw-uk-clean", name: "3 Hutchison & CPW & Flex Policy UK - iPhone All Models (Clean Unlock Service)", delivery: "1-15 days", price: "$30.00", description: "Clean unlock for 3 Hutchison and CPW UK." },
      { id: "ee-orange-6month-clean", name: "EE/Orange/T-Mobile UK - iPhone All Models (6+ Month Old Clean Unlock Service)", delivery: "1-4 days", price: "$8.00", description: "Clean unlock for older EE/Orange UK iPhones." },
      { id: "ee-orange-xr-11pm-premium", name: "EE/Orange/T-Mobile UK - iPhone XR to 11 Pro Max (Over 6+ Months Premium)", delivery: "1-10 days", price: "$20.00", description: "Premium unlock for older EE/Orange UK iPhones." },
      { id: "uk-ee-xr-13pm-premium", name: "UK EE iPHONE XR/XS/XS MAX/11/12 & 13 Premium Unlock Service", delivery: "1-72 days", price: "$13.00", description: "Premium unlock for UK EE iPhones XR-13." },
      { id: "uk-ee-clean-eligible", name: "UK EE/T Mobile/Orange iPhone/iPad/Generic All Models Clean Service (Eligible)", delivery: "1-48 Hours", price: "$3.35", description: "Clean eligible unlock for UK EE networks." },
      { id: "uk-ee-clean-service", name: "UK EE/T Mobile/Orange iPhone/iPad/Generic All Models Clean Service", delivery: "1-72 Hours", price: "$8.00", description: "Standard clean unlock for UK EE networks." },
      { id: "uk-vodafone-generic-fast", name: "UK VODAFONE ALL GENERIC CODE [iPhone Not Supported] FAST SERVICE", delivery: "1-48 Hours", price: "$2.80", description: "Fast generic code for Vodafone UK Androids." },
      { id: "uk-ee-xr-15-premium", name: "UK EE/TMobile/Orange iPhone XR TO 15 SERIES Clean/Blacklist/Block Full Premium", delivery: "1-72 Hours", price: "$5.55", description: "Full premium unlock for UK EE iPhones XR-15." },
      { id: "uk-ee-generic-code", name: "UK EE/T-Mobile/Orange UK Generic Code (Samsung, Nokia, Huawei, Google Pixel)", delivery: "1-72 Hours", price: "$2.75", description: "Generic code for UK EE Android devices." },
    ],
  },
  {
    id: "uk-o2-tesco-unlock",
    category: "UK O2 / TESCO UNLOCK SERVICES",
    items: [
      { id: "uk-o2-generic-express", name: "UK O2 Generic Service [iPhone Not Supported] 1-3 Days Express Service", delivery: "1-72 Hours", price: "$4.00", description: "Express generic code for UK O2 Androids." },
      { id: "uk-o2-tesco-fast", name: "UK O2 Tesco - iPhone/iPad All Models Fast Service", delivery: "1-10 days", price: "$4.40", description: "Fast unlock for UK O2 Tesco Apple devices." },
    ],
  },
  {
    id: "uk-vodafone-unlock-service",
    category: "UK Vodafone Unlocking Service",
    items: [
      { id: "uk-vodafone-clean-100success", name: "UK Vodafone iPhone All Models Clean IMEI Only ✅ 100% SUCCESS RATE", delivery: "1-6 days", price: "$13.34", description: "<b>100% Success:</b> Clean unlock for UK Vodafone iPhones." },
      { id: "uk-vodafone-generic-clean-superfast", name: "Uk Vodafone Generic All Models Clean IMEI Only SUPER FAST SERVICE", delivery: "24-72 Hours", price: "$6.05", description: "Super fast clean unlock for UK Vodafone Androids." },
    ],
  },
  {
    id: "us-reseller-flex-unlock",
    category: "US RESELLER FLEX POLICY",
    items: [
      { id: "us-flex-12-16-emergency", name: "US Reseller Flex Policy Unlock 12/13/14/15/16 series 99% RATIO Emergency Service", delivery: "24-72 Hours", price: "$28.50", description: "<b>Emergency Service:</b> 99% ratio for US Reseller Flex iPhones." },
      { id: "us-flex-15pm-clean", name: "US Reseller Flex Policy - All iPhones Till 15 Pro Max [Clean 100% Success]", delivery: "1-72 Hours", price: "$115.00", description: "100% success clean unlock for US Reseller Flex." },
    ],
  },
  {
    id: "att-usa-clean-unlock",
    category: "USA AT&T iPhone & GENERIC CLEAN SERVICE",
    items: [
      { id: "att-usa-12-exclusive", name: "USA AT&T iPhone Till 12 Series Exclusive Service", delivery: "1-7 days", price: "$40.00", description: "Exclusive unlock for AT&T USA iPhones up to 12." },
      { id: "att-usa-clean-check", name: "AT&T USA ➢ iPhone Clean Unlock All Models + Check Status", delivery: "1-24 Hours", price: "$0.64", description: "Clean unlock and status check for AT&T USA iPhones." },
      { id: "att-usa-active-line-issue", name: "AT&T USA ATT - iPhone All Model (Active Line / Active On Another AT&T Account / IMEI Issue)", delivery: "1-4 days", price: "$5.68", description: "Unlock for AT&T iPhones with active line or IMEI issues." },
      { id: "att-usa-clean-support", name: "At&t USA ATT - iPhone & Generic (All Model Support) Clean Service", delivery: "1-24 Hours", price: "$0.59", description: "Clean unlock for AT&T USA generic devices." },
    ],
  },
  {
    id: "cricket-usa-unlock",
    category: "USA CRICKET SERVICE",
    items: [
      { id: "cricket-usa-generic-6month", name: "Cricket USA - Generic (6+ Month Old Clean Unlock Service)", delivery: "1-5 days", price: "$10.50", description: "Clean unlock for older Cricket USA Androids." },
      { id: "cricket-usa-iphone-6month", name: "Cricket USA - iPhone All Models (6+ Month Old Clean Unlock Service)", delivery: "1-4 days", price: "$10.50", description: "Clean unlock for older Cricket USA iPhones." },
    ],
  },
  {
    id: "usa-iphone-premium",
    category: "USA iPHONE SERVICES",
    items: [
      { id: "tmo-usa-express-clean", name: "T-Mobile USA - iPhone All Models (Express Service) (Clean & Financed)", delivery: "1-72 Hours", price: "$205.00", description: "Express unlock for T-Mobile USA iPhones." },
      { id: "att-usa-active-issue", name: "AT&T USA - iPhone All Models (Active Line, Active Other, IMEI Issue)", delivery: "1-4 days", price: "$10.00", description: "Unlock for AT&T iPhones with active line/other issues." },
      { id: "verizon-usa-13pm-premium", name: "Verizon USA - iPhone 5s to 13 Pro Max (Premium Unlock Service)", delivery: "1-4 days", price: "$8.00", description: "Premium unlock for Verizon USA iPhones." },
      { id: "att-usa-finance-blacklist", name: "AT&T USA: Finance/Contract/Blacklist Check + Unlock (iPhone & Generic) - Express", delivery: "1-24 Hours", price: "$3.50", description: "Express status check and unlock for AT&T USA." },
      { id: "tmo-usa-14-express", name: "T-Mobile USA - iPhone 14 Series (Express Service) (Clean & Financed)", delivery: "48-72 Hours", price: "$290.00", description: "Express unlock for T-Mobile USA 14 series." },
      { id: "usa-tracfone-clean-unpaid", name: "USA Tracfone/StraightTalk - All iPhone Clean/Unpaid (01 Year Activated)", delivery: "1-10 days", price: "$23.00", description: "Clean unlock for USA Tracfone/StraightTalk." },
      { id: "us-flex-se2-14-premium", name: "US Reseller Flex Policy SE2/SE3/12/13/14 Series / Premium Unlock Service)", delivery: "1-3 days", price: "$45.00", description: "Premium US Reseller Flex unlock service." },
    ],
  },
  {
    id: "usa-network-android",
    category: "USA NETWORK SERVICES",
    items: [
      { id: "metro-usa-android-unlock", name: "MetroPCS USA - Mobile Device Unlock App (Android Official Unlock) (6+ Month Old)", delivery: "1-72 Hours", price: "$5.00", description: "Official app unlock for MetroPCS Androids." },
      { id: "att-usa-gophone-active", name: "AT&T USA - Generic (Active Line, GoPhone, Active Other, IMEI Issue)", delivery: "1-5 days", price: "$8.20", description: "Unlock for AT&T USA GoPhones and active lines." },
      { id: "metro-usa-generic-promo", name: "USA Metro PCS Generic Unlock Code Service /PROMO ON", delivery: "1-72 Hours", price: "$5.00", description: "Promo generic code for MetroPCS USA." },
    ],
  },
  {
    id: "usa-samsung-activ",
    category: "USA SAMSUNG SERVICES",
    items: [
      { id: "sam-usa-s10-older", name: "Samsung USA - S10, N10 and Older Models (AT&T, Spectrum, Cricket, Xfinity)", delivery: "1-5 days", price: "$29.50", description: "Unlock for older USA Samsung models." },
      { id: "sam-usa-a-series", name: "Samsung USA - A Series (AT&T, Spectrum, Cricket, Xfinity)", delivery: "1-5 days", price: "$31.50", description: "Unlock for USA Samsung A series." },
      { id: "sam-usa-s20-zflip", name: "Samsung USA - S20 Series, Z-Flip (AT&T, Spectrum, Cricket, Xfinity)", delivery: "1-5 days", price: "$31.50", description: "Unlock for USA Samsung S20/Z-Flip." },
      { id: "sam-usa-s21-zfold3", name: "Samsung USA - S21 Series, Z-Fold 3, Z-Flip 3 (AT&T, Spectrum, Cricket, Xfinity)", delivery: "1-4 days", price: "$31.50", description: "Unlock for USA Samsung S21/Fold3/Flip3." },
      { id: "sam-usa-s22-zfold4-codes", name: "Samsung USA: All Level Unlock Codes S22/S23 Series/Z Fold 3/4/Z Flip 3/4 Series", delivery: "1-4 days", price: "$87.00", description: "All-level codes for newer USA Samsung flagships." },
    ],
  },
  {
    id: "xiaomi-mi-official",
    category: "XIAOMI MI ACCOUNT LOCK REMOVE OFFICIAL ✅",
    items: [
      { id: "xiaomi-pakistan-clean", name: "Xiaomi Mi Account Lock Remove (+92 Pakistan) Clean Only", delivery: "1-60 Minutes", price: "$2.43", description: "<b>Pakistan Official:</b> Mi Account removal (+92)." },
      { id: "xiaomi-malaysia-clean", name: "Xiaomi Mi Account Remove-Malaysia (Clean Device Only)", delivery: "1-72 Hours", price: "$19.20", description: "Official Mi Account removal for Malaysia." },
      { id: "xiaomi-ww-clean", name: "Xiaomi Mi Account Lock Remove (Worldwide, China Not Support) Clean Device ✅", delivery: "1-24 Hours", price: "$27.30", description: "Worldwide official Mi Account removal (Excludes China)." },
      { id: "xiaomi-asia-official", name: "Xiaomi Mi Account Removal Official (Bangladesh, India, Nepal, Bhutan, Sri Lanka)", delivery: "1-48 Hours", price: "$29.40", description: "Official Mi Account removal for South Asian countries." },
      { id: "xiaomi-turkey-clean", name: "Xiaomi Mi Account Lock Remove (Turkey) Clean Only", delivery: "1-48 Hours", price: "$17.50", description: "Official Mi Account removal for Turkey." },
      { id: "xiaomi-indonesia-clean", name: "Xiaomi Mi Account Lock Remove (Indonesia) Clean Device Only", delivery: "1-24 Hours", price: "$8.50", description: "Official Mi Account removal for Indonesia." },
      { id: "xiaomi-eu-api", name: "Xiaomi Mi Account Remove [Europe - AUTO API 24/7]", delivery: "1-3 Hours", price: "$16.30", description: "<b>24/7 Auto API:</b> Mi Account removal for Europe." },
      { id: "xiaomi-ksa-clean", name: "Xiaomi Mi Account Lock Remove (Saudi Arabia KSA) Clean Device", delivery: "1-3 Hours", price: "$9.55", description: "Official Mi Account removal for Saudi Arabia." },
      { id: "xiaomi-india-clean", name: "Xiaomi Mi Account Lock Remove (INDIA) Clean Device Only", delivery: "1-48 Hours", price: "$29.00", description: "Official Mi Account removal for India." },
      { id: "xiaomi-brazil-clean", name: "Xiaomi Mi Account Lock Remove (Brazil) Clean Device Only 100% Success ✅", delivery: "1-24 Hours", price: "$24.00", description: "<b>100% Success:</b> Mi Account removal for Brazil." },
    ],
  },
  {
    id: "xiaomi-redmi-sim",
    category: "Xiaomi Redmi Sim Unlock Service",
    items: [
      { id: "xiaomi-sim-nck-service", name: "Xiaomi Redmi Sim Network Unlock Code Service", delivery: "1-48 Hours", price: "$14.50", description: "Network SIM unlock code for Xiaomi/Redmi." },
    ],
  },
  {
    id: "xiaomi-imei-checker",
    category: "XIAOMI-MI-IMEI & LOCK CODE CHECKER",
    items: [
      { id: "xiaomi-full-info-imei", name: "XIAOMI CHECK FULL INFO SALE/ACTIVATION/USED REGION STATUS - IMEI", delivery: "1-5 Minutes", price: "$0.25", description: "Full Xiaomi info check via IMEI." },
      { id: "xiaomi-sold-info-imei-s1", name: "Xiaomi Check information Sold By IMEI", delivery: "1-5 Minutes", price: "$0.175", description: "Xiaomi sold-by info check (Server 1)." },
      { id: "xiaomi-sold-info-imei-s2", name: "Xiaomi Check information Sold By IMEI Server 2", delivery: "1-5 Minutes", price: "$0.30", description: "Xiaomi sold-by info check (Server 2)." },
    ],
  },
  {
    id: "zte-network-nck-unlock",
    category: "ZTE Network Service",
    items: [
      { id: "zte-ww-nck-code", name: "ZTE Unlock Worldwide NCK Code Only", delivery: "5-15 days", price: "$20.50", description: "Worldwide NCK code for ZTE devices." },
    ],
  },
  {
    id: "claro-network-unlock",
    category: "CLARO - Network Unlock",
    items: [
      { id: "claro-4-xsmax", name: "Claro All Country iPhone 4 to XS MAX", delivery: "1-9 days", price: "$15.00", description: "Claro network unlock for iPhones up to XS Max." },
      { id: "claro-11-series", name: "Claro All Country iPhone 11 Series", delivery: "1-9 days", price: "$26.00", description: "Claro network unlock for iPhone 11 series." },
      { id: "claro-12-series", name: "Claro All Country iPhone 12/12 Pro Max", delivery: "1-9 days", price: "$31.00", description: "Claro network unlock for iPhone 12 series." },
      { id: "claro-13-series", name: "Claro All Country iPhone 13 Series", delivery: "1-9 days", price: "$36.00", description: "Claro network unlock for iPhone 13 series." },
      { id: "claro-15-series", name: "Claro All Countries iPhone 15 Series", delivery: "1-9 days", price: "$64.00", description: "Claro network unlock for iPhone 15 series." },
      { id: "claro-16-series", name: "Claro All Country iPhone 16 Series", delivery: "1-9 days", price: "$99.00", description: "Claro network unlock for iPhone 16 series." },
    ],
  },
];
