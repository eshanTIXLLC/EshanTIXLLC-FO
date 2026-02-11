import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { Metadata } from "next";
// import Breadcrumb from "@/components/common/breadcrumb";
import ProfileArea from "@/components/account/profile-area";
import ProfileMenuArea from "@/components/account/profile-menu-area";
import Footer from "@/layout/footers/footer";
import { Suspense } from "react";
import Loading from "../loading";
import AnnouncementBar from "@/utils/AnnouncementBar";

export const metadata: Metadata = {
  title: "Account Page",
};

export default function AccountPage() {
  return (
    <Wrapper>

      <AnnouncementBar />
      {/* header start */}
      <Header />
      {/* header end */}

      <main>
            <section style={{ paddingTop: "0", paddingBottom: "80px" }}></section>
        <Suspense fallback={<Loading />}>
          {/* breadcrumb start */}
          {/* <Breadcrumb title="Account" subtitle="Account" /> */}
          {/* breadcrumb end */}

          {/* profile area start */}
          <ProfileArea />
          {/* profile area end */}

          {/* profile menu area start */}
          <ProfileMenuArea />
          {/* profile menu area end */}
        </Suspense>
      </main>

      {/* footer start */}
      <Footer />
      {/* footer end */}
    </Wrapper>
  );
}
