import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppShell from "@/components/layout/AppShell";
import BadgeToast from "@/components/ui/BadgeToast";
import ThemeSettingsApplier from "@/components/ThemeSettingsApplier";
import ReminderRunner from "@/components/ReminderRunner";
import LevelUpModal from "@/components/ui/LevelUpModal";
import MilestoneModal from "@/components/ui/MilestoneModal";
import LofiPlayer from "@/components/ui/LofiPlayer";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import ReadingProgressBar from "@/components/ui/ReadingProgressBar";
import KeyboardShortcutsModal from "@/components/ui/KeyboardShortcutsModal";
import PomodoroTimer from "@/components/ui/PomodoroTimer";
import AIHelper from "@/components/ui/AIHelper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodLearn - Aprenda Programacao do Zero",
  description: "Plataforma de estudos de programacao para iniciantes em Engenharia da Computacao.",
  manifest: "/manifest.json",
  themeColor: "#16a34a",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CodLearn",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReadingProgressBar />
          <BackgroundPattern />
          <ThemeSettingsApplier />
          <ReminderRunner />
          <AppShell>{children}</AppShell>
          <BadgeToast />
          <LevelUpModal />
          <MilestoneModal />
          <LofiPlayer />
          <PomodoroTimer />
          <KeyboardShortcutsModal />
          <AIHelper />
        </ThemeProvider>
      </body>
    </html>
  );
}
