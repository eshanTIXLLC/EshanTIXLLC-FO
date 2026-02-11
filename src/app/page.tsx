import Brands from "@/components/brands/brand-area";
import HeroSliderOne from "@/components/hero-banner/hero-banner-one";
import TrendingProducts from "@/components/products/trending-products";
import ShopCategory from "@/components/shop/shop-category";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";

import { fetchData } from "@/api/api";

import SaleOffProducts from "@/components/products/sale-off-products";
import SubscribeArea from "@/components/subscribe-area";
import Footer from "@/layout/footers/footer";
import { Suspense } from "react";
import Loading from "./loading";
import InstructionCard3DWithIcons from "@/utils/instuction";
import ShopFeatures3D from "@/utils/Feature";
import LookBookSection from "@/utils/LookBookSection";
import FeatureCards from "@/utils/utils/FeatureCards";
import OrderProcess from "@/utils/utils/OrderProcess";
import AnnouncementBar from "@/utils/AnnouncementBar";
import ImageGallery from "@/utils/utils/ImageGallery";

export default async function HomePage() {
  const banners = await fetchData({
    url: "/customer/banners",
    cache: "force-cache",
  });

  const categories = await fetchData({
    url: `/customer/categories?skip=0&take=5`,
    cache: "force-cache",
  });

  const trendingProducts = await fetchData({
    url: `/customer/trending-products?limit=500&page=1`,
    cache: "force-cache",
  });

  const featuredProducts = await fetchData({
    url: `/customer/featured-products?limit=500&page=1`,
    cache: "force-cache",
  });

  const brands = await fetchData({
    url: `/customer/brands?skip=0&take=10`,
    cache: "force-cache",
  });

    const announcementHeight = 40; // height of AnnouncementBar

  return (
    <Wrapper>
      {/* Fixed announcement bar */}
      <AnnouncementBar />

      {/* Add top margin equal to AnnouncementBar height */}
      <div style={{ marginTop: `${announcementHeight}px` }}>
        <Header />
        <br></br>
                <br></br>

        <br></br>
                <br></br>
                   


      <main>
        <Suspense fallback={<Loading />}>
          {/* Hero Banner */}
          {banners?.data?.length > 0 && <HeroSliderOne />}

          <ImageGallery />

          {/* Shop Categories */}
          {categories?.data?.length > 0 && <ShopCategory categories={categories?.data} />}

          {/* Trending Products */}
          {trendingProducts?.data?.length > 0 && (
            <TrendingProducts trendingProd={trendingProducts?.data} />


          )}

               {/* <LookBookSection/> */}

                   
      
   
          {/* Sale/Featured Products */}
       <SaleOffProducts
  products={[]}
  featuredProducts={featuredProducts?.data}
/>
          {/* Brands
          // {brands?.data?.length > 0 && <Brands brands={brands?.data} />} */}

           {/* <FeatureCards/>


<OrderProcess/> */}


          {/* Subscribe Area */}
          <SubscribeArea />

              {/* <InstructionCard3DWithIcons/>       */}
        </Suspense>
      </main>

      <Footer />
      </div>
    </Wrapper>
  );
}
