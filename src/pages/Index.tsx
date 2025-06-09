
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedPlaces from "@/components/FeaturedPlaces";
import CommunityReviews from "@/components/CommunityReviews";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Categories />
      <FeaturedPlaces />
      <CommunityReviews />
      <Footer />
    </div>
  );
};

export default Index;
