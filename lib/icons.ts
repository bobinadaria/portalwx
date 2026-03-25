/**
 * Icon registry — Figma icon names → Lucide React components
 * Source: Figma file "Icon library Sharry UI 2021"
 *         https://www.figma.com/design/t0m1pI5iiyks53JZgbjdbS/
 *
 * Usage:
 *   import { getIcon } from "@/lib/icons";
 *   const Icon = getIcon("Icons/Add");  // returns LucideIcon
 *
 * Icons marked null have no direct Lucide equivalent → use custom SVG.
 */

import type { LucideIcon } from "lucide-react";
import {
  // Actions / Files
  Plus, Minus, Pencil, Copy, Trash2, Save,
  Upload, Download, Share,
  Printer,
  // Arrows
  ChevronRight, ChevronLeft, ChevronDown, ChevronUp,
  ArrowRight, ArrowLeft, ArrowDown, ArrowUp,
  ArrowUpDown, ArrowLeftRight,
  Maximize2, Minimize2,
  RefreshCw, RotateCcw,
  SkipBack, SkipForward,
  // States
  Check, X,
  CheckCircle, XCircle, CheckSquare, XSquare,
  CircleDot,
  Shield, ShieldCheck, ShieldX,
  Lock, Unlock,
  // Files / Documents
  StickyNote, FileText, FileDown, FileUp, FilePlus, FileMinus, FilePen,
  // UI / Navigation
  Search, Settings, SlidersHorizontal, Menu,
  GripVertical, MoreHorizontal,
  Home, Rocket, LogIn, LogOut,
  LayoutGrid, Layers, Columns, Rows, Filter,
  // Attention / Feedback
  Info, AlertCircle, AlertTriangle,
  Bell, BellRing,
  Lightbulb, Zap, Star, Heart, ThumbsUp,
  HelpCircle,
  // Communication
  Mail, Phone, Link, ExternalLink, MessageSquare, MessageCircle,
  Paperclip, Users, User, UserPlus,
  Linkedin, Facebook,
  Bluetooth, Camera, Mic, Volume1, Volume2, Wifi, WifiOff,
  // Media / Image
  Image, Video,
  // Charts
  LineChart, BarChart2,
  // Location / Map
  MapPin, Navigation, Globe,
  // Credentials / Access
  QrCode, Key, Bookmark, Flag, Wallet,
  // Misc
  Signal, Monitor, Tv, Laptop, Tablet, Smartphone,
  Building2, Clock, CalendarDays,
  // Loader
  Loader2,
} from "lucide-react";

export type SharryIconName = string;

