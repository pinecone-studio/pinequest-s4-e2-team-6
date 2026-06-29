import { images } from "../data/content";

/**
 * Full-bleed cinematic backdrop. A golden-hour steppe photo with a slow
 * Ken Burns drift plus warm + vertical gradients, so a still image breathes
 * like film and headline text stays readable. (Drop a video at /hero.mp4 and
 * swap the <div> for a <video> to go fully motion.)
 */
export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="animate-kenburns absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images.steppe})` }}
      />
      {/* golden-hour wash */}
      <div className="absolute inset-0 bg-linear-to-tr from-[#ef7d3a]/35 via-transparent to-[#6bcbff]/25 mix-blend-soft-light" />
      {/* readability gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-[#08111c]/55 via-[#08111c]/35 to-[#f4eede] dark:to-[#08111c]" />
      {/* cinematic vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(8,17,28,0.55)]" />
    </div>
  );
}
