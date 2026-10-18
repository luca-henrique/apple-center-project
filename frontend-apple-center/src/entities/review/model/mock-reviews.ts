import type { Review } from "./types";

export const REVIEWS: Review[] = [
  {
    id: "review-1",
    author: "Matheus Silva",
    initials: "MS",
    rating: 5,
    comment:
      '"Comprei o iPhone 15 Pro seminovo e parece novo de fábrica! Bateria 100% real, laudo técnico no e-mail e chegou em 24h em SP."',
    verifiedLabel: "Comprador Verificado • iPhone 15 Pro",
  },
  {
    id: "review-2",
    author: "Camila Lacerda",
    initials: "CL",
    rating: 5,
    comment:
      '"O trade-in do meu iPhone 12 foi absurdamente rápido. Peguei um 14 Pro pagando só a diferença. Garantia de 1 ano me deu total paz."',
    verifiedLabel: "Comprador Verificado • Trade-in",
  },
];
