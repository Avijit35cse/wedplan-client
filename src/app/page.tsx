import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";
import SectionHeading from "@/components/shared/section-heading";
import HomeHero from "@/components/marketing/home-hero";
import HomeIntro from "@/components/marketing/home-intro";
import CategoryGrid from "@/components/marketing/category-grid";
import FeaturedServices, {
  FeaturedServicesSkeleton,
} from "@/components/marketing/featured-services";
import GallerySection from "@/components/marketing/gallery-section";
import PlanningPaths from "@/components/marketing/planning-paths";
import HowItWorks from "@/components/marketing/how-it-works";
import FinalCta from "@/components/marketing/final-cta";
import { getSession } from "@/lib/get-session";
import { SERVICES_HREF, type NavUser } from "@/lib/navigation";

async function SiteHeaderSlot() {
  const session = await getSession();

  const user: NavUser | null = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        role: String(session.user.role ?? "customer"),
        image: session.user.image ?? null,
      }
    : null;

  return <SiteHeader user={user} />;
}

export default function Home() {
  return (
    <>
      <Suspense
        fallback={
          <div
            aria-hidden
            className="fixed inset-x-0 top-0 z-50 h-20 xl:h-24"
          />
        }
      >
        <SiteHeaderSlot />
      </Suspense>

      <main>
        <HomeHero />
        <HomeIntro />
        <CategoryGrid />

        <section className="section-y bg-background">
          <div className="container-wedding">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Newly listed"
                title={
                  <>
                    Recently added{" "}
                    <span className="script-accent">services</span>.
                  </>
                }
                description="The latest vendors to join WedPlan, each one reviewed and approved before appearing here."
              />

              <Link
                href={SERVICES_HREF}
                className="group inline-flex shrink-0 items-center gap-3 border-b border-ink/30 pb-2 text-[0.68rem] font-semibold tracking-[0.18em] text-ink uppercase transition-colors hover:border-gold hover:text-gold"
              >
                View the directory
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="mt-12">
              <Suspense fallback={<FeaturedServicesSkeleton />}>
                <FeaturedServices />
              </Suspense>
            </div>
          </div>
        </section>

        <GallerySection />
        <PlanningPaths />
        <HowItWorks />
        <FinalCta />
      </main>

      <SiteFooter />
    </>
  );
}
