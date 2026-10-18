import React from "react";
import type { Review } from "../model/types";

export interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-outline-variant/15 flex flex-col justify-between">
      <div>
        {/* Star Rating */}
        <div
          className="flex items-center gap-0.5 text-amber-500 mb-2"
          aria-label={`Avaliação: ${review.rating} de 5 estrelas`}
        >
          {Array.from({ length: review.rating }).map((_, i) => (
            <span
              key={i}
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
              aria-hidden="true"
            >
              star
            </span>
          ))}
        </div>

        {/* Comment Text */}
        <p className="font-body-md text-body-md text-on-surface italic mb-4 leading-relaxed">
          {review.comment}
        </p>
      </div>

      {/* Author and Verification */}
      <div className="flex items-center gap-2.5 pt-2 border-t border-outline-variant/10">
        <div
          className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-bold flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          {review.initials}
        </div>
        <div className="flex flex-col">
          <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">
            {review.author}
          </span>
          <span className="font-label-sm text-[11px] text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-secondary text-[12px]" aria-hidden="true">
              verified
            </span>
            {review.verifiedLabel}
          </span>
        </div>
      </div>
    </article>
  );
}
