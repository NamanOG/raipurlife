import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuickActions from "@/components/QuickActions";
import Categories from "@/components/Categories";
import FeaturedPlaces from "@/components/FeaturedPlaces";
import LocalStories from "@/components/LocalStories";
import CommunityReviews from "@/components/CommunityReviews";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import QuirkyMarquee from "@/components/QuirkyMarquee";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header overlay />
      <div className="relative flex h-[100svh] min-h-[100svh] flex-col overflow-hidden">
        <Hero />
        <QuirkyMarquee
          variant={2}
          palette="teal"
          items={[
            "Raipur sunrise routes",
            "Street chai culture",
            "Museum afternoons",
            "Lakefront evenings",
            "Community-first city guide",
          ]}
        />
      </div>
      <QuickActions />
      <Categories />
      <FeaturedPlaces />
      <LocalStories />
      <CommunityReviews />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
