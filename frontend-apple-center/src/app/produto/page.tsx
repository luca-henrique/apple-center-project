import { redirect } from "next/navigation";
import { IPHONE_15_PRO_MAX } from "@/entities/product";

export default function ProdutoIndexPage() {
  redirect(`/produto/${IPHONE_15_PRO_MAX.slug}`);
}
