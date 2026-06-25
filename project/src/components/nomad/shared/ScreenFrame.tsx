import { images } from "../data/content";

type ScreenFrameProps = {
  children: React.ReactNode;
  bg?: string;
};

export function ScreenFrame({ children, bg = images.steppe }: ScreenFrameProps) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#fcf9f8] pt-24 text-[#1c1b1b] dark:bg-[#101312] dark:text-[#f3f0ef]">
      <div className="fixed inset-0 z-0 bg-cover bg-center opacity-45 dark:opacity-25" style={{ backgroundImage: `url(${bg})` }} />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#fcf9f8]/70 via-[#fcf9f8]/80 to-[#fcf9f8] dark:from-[#101312]/55 dark:via-[#101312]/84 dark:to-[#101312]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-32 md:px-10">{children}</div>
    </main>
  );
}
