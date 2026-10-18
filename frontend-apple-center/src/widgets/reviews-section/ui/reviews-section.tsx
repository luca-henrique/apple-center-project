import { REVIEWS } from "@/entities/review";
import { ReviewCard } from "@/entities/review/ui/review-card";

export function ReviewsSection() {
  return (
    <section id="avaliacoes" className="w-full max-w-7xl mx-auto px-gutter my-space-lg scroll-mt-20">
      <div className="flex items-center justify-between mb-space-sm flex-wrap gap-2">
        <div>
          <h2 className="font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md font-bold text-on-surface">
            Avaliações Verificadas
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Quem compra na Apple Center recomenda e comprova
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface">
          <span className="material-symbols-outlined text-amber-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
          <span className="font-label-md text-label-md font-bold">4.9 / 5</span>
          <span className="font-body-sm text-[12px] text-on-surface-variant">• 15.420 clientes satisfeitos</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REVIEWS.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
