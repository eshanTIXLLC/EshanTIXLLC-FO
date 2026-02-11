import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { Metadata } from "next";
import LoginForm from "@/components/forms/login-form";
import Footer from "@/layout/footers/footer";
import { Suspense } from "react";
import Loading from "../loading";
import AnnouncementBar from "@/utils/AnnouncementBar";

export const metadata: Metadata = {
  title: "Login - ESHAN TIX LLC",
  description: "Sign in to your ESHAN TIX LLC account and continue shopping",
};

export default function Login() {
  return (
    <Wrapper>
      <AnnouncementBar />
      <Header />

      <main style={{ backgroundColor: "#ffffff", minHeight: "100vh", paddingBottom: "80px" }}>
        <Suspense fallback={<Loading />}>
          {/* Spacer for fixed header */}
          <div style={{ height: "160px" }}></div>

          {/* Login Section */}
          <section style={{ paddingTop: "0", paddingBottom: "80px" }}>
            <LoginForm />
          </section>
        </Suspense>
      </main>

      <Footer />
    </Wrapper>
  );
}