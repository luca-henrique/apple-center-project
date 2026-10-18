interface GalleryFloatingBadgesProps {
  batteryHealth: string;
  gradeTag: string;
}

export function GalleryFloatingBadges({
  batteryHealth,
  gradeTag,
}: GalleryFloatingBadgesProps) {
  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm font-bold bg-secondary text-on-secondary shadow-md">
        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
          battery_charging_full
        </span>
        <span>{batteryHealth}</span>
      </span>
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-label-sm font-bold bg-primary text-on-primary shadow-md">
        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
          verified
        </span>
        <span>{gradeTag}</span>
      </span>
    </div>
  );
}
