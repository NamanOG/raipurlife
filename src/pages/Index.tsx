
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuickActions from "@/components/QuickActions";
import Categories from "@/components/Categories";
import FeaturedPlaces from "@/components/FeaturedPlaces";
import LocalStories from "@/components/LocalStories";
import CommunityReviews from "@/components/CommunityReviews";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
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