/** Map from Figma icon name → Lucide component (null = no equivalent, needs custom SVG) */
const ICON_MAP: Record<string, LucideIcon | null> = {
  // ── Files / Actions ──────────────────────────────
  "Icons/Plus":             Plus,
  "Icons/Minus":            Minus,
  "Icons/Add":              Plus,
  "Icons/Edit":             Pencil,
  "Icons/Copy":             Copy,
  "Icons/Trash Bin":        Trash2,
  "Icons/Save":             Save,
  "Icons/Export":           Share,
  "Icons/Upload":           Upload,
  "Icons/Download":         Download,
  "Icons/Print":            Printer,
  "Icons/Print2":           Printer,

  // ── Documents ────────────────────────────────────
  "Icons/Note":             StickyNote,
  "Icons/Paper-Blank":      FileText,
  "Icons/Paper-Note":       FileText,
  "Icons/Paper-Draft":      FilePen,
  "Icons/Paper-Download":   FileDown,
  "Icons/Paper-Upload":     FileUp,
  "Icons/Paper-Add":        FilePlus,
  "Icons/Paper-Delete":     FileMinus,
  "Icons/Notebook":         FileText,

  // ── Clipboard ────────────────────────────────────
  "Icons/Clipboard-Text":   FileText,
  "Icons/Clipboard-Done":   CheckSquare,
  "Icons/Clipboard-Fail":   XSquare,
  "Icons/Clipboard-Add":    FilePlus,
  "Icons/Clipboard-Delete": FileMinus,

  // ── Arrows ───────────────────────────────────────
  "Icons/Arrow4-Right":     ChevronRight,
  "Icons/Arrow4-Left":      ChevronLeft,
  "Icons/Arrow4-Down":      ChevronDown,
  "Icons/Arrow4-Up":        ChevronUp,
  "Icons/Arrow1-Right":     ArrowRight,
  "Icons/Arrow1-Left":      ArrowLeft,
  "Icons/Arrow1-Down":      ArrowDown,
  "Icons/Arrow1-Up":        ArrowUp,
  "Icons/Arrow2-Right":     ArrowRight,
  "Icons/Arrow2-Left":      ArrowLeft,
  "Icons/Arrow2-Down":      ArrowDown,
  "Icons/Arrow2-Up":        ArrowUp,
  "Icons/Arrow3-Right":     ArrowRight,
  "Icons/Arrow3-Left":      ArrowLeft,
  "Icons/Arrow3-Down":      ArrowDown,
  "Icons/Arrow3-Up":        ArrowUp,
  "Icons/Arrow5-Down":      ChevronDown,
  "Icons/Arrow5-Up":        ChevronUp,
  "Icons/Arrow6-Left Skip": SkipBack,
  "Icons/Arrow6-Right Skip":SkipForward,
  "Icons/Direct-Right":     ArrowRight,
  "Icons/Direct-Left":      ArrowLeft,
  "Icons/Direct-Down":      ArrowDown,
  "Icons/Direct-Up":        ArrowUp,
  "Icons/Expand":           Maximize2,
  "Icons/Collapse":         Minimize2,
  "Icons/collapse":         Minimize2,
  "Icons/Maxmimalize":      Maximize2,
  "Icons/Update":           RefreshCw,
  "Icons/Revert":           RotateCcw,
  "Icons/Change":           ArrowLeftRight,

  // ── States ───────────────────────────────────────
  "Icons/Tick":             Check,
  "Icons/CancelSmall":      X,
  "Icons/closeBig":         X,
  "Icons/Tick-Circle":      CheckCircle,
  "Icons/Tick-Circle-Check":CheckCircle,
  "Icons/Tick-Circle-Blank":CircleDot,
  "Icons/Tick-Circle-Full": CheckCircle,
  "Icons/X-Circle":         XCircle,
  "Icons/Tick-Square":      CheckSquare,
  "Icons/X-Square":         XSquare,
  "Icons/Shield":           Shield,
  "Icons/Shield-Done":      ShieldCheck,
  "Icons/Shield-Fail":      ShieldX,
  "Icons/Lock":             Lock,
  "Icons/Unlock":           Unlock,
  "Icons/Bullet":           CircleDot,
  "Icons/Dot":              CircleDot,
  "Icons/Signal OK":        Signal,
  "Icons/Plate Active":     null, // custom

  // ── Drawer states ────────────────────────────────
  "Icons/Drawer-Add":       FilePlus,
  "Icons/Drawer-Delete":    FileMinus,
  "Icons/Drawer-Fail":      XCircle,
  "Icons/Drawer-Done":      CheckCircle,

  // ── Attention / Feedback ─────────────────────────
  "Icons/Info-Circle":            Info,
  "Icons/Info-Triangle":          Info,
  "Icons/Menu About":             Info,
  "Icons/Attention-Circle":       AlertCircle,
  "Icons/Attention-Circle-Full":  AlertCircle,
  "Icons/AttentionTriangle":      AlertTriangle,
  "Icons/risk":                   AlertTriangle,
  "Icons/Question_small":         HelpCircle,
  "Icons/Question_big":           HelpCircle,
  "Icons/Question_CircleFull_small": HelpCircle,
  "Icons/Question_CircleFull_big":   HelpCircle,
  "Icons/Bell":                   Bell,
  "Icons/Notification":           BellRing,
  "Icons/New":                    Star,
  "Icons/Lamp":                   Lightbulb,
  "Icons/Bulb":                   Lightbulb,
  "Icons/star":                   Star,
  "Icons/Flash":                  Zap,
  "Icons/Heart":                  Heart,
  "Icons/Magic Wand":             null,   // custom
  "Icons/Thumb up":               ThumbsUp,
  "Icons/Trh":                    null,   // custom

  // ── Communication ────────────────────────────────
  "Icons/Email":                  Mail,
  "Icons/Call":                   Phone,
  "Icons/Link_small":             Link,
  "Icons/Link_big":               Link,
  "Icons/LinkOutside_small":      ExternalLink,
  "Icons/LinkOutside_big":        ExternalLink,
  "Icons/Message":                MessageSquare,
  "Icons/Attach":                 Paperclip,
  "Icons/Chat":                   MessageCircle,
  "Icons/Speech":                 MessageCircle,
  "Icons/Speech Group":           MessageCircle,
  "Icons/LinkedIn":               Linkedin,
  "Icons/Facebook":               Facebook,
  "Icons/Bluetooth":              Bluetooth,
  "Icons/Camera":                 Camera,
  "Icons/Voice":                  Mic,
  "Icons/Volume":                 Volume2,
  "Icons/Volume-Low":             Volume1,
  "Icons/Volume-High":            Volume2,
  "Icons/NFC":                    null,   // custom

  // ── Navigation / UI ──────────────────────────────
  "Icons/Search":                 Search,
  "Icons/Search2":                Search,
  "Icons/Setting":                Settings,
  "Icons/Slider":                 SlidersHorizontal,
  "Icons/Dots":                   MoreHorizontal,
  "Icons/Mobile menu":            Menu,
  "Icons/reorder":                GripVertical,
  "Icons/Progress":               Loader2,
  "Icons/Rocket":                 Rocket,
  "Icons/Rocket 2":               Rocket,
  "Icons/Login":                  LogIn,
  "Icons/Leave":                  LogOut,
  "Icons/InOutOn":                LogIn,
  "Icons/InOutOff":               LogOut,
  "Icons/Save (2)":               Save,
  "Icons/Home":                   Home,
  "Icons/Home_selected":          Home,
  "Icons/Compass":                Navigation,
  "Icons/Compass_selected":       Navigation,
  "Icons/Profile":                User,
  "Icons/Profile_selected":       User,
  "Icons/About":                  Info,
  "Icons/About_selected":         Info,
  "Icons/Amenities":              LayoutGrid,
  "Icons/Amenities_selected":     LayoutGrid,

  // ── Layout ───────────────────────────────────────
  "Icons/Category":               LayoutGrid,
  "Icons/Category2":              Layers,
  "Icons/Column":                 Columns,
  "Icons/Row":                    Rows,
  "Icons/Filter":                 Filter,
  "Icons/filter_12px":            Filter,
  "Icons/filter_adjust":          SlidersHorizontal,
  "Icons/close_12px":             X,
  "Icons/close_module":           X,

  // ── Charts ───────────────────────────────────────
  "Icons/Graph":                  LineChart,
  "Icons/Chart":                  BarChart2,
  "Icons/Chart-Square":           BarChart2,
  "Icons/TV":                     Tv,
  "Icons/Monitor":                Monitor,
  "Icons/Monitor2":               Monitor,

  // ── Person ───────────────────────────────────────
  "Icons/User":                   User,
  "Icons/User_Add":               UserPlus,
  "Icons/Users":                  Users,
  "Icons/Group":                  Users,
  "Icons/Women":                  User,
  "Icons/Emoji_Smile":            null,   // custom
  "Icons/Emoji_Sad":              null,   // custom
  "Icons/Emoji_Poker":            null,   // custom
  "Icons/Emoji_Surprised":        null,   // custom
  "Icons/rate":                   Star,
  "Icons/rate2":                  Star,
  "Icons/rate3":                  Star,
  "Icons/rate4":                  Star,
  "Icons / rate 5 32px":          Star,

  // ── Credentials / Access ─────────────────────────
  "Icons/biometric":              null,   // custom
  "Icons/PlasticCard":            null,   // custom
  "Icons/Watch2":                 null,   // custom — smartwatch
  "Icons/phone_iPhone":           Smartphone,
  "Icons/QR code":                QrCode,
  "Icons/smartphone":             Smartphone,
  "Icons/Phone":                  Phone,
  "Icons/smartphone_check":       Smartphone,
  "Icons/smartwatch":             null,   // custom
  "Icons/smartwatch_check":       null,   // custom
  "Icons/smartcard":              null,   // custom
  "Icons/Tablet":                 Tablet,
  "Icons/Mobile":                 Smartphone,
  "Icons/Scan":                   QrCode,
  "Icons/Scan2":                  QrCode,
  "Icons/SPZ":                    null,   // custom — license plate
  "Icons/wallet":                 Wallet,
  "wallet_ios":                   Wallet,
  "Icons/Key":                    Key,

  // ── Booking / Time ───────────────────────────────
  "Icons/Clock":                  Clock,
  "Icons/Clock 2":                Clock,
  "Icons/Clock-Square":           Clock,
  "Icons/Calendar":               CalendarDays,
  "Icons/desk":                   null,   // custom
  "Icons/booking":                CalendarDays,
  "Icons/hours":                  Clock,

  // ── Location / Map ───────────────────────────────
  "Icons/Location":               MapPin,
  "Icons/GPS":                    Navigation,
  "Icons/locationMap":            MapPin,
  "Icons/room":                   null,   // custom

  // ── Building ─────────────────────────────────────
  "Icons/Building":               Building2,
  "Icons/Building2":              Building2,
  "Icons/building":               Building2,

  // ── Files / Media ────────────────────────────────
  "Icons/Image":                  Image,
  "Icons/Image2":                 Image,
  "Icons/Video":                  Video,
  "Icons/Movie":                  Video,
  "Icons/Movie2":                 Video,
  "Icons/Ticket":                 null,   // custom
  "Icons/Gaming":                 null,   // custom
  "Icons/NoImg":                  Image,

  // ── Misc / Social ────────────────────────────────
  "Icons/Sharry":                 null,   // custom — brand mark
  "Icons/Bag":                    null,   // custom
  "Icons/Bag2":                   null,   // custom
  "Icons/Shop":                   null,   // custom
  "Icons/Lable":                  null,   // custom
  "Icons/Lables":                 null,   // custom
  "Icons/Signal":                 Signal,
  "Icons/Tick-Square-Empty":      CheckSquare,
  "Icons/Maintenance":            Settings,
  "Icons/Wifi":                   Wifi,
  "Icons/wlan":                   Wifi,
  "Icons/wlanNone":               WifiOff,
  "Icons/Globe":                  Globe,
  "Icons/globe":                  Globe,
  "Icons/Bookmark":               Bookmark,
  "Icons/bookmark":               Bookmark,
  "Icons/bookmarkFill":           Bookmark,
  "Icons/flag":                   Flag,
  "Icons/feedback":               MessageSquare,
  "Icons/feedbackFill":           MessageSquare,
  "Icons/supportCircle":          HelpCircle,
  "Icons/supportCircleFill":      HelpCircle,
  "Icons/voteUp":                 ThumbsUp,
  "Icons/voteDown":               null,   // ThumbsDown — not in lucide-react <0.500
  "Icons/outlets":                null,   // custom
  "Icons/currency":               null,   // custom
  "Icons/accessibility":          null,   // custom
  "Icons/cafe":                   null,   // custom
  "Icons/terrace":                null,   // custom
  "Icons/gym":                    null,   // custom
  "Icons/Article":                FileText,
  "Icons/badgeOn":                null,   // custom
  "Icons/loading":                Loader2,
  "Icons/checkbox":               CheckSquare,
  "Icons/checkboxOn":             CheckSquare,
  "Icons/checkboxOnFill":         CheckSquare,
  "Icons/category":               LayoutGrid,
  "Icons/cloud_download":         Download,
  "Icons/file_archive":           null,   // custom
  "Icons/alert_bell ":            BellRing,
  "Icons/gallery":                Image,

  // ── Numbers (step indicators) ────────────────────
  "Icons/Step1":                  null,   // custom numbered circle
  "Icons/Step2":                  null,
  "Icons/Step3":                  null,
  "Icons/Step4":                  null,
  "Icons/Step5":                  null,
  "Icons/numbers":                null,

  // ── Transport ────────────────────────────────────
  "Icons/car":                    null,   // custom
  "Icons/transport_auto":         null,
  "Icons/transportTaxi":          null,
  "Icons/transportBus":           null,
  "Icons/transportTrain":         null,
  "Icons/transportUnderground":   null,
  "Icons/transportRail":          null,
  "Icons/TransportTram":          null,

  // ── Travel / Destinations ────────────────────────
  "Icons/travelApproved":         CheckCircle,
  "Icons/travelApprovedFill":     CheckCircle,
  "Icons/travelPending":          Clock,
  "Icons/travelPendingFill":      Clock,
  "Icons/travelRestricted":       AlertCircle,
  "Icons/travelRestrictedFill":   AlertCircle,
  "Icons/travelDenied":           XCircle,
  "Icons/travelDeniedFill":       XCircle,
  "Icons/accessNone":             Lock,
  "Icons/accessPending":          Clock,
  "Icons/AccessLock":             Lock,
  "Icons/access":                 Unlock,

  // ── Weather (custom SVGs — no Lucide match) ──────
  "Icons/weatherZatazeno":        null,
  "Icons/weatherPolojasno":       null,
  "Icons/weatherSlunecno":        null,
  "Icons/weatherDestmirny":       null,
  "Icons/weatherDest":            null,
  "Icons/weatherSnihmirny":       null,
  "Icons/weatherSnih":            null,
  "Icons/weatherBourky":          null,
  "Icons/weatherVitr":            null,
  "Icons/weatherMlha":            null,
  "Icons/Sun":                    null,
  "Icons/Moon":                   null,
  "Icons/weather":                null,
};

/**
 * Get the Lucide component for a Figma icon name.
 * Returns null if the icon requires a custom SVG (not in Lucide).
 */
export function getIcon(name: SharryIconName): LucideIcon | null {
  return ICON_MAP[name] ?? null;
}

/**
 * Check whether a Figma icon has a Lucide equivalent.
 */
export function hasIcon(name: SharryIconName): boolean {
  return !!ICON_MAP[name];
}

/**
 * All registered Figma icon names.
 */
export const ICON_NAMES = Object.keys(ICON_MAP) as SharryIconName[];

/**
 * Icons that need custom SVG (no Lucide equivalent).
 */
export const CUSTOM_ICON_NAMES = ICON_NAMES.filter((n) => ICON_MAP[n] === null);
