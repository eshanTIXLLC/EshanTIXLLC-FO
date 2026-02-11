"use client";
import { fetchData } from "@/api/api";
import { mobile_menus } from "@/data/menu-data";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UrlObject } from "url";

// prop type
type IProps = {
  openMobileMenus: boolean;
  setOpenMobileMenus: React.Dispatch<React.SetStateAction<boolean>>;
};

const OffCanvas = ({ openMobileMenus, setOpenMobileMenus }: IProps) => {
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [menusData, setMenusData] = useState<any[]>([]);

  const getCategoriesAndBrands = async () => {
    try {
      const [catRes, brandRes] = await Promise.all([
        fetchData({ url: `/customer/categories`, cache: "force-cache" }),
        fetchData({ url: `/customer/brands`, cache: "force-cache" }),
      ]);

      const categories = catRes?.data || [];
      const brands = brandRes?.data || [];

      const categoryMenu = {
        title: "Category",
        hasDropdown: true,
        megamenu: false,
        dropdownMenu: categories.map((cat: any) => ({
          title: cat.name,
          link: `/shop?category=${cat.id}&price=1000000`,
          dropdownMenu: cat.subcategory?.map((sub: any) => ({
            title: sub.name,
            link: `/shop?category=${sub.categoryId}&price=1000000`,
          })),
        })),
      };

      const brandMenu = {
        title: "Brand",
        hasDropdown: true,
        megamenu: false,
        dropdownMenu: brands.map((brand: any) => ({
          title: brand.name,
          link: `/shop?brand=${brand.id}&price=1000000`,
        })),
      };

      // Ensure Home & About Us exist in mobile_menus
      const homeMenu = mobile_menus.find((menu) => menu.title === "Home");
      const aboutMenu = mobile_menus.find((menu) => menu.title === "About Us");
      const contactMenu = mobile_menus.find((menu) => menu.title === "Contact");

      // Final menu order
      setMenusData([
        homeMenu || { title: "Home", link: "/" },
        aboutMenu || { title: "About Us", link: "/about" },
        categoryMenu,
        brandMenu,
        contactMenu || { title: "Contact", link: "/contact" },
      ]);
    } catch (err) {
      console.error("Error fetching categories or brands:", err);

      // fallback with Home, About Us, Contact
      setMenusData([
        { title: "Home", link: "/" },
        { title: "About Us", link: "/about-us" },
        { title: "Contact", link: "/contact" },
      ]);
    }
  };

  useEffect(() => {
    getCategoriesAndBrands();
  }, []);

  const toggleMenu = (title: string) => {
    setActiveMenu(activeMenu === title ? "" : title);
  };

  return (
    <>
    
      <section
        className={`extra__info transition-3 ${
          openMobileMenus ? "info-opened" : ""
        }`}
      >
        <div className="extra__info-inner">
          <div className="extra__info-close text-end">
            <button
              onClick={() => setOpenMobileMenus(false)}
              className="extra__info-close-btn cursor-pointer"
            >
              <i className="fal fa-times"></i>
            </button>
          </div>

          <nav className="side-mobile-menu d-block d-lg-none mm-menu">
            <ul>
              {menusData.map((menu, i) => (
                <li
                  key={i}
                  className={`${
                    menu.dropdownMenu ? "menu-item-has-children has-droupdown" : ""
                  } ${activeMenu === menu.title ? "active" : ""}`}
                >
                  {menu.dropdownMenu ? (
                    <a onClick={() => toggleMenu(menu.title)}>{menu.title}</a>
                  ) : (
                    <Link href={menu.link!}>{menu.title}</Link>
                  )}

                  {menu.dropdownMenu && (
                    <ul className={`sub-menu ${activeMenu === menu.title ? "active" : ""}`}>
                      {menu.dropdownMenu.map((sub: { link: string | UrlObject; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; dropdownMenu: any[]; }, index: React.Key | null | undefined) => (
                        <li key={index}>
                          <Link href={sub.link}>{sub.title}</Link>

                          {sub.dropdownMenu && (
                            <ul className="sub-sub-menu">
                              {sub.dropdownMenu.map((subSub: any, idx: number) => (
                                <li key={idx}>
                                  <Link href={subSub.link}>{subSub.title}</Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <div
        onClick={() => setOpenMobileMenus(false)}
        className={`body-overlay transition-3 ${openMobileMenus ? "opened" : ""}`}
      ></div>
    </>
  );
};

export default OffCanvas;
