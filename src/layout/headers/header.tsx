"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useCookies } from "next-client-cookies";
import { ShoppingCart, Heart, Search, Menu, Truck, User, Home, ChevronDown } from "lucide-react";
import Loader from "@/components/Loader";
import useCartInfo from "@/hooks/use-cart-info";
import useSticky from "@/hooks/use-sticky";
import HeaderNavigation from "./HeaderNavigation";

const OffCanvas = dynamic(() => import("@/components/common/offcanvas"), { ssr: false });
const MiniCart = dynamic(() => import("./header-com/mini-cart"), { ssr: false });
const TrackOrderModal = dynamic(() => import("@/utils/TrackOrderModal"), { ssr: false });
const SearchPopup = dynamic(() => import("./header-com/search-popup"), { ssr: false });

type IProps = {
  white_bg?: boolean;
};

const Header = ({ white_bg }: IProps) => {
  const cookies = useCookies();
  const { sticky } = useSticky();
  const { quantity } = useCartInfo();

  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showTrack, setShowTrack] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  const userDropdownRef = useRef<HTMLDivElement>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);


  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleClickOutside = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
  if (!mounted) return;

  const token = cookies.get("token");
  const userinfo = cookies.get("userinfo");

  setIsLoggedIn(!!token && !!userinfo);
  if (userinfo) {
    setUserData(typeof userinfo === "string" ? JSON.parse(userinfo) : userinfo);
  }
}, [mounted, cookies]);

  const handleCartClick = () => {
    if (quantity > 0) setShowCart(!showCart);
  };

  const handleLogout = () => {
  cookies.remove("userinfo");
  cookies.remove("token");
  setIsLoggedIn(false);
};

  return (
    <>
      {loading && <Loader />}

      <header
        style={{
          position: "fixed",
          top: "36px", // announcement bar height
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 9999,
          background: white_bg ? "#fff" : "#fafafa",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
          transition: "all 0.3s ease",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: isMobile ? "12px 16px" : "16px 40px",
            gap: "12px",
          }}
          className="header-container"
        >
          {/* Left Group */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flex: isMobile ? "1" : "none",
            }}
          >
            {isMobile && (
              <button className="white-btn" onClick={() => setShowSearch(true)}>
                <Search style={{ color: "#000", width: "22px", height: "22px" }} />
              </button>
            )}
          </div>

          {/* Logo */}
          <div
            style={{
              flex: isMobile ? 1 : "none",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: isMobile ? "70px" : "90px", // header er fixed height
            }}
          >
            <Link href="/">
              <img
                src="/logo.png"
                alt="Urban Attire"
                style={{
                  width: isMobile ? "140px" : "220px", // logo width
                  height: "100%", // header height e fit korbe
                  objectFit: "contain", // full image visible
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav style={{ flex: 1, display: "flex", justifyContent: "center", gap: "16px" }}>
              <HeaderNavigation setLoading={setLoading} />
            </nav>
          )}

          {/* Right Group */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: isMobile ? "flex-end" : "flex-start",
              gap: isMobile ? "8px" : "12px",
              flex: isMobile ? "1" : "none",
            }}
          >
            {!isMobile && (
              <>
                <button className="white-btn" onClick={() => setShowSearch(true)}>
                  <Search style={{ color: "#000", width: "18px", height: "18px" }} />
                </button>
                <button className="white-btn" onClick={() => setShowTrack(true)}>
                  <Truck style={{ color: "#000", width: "18px", height: "18px" }} />
                </button>
                {/* <button className="white-btn">
                  <Heart style={{ color: "#e9052f", width: "20px", height: "20px" }} />
                </button> */}
                <div style={{ position: "relative" }}>
                  <button className="white-btn" onClick={handleCartClick}>
                    <ShoppingCart style={{ color: "#000", width: "20px", height: "20px" }} />
                    {mounted && quantity > 0 && <span className="cart-badge">{quantity}</span>}
                  </button>
                  {mounted && quantity > 0 && showCart && (
                    <MiniCart showCart={showCart} setShowCart={setShowCart} setLoading={setLoading} />
                  )}
                </div>
                
                {/* User Account/Login Button - Desktop */}
      {isLoggedIn ? (
  <div className="user-wrapper" ref={userDropdownRef}>
    <button
      className="user-btn"
      onClick={() => setShowUserDropdown(!showUserDropdown)}
    >
      <div className="avatar">
        {userData?.avatar ? (
          <img
            src={userData.avatar}
            alt={userData?.name}
            className="avatar-img"
          />
        ) : (
          userData?.name?.charAt(0)?.toUpperCase() || "U"
        )}
      </div>

      <span className="user-name">
        {userData?.name || "User"}
      </span>
    </button>

  {showUserDropdown && (
  <div className="user-dropdown">
    <div className="dropdown-header">
      <div className="avatar sm">
        {userData?.name?.charAt(0)?.toUpperCase() || "U"}
      </div>
      <div>
        <p className="dropdown-name">{userData?.name || "User"}</p>
        <p className="dropdown-email">{userData?.email}</p>
      </div>
    </div>

    <div className="dropdown-divider" />

    <Link href="/account" className="dropdown-item">
      <span className="icon">👤</span>
      <span>My Account</span>
    </Link>

    <button onClick={handleLogout} className="dropdown-item logout">
      <span className="icon">🚪</span>
      <span>Logout</span>
    </button>
  </div>
)}

  </div>
) : (
  <Link href="/login">
    <button className="white-btn">
      <User size={18} color="#000" />
    </button>
  </Link>
)}          </>
            )}

            {isMobile && (
              <button className="white-btn" onClick={() => setShowSidebar(true)}>
                <Menu style={{ color: "#000", width: "22px", height: "22px" }} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      {isMobile && (
        <>
          <div className="mobile-bottom-nav">
            <div className="nav-group">
              <button onClick={() => setShowSidebar(true)} className="nav-button">
                <Menu size={20} />
                <span>Category</span>
              </button>

              <button className="nav-button" onClick={() => setShowTrack(true)}>
                <Truck size={20} />
                <span>Track</span>
              </button>
            </div>

            <Link href="/" className="home-btn">
              <div className="home-circle">
                <Home size={26} />
              </div>
              <span>Home</span>
            </Link>

            <div className="nav-group">
              <button onClick={handleCartClick} className="nav-button">
                <ShoppingCart size={20} />
                <span>Cart</span>
                {quantity > 0 && <span className="cart-count">{quantity}</span>}
              </button>

              {isLoggedIn ? (
                <Link href="/account" className="nav-button">
                  <User size={20} />
                  <span>Account</span>
                </Link>
              ) : (
                <Link href="/login" className="nav-button">
                  <User size={20} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile MiniCart */}
          {mounted && showCart && (
            <MiniCart showCart={showCart} setShowCart={setShowCart} setLoading={setLoading} />
          )}
        </>
      )}

      {/* Popups & Sidebar */}
      {mounted && (
        <>
          <SearchPopup showSearch={showSearch} setShowSearch={setShowSearch} />
          <TrackOrderModal show={showTrack} setShow={setShowTrack} />
          <OffCanvas openMobileMenus={showSidebar} setOpenMobileMenus={setShowSidebar} />
        </>
      )}

      {/* Styles */}
      <style jsx>{`
        .white-btn {
          border: none;
          background: #fff;
          border-radius: 50%;
          padding: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }
        .white-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
        }
        .cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #0d0d0eff;
          color: #fff;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
          border: 2px solid #fff;
        }
        .user-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          min-width: 180px;
          overflow: hidden;
          z-index: 1000;
        }
        .user-dropdown a,
        .user-dropdown button {
          display: block;
          padding: 12px 20px;
          text-decoration: none;
          color: #333;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          transition: background 0.2s ease;
          border: none;
          background: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
        }
        .user-dropdown a:hover,
        .user-dropdown button:hover {
          background: #f3f3f3;
        }
        .mobile-bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 75px;
          background: #fff;
          border-top: 1px solid #e5e5e5;
          box-shadow: 0 -2px 10px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
          z-index: 999;
        }

        .user-wrapper {
  position: relative;
}

/* USER BUTTON */
.user-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 30px;
  transition: background 0.3s ease;
}

.user-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* AVATAR */
.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #111, #444);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* USER NAME */
.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #111;
  white-space: nowrap;
}

/* DROPDOWN */
.user-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 180px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: fadeSlide 0.25s ease;
  z-index: 1000;
}

/* DROPDOWN ITEMS */
.dropdown-item {
  display: block;
  padding: 12px 16px;
  font-size: 14px;
  color: #222;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.25s ease;
  text-align: left;
  width: 100%;
}

.dropdown-item:hover {
  background: #f5f5f5;
}

/* LOGOUT SPECIAL */
.dropdown-item.logout {
  color: #d32f2f;
  font-weight: 500;
}

.dropdown-item.logout:hover {
  background: #ffecec;
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 240px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  animation: fadeSlide 0.25s ease;
  z-index: 1000;
}

/* HEADER */
.dropdown-header {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, #f9f9f9, #f2f2f2);
}

.avatar.sm {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #111, #444);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-name {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #111;
}

.dropdown-email {
  margin: 0;
  font-size: 12px;
  color: #777;
}

/* DIVIDER */
.dropdown-divider {
  height: 1px;
  background: #eaeaea;
}

/* ITEMS */
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  font-size: 14px;
  color: #222;
  background: none;
  border: none;
  width: 100%;
  cursor: pointer;
  transition: background 0.25s ease, padding-left 0.25s ease;
  text-decoration: none;
}

.dropdown-item:hover {
  background: #f6f6f6;
  padding-left: 22px;
}

/* ICON */
.dropdown-item .icon {
  font-size: 16px;
}

/* LOGOUT */
.dropdown-item.logout {
  color: #d32f2f;
  font-weight: 500;
}

.dropdown-item.logout:hover {
  background: #ffecec;
}

/* ANIMATION */
@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* ANIMATION */
@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

      `}</style>
    </>
  );
};

export default Header;