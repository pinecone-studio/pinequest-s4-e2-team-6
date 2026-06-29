import { images } from "../data/content";

type ScreenFrameProps = {
  children: React.ReactNode;
  bg?: string;
};

export function ScreenFrame({ children, bg = images.steppe }: ScreenFrameProps) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f4efe6] pt-20 text-[#16130f] dark:bg-[#080b0d] dark:text-[#f3efe8] sm:pt-24">
      {/* Photographic base, kept faint so the aurora + glass read clearly */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center opacity-30 dark:opacity-20"
        style={{ backgroundImage: `url(${bg})` }}
      />
      {/* Animated aurora blobs */}
      <div className="aurora">
        <span className="aurora-blob b1" />
        <span className="aurora-blob b2" />
        <span className="aurora-blob b3" />
      </div>
      {/* Readability wash */}
      <div className="fixed inset-0 z-0 bg-linear-to-b from-[#f4efe6]/55 via-[#f4efe6]/78 to-[#f4efe6] dark:from-[#080b0d]/45 dark:via-[#080b0d]/82 dark:to-[#080b0d]" />
      <div className="grain" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-32 sm:px-6 md:px-10">
        {children}
      </div>
    </main>
  );
}
