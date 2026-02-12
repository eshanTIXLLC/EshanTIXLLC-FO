import RegisterForm from "@/components/forms/register-form";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../loading";
import AnnouncementBar from "@/utils/AnnouncementBar";

export const metadata: Metadata = {
  title: "Create an Account - ESHAN TIX LLC",
  description: "Join ESHAN TIX LLC and start your shopping journey today",
};

export default function RegisterPage() {
  return (
    <Wrapper>
      <AnnouncementBar />
      <Header />

      <main style={{ backgroundColor: "#ffffff", minHeight: "100vh", paddingBottom: "80px" }}>
        <Suspense fallback={<Loading />}>
          {/* Spacer for fixed header */}
          <div style={{ height: "140px" }}></div>

          {/* Register Section */}
          <section style={{ paddingTop: "0", paddingBottom: "80px" }}>
            <RegisterForm />
          </section>
        </Suspense>
      </main>

      <Footer />
    </Wrapper>
  );
}