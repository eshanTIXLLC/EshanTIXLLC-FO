"use client";

import { fetchData } from "@/api/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  setLoading: (loading: boolean) => void;
};

const HeaderNavigation = ({ setLoading }: Props) => {
  const [menusData, setMenusData] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [desktopDropdown, setDesktopDropdown] = useState<number | null>(null);

  const getCategoriesAndBrands = async () => {
    try {
      setLoading(true);
      setLoadingData(true);

      const [catRes, brandRes] = await Promise.all([
        fetchData({ url: `/customer/categories`, cache: "force-cache" }),
        fetchData({ url: `/customer/brands`, cache: "force-cache" }),
      ]);

      const categories = catRes?.data || [];
      const brands = brandRes?.data || [];

      const categoryMenu = {
        link: "/shop",
        title: "Categories",
        hasDropdown: true,
        dropdownItems: categories.map((cat: any) => ({
          link: `/shop?category=${cat.id}&price=1000000`,
          title: cat.name,
        })),
      };

      const brandMenu = {
        link: "/shop",
        title: "Brands",
        hasDropdown: true,
        dropdownItems: brands.map((brand: any) => ({
          link: `/shop?brand=${brand.id}&price=1000000`,
          title: brand.name,
        })),
      };

      // 🔥 Explicit & Fixed Order
      const orderedMenus = [
        { link: "/", title: "Home", hasDropdown: false },
        { link: "/about", title: "About Us", hasDropdown: false },
        categoryMenu,
        brandMenu,
        { link: "/contact", title: "Contact", hasDropdown: false },
      ];

      setMenusData(orderedMenus);
    } catch (error) {
      console.error("Navigation fetch error:", error);
    } finally {
      setLoading(false);
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getCategoriesAndBrands();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        background: "#ffffff",
        borderRadius: "50px",
        padding: "8px 14px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
      }}
    >
      {loadingData ? (
        <span
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            color: "#6b7280",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Loading...
        </span>
      ) : (
        menusData.map((item, idx) => (
          <div
            key={idx}
            style={{ position: "relative" }}
            onMouseEnter={() => setDesktopDropdown(idx)}
            onMouseLeave={() => setDesktopDropdown(null)}
          >
            <Link
              href={item.link}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "9px 22px",
                borderRadius: "30px",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 500,
                fontFamily: "'Poppins', sans-serif",
                whiteSpace: "nowrap",
                color: desktopDropdown === idx ? "#ffffff" : "#2b2b2b",
                background:
                  desktopDropdown === idx
                    ? "linear-gradient(135deg, #1c1b1a, #000000)"
                    : "transparent",
                boxShadow:
                  desktopDropdown === idx
                    ? "0 6px 16px rgba(0,0,0,0.35)"
                    : "none",
                transition: "all 0.3s ease",
              }}
            >
              {item.title}

              {item.hasDropdown && (
                <ChevronDown
                  size={16}
                  style={{
                    transition: "transform 0.3s ease",
                    transform:
                      desktopDropdown === idx
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  }}
                />
              )}
            </Link>

            {/* DROPDOWN */}
            {item.hasDropdown && desktopDropdown === idx && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 14px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#ffffff",
                  borderRadius: "14px",
                  padding: "10px",
                  minWidth: "230px",
                  maxHeight: "380px",
                  overflowY: "auto",
                  boxShadow:
                    "8px 8px 24px rgba(0,0,0,0.12), -8px -8px 24px rgba(255,255,255,0.8)",
                  zIndex: 999,
                }}
              >
                {item.dropdownItems.map((menu: any, i: number) => (
                  <Link
                    key={i}
                    href={menu.link}
                    style={{
                      display: "block",
                      padding: "10px 16px",
                      fontSize: "14px",
                      color: "#374151",
                      textDecoration: "none",
                      borderRadius: "10px",
                      transition: "all 0.25s ease",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, #f3f4f6, #ffffff)";
                      e.currentTarget.style.paddingLeft = "22px";
                      e.currentTarget.style.color = "#000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.paddingLeft = "16px";
                      e.currentTarget.style.color = "#374151";
                    }}
                  >
                    {menu.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default HeaderNavigation;
