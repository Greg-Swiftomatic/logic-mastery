import { redirect } from "next/navigation";

export default function ModulePage({ params }: { params: { slug: string } }) {
  // Redirect to lesson tab by default
  redirect(`/module/${params.slug}/lesson`);
}
