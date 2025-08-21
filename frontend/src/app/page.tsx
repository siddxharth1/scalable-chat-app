import FeatureSection from "@/components/base/FeatureSection";
import Footer from "@/components/base/Footer";
import HeroSection from "@/components/base/HeroSections";
import Navbar from "@/components/base/Navbar";
import UserReviews from "@/components/base/UserReview";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <div className="">
      <Navbar user={session?.user ?? null} />
      <HeroSection />
      <FeatureSection />
      <UserReviews />
      <Footer />
    </div>
  );
}
