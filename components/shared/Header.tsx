"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Globe2,
  Mail,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";

type MenuLink = { label: string; href: string };
type MenuCategory = { label: string; links: MenuLink[] };
type MegaMenu = {
  label: string;
  href: string;
  categories: MenuCategory[];
  featured: { eyebrow: string; title: string; href: string; image: string };
};

const serviceLinks: MenuLink[] = [
  { label: "AI Services", href: "/service/ai-services" },
  { label: "Digital Product Engineering", href: "/service/digital-product-engineering" },
  { label: "Cloud Engineering", href: "/service/cloud-engineering" },
  { label: "Data Services", href: "/service/data-services" },
  { label: "RCM as a Service", href: "/service/rcm" },
  { label: "Automation Services", href: "/service/automation-services" },
  { label: "Managed Services", href: "/service/managed-services" },
  { label: "Property Operations", href: "/service/utilities-management" },
  { label: "Intelligent Backoffice Operations", href: "/service/intelligent-backoffice-operations" },
  { label: "Reporting & Analytics", href: "/service/reporting-analytics" },
  { label: "Technical Support", href: "/service/technical-support" },
  { label: "Process Management", href: "/service/process-management" },
  { label: "Banking Finance Support", href: "/service/banking-finance-support" },
];

const industryLinks: MenuLink[] = [
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Banking", href: "/industries/banking" },
  { label: "Telecom", href: "/industries/telecom" },
  { label: "Retail", href: "/industries/retail" },
  { label: "Manufacturing", href: "/industries/manufacturing" },
];

const caseStudyLinks: MenuLink[] = [
  { label: "Healthcare outcomes", href: "/case-studies/healthcare" },
  { label: "Banking outcomes", href: "/case-studies/banking" },
  { label: "Telecom outcomes", href: "/case-studies/telecom" },
  { label: "Retail outcomes", href: "/case-studies/retail" },
  { label: "Manufacturing outcomes", href: "/case-studies/manufacturing" },
];

const megaMenus: MegaMenu[] = [
  // {
  //   label: "Who we are",
  //   href: "/about",
  //   categories: [
  //     {
  //       label: "Purpose & Values",
  //       links: [
  //         { label: "What we believe in", href: "/about/beliefs" },
  //         { label: "Future vision", href: "/about/future-vision" },
  //       ],
  //     },
  //     {
  //       label: "Our People",
  //       links: [
  //         { label: "Meet our team", href: "/about/team" },
  //         { label: "Careers at Pinnacle", href: "/career" },
  //       ],
  //     },
  //     {
  //       label: "Governance",
  //       links: [
  //         { label: "Responsible technology", href: "/about/responsible-technology" },
  //         { label: "Privacy & security", href: "/about/privacy-security" },
  //       ],
  //     },
  //     {
  //       label: "Recognition",
  //       links: [
  //         { label: "Client outcomes", href: "/customer-delight" },
  //         { label: "Our work", href: "/customer-delight#case-studies" },
  //       ],
  //     },
  //     {
  //       label: "Press room",
  //       links: [{ label: "Latest updates", href: "/insights/latest-updates" }],
  //     },
  //     {
  //       label: "Contact Us",
  //       links: [{ label: "Get in touch", href: "/contact" }],
  //     },
  //   ],
  //   featured: {
  //     eyebrow: "About Us",
  //     title: "Together makes progress",
  //     href: "/about",
  //     image: "/welcoming-moments.png",
  //   },
  // },
  {
    label: "What we do",
    href: "/#our-services",
    categories: [
      { label: "Services", links: serviceLinks },
      { label: "Industry", links: industryLinks },
      { label: "Case Studies", links: caseStudyLinks },
    ],
    featured: {
      eyebrow: "Our Services",
      title: "Practical solutions. Progress that matters.",
      href: "/#our-services",
      image: "/welcoming-moments.png",
    },
  },
  {
    label: "Our Thinking",
    href: "/customer-delight",
    categories: [
      {
        label: "Client outcomes",
        links: caseStudyLinks,
      },
      {
        label: "Industry perspectives",
        links: industryLinks,
      },
      {
        label: "Insights",
        links: [
          { label: "AI and automation", href: "/insights/ai-and-automation" },
          { label: "Digital transformation", href: "/insights/digital-transformation" },
          { label: "Cloud and data", href: "/insights/cloud-and-data" },
        ],
      },
    ],
    featured: {
      eyebrow: "Client Outcomes",
      title: "See how we help work move forward",
      href: "/customer-delight",
      image: "/welcoming-moments.png",
    },
  },
  {
    label: "Careers",
    href: "/career",
    categories: [
      {
        label: "Life at Pinnacle",
        links: [
          { label: "Our culture", href: "/career/culture" },
          { label: "Growth and learning", href: "/career/growth-and-learning" },
        ],
      },
      {
        label: "Opportunities",
        links: [
          { label: "Open positions", href: "/career#open-positions" },
          { label: "Submit your application", href: "/career#open-positions" },
        ],
      },
    ],
    featured: {
      eyebrow: "Careers",
      title: "Build a future with us",
      href: "/career",
      image: "/welcoming-moments.png",
    },
  },
];

const searchItems: MenuLink[] = [
  ...serviceLinks,
  ...industryLinks,
  { label: "Case Studies", href: "/customer-delight#case-studies" },
  { label: "Our Company", href: "/about" },
  { label: "Careers", href: "/career" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);
  const [mobileCategory, setMobileCategory] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setMobileMenu(null);
        setMobileCategory(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const filteredSearchItems = searchItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  const openDesktopMenu = (menu: MegaMenu) => {
    setActiveMenu(menu.label);
    setActiveCategory(menu.categories[0]?.label ?? null);
    setSearchOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileMenu(null);
    setMobileCategory(null);
  };

  const activeMegaMenu = megaMenus.find((menu) => menu.label === activeMenu);
  const activeMegaCategory = activeMegaMenu?.categories.find(
    (category) => category.label === activeCategory,
  );
  const mobileMegaMenu = megaMenus.find((menu) => menu.label === mobileMenu);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-black text-white"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="relative mx-auto flex h-[72px] max-w-[1800px] items-center px-5 sm:px-8 xl:h-[58px] xl:px-9">
        <Link
          href="/"
          aria-label="Pinnacle Serve home"
          onClick={closeMobileMenu}
          className="flex shrink-0 items-baseline gap-1 text-[25px] font-bold tracking-[-0.045em] text-white sm:text-[28px] xl:text-[25px]"
        >
          Pinnacle<span className="text-[#86bc25]">.</span>
          <span className="ml-1 text-[10px] font-semibold tracking-[0.22em] text-white/75 sm:text-xs">
            SERVE
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="ml-10 hidden h-full items-center gap-3 xl:flex 2xl:gap-6"
        >
          {megaMenus.map((menu) => (
            <button
              key={menu.label}
              type="button"
              aria-expanded={activeMenu === menu.label}
              aria-controls="desktop-mega-menu"
              onMouseEnter={() => openDesktopMenu(menu)}
              onFocus={() => openDesktopMenu(menu)}
              onClick={() => openDesktopMenu(menu)}
              onKeyDown={(event) => {
                if (event.key === "Escape") setActiveMenu(null);
              }}
              className={`flex h-full items-center gap-1 whitespace-nowrap text-sm transition-colors ${
                activeMenu === menu.label
                  ? "text-[#86bc25]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {menu.label}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  activeMenu === menu.label ? "rotate-180 text-[#86bc25]" : ""
                }`}
                strokeWidth={1.8}
              />
            </button>
          ))}
        </nav>

        <div className="ml-auto hidden h-full items-center gap-4 xl:flex 2xl:gap-6">
          <button
            type="button"
            aria-label={searchOpen ? "Close search" : "Search"}
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((open) => !open);
              setActiveMenu(null);
            }}
            className="flex items-center gap-2 whitespace-nowrap text-sm text-white/90 transition hover:text-white"
          >
            {searchOpen ? (
              <X className="h-5 w-5" strokeWidth={1.6} />
            ) : (
              <Search className="h-5 w-5" strokeWidth={1.6} />
            )}
            <span>Search</span>
          </button>
          <button
            type="button"
            aria-label="Location and language: India, English"
            className="flex items-center gap-2 whitespace-nowrap text-sm text-white/90 transition hover:text-white"
          >
            <Globe2 className="h-5 w-5" strokeWidth={1.7} />
            <span>IN - EN</span>
            <ChevronDown className="h-4 w-4" strokeWidth={1.8} />
          </button>
          <Link
            href="/contact"
            aria-label="Let's connect"
            className="flex h-10 w-7 items-center justify-center text-white/85 transition hover:text-white"
          >
            <Mail className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <Link
            href="/contact"
            aria-label="Account"
            className="flex h-10 w-7 items-center justify-center text-white/85 transition hover:text-white"
          >
            <UserRound className="h-6 w-6" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="flex h-full items-center gap-2 sm:gap-4 xl:hidden">
          <button
            type="button"
            aria-label={searchOpen ? "Close search" : "Search"}
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((open) => !open);
              setMobileMenuOpen(false);
            }}
            className="flex h-11 w-11 items-center justify-center text-white/85 transition hover:text-white"
          >
            {searchOpen ? (
              <X className="h-6 w-6" strokeWidth={1.6} />
            ) : (
              <Search className="h-6 w-6" strokeWidth={1.6} />
            )}
          </button>
          <Link
            href="/contact"
            aria-label="Let's connect"
            className="flex h-11 w-11 items-center justify-center text-white/85 transition hover:text-white"
          >
            <UserRound className="h-6 w-6" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => {
              setMobileMenuOpen((open) => !open);
              setActiveMenu(null);
              setMobileMenu(null);
              setMobileCategory(null);
              setSearchOpen(false);
            }}
            className="flex h-11 w-11 items-center justify-center text-white/90 transition hover:text-white"
          >
            {mobileMenuOpen ? (
              <X className="h-7 w-7" strokeWidth={1.6} />
            ) : (
              <Menu className="h-7 w-7" strokeWidth={1.6} />
            )}
          </button>
        </div>
      </div>

      {activeMegaMenu && (
        <div
          id="desktop-mega-menu"
          className="absolute inset-x-0 top-full hidden max-h-[calc(100svh-58px)] min-h-[508px] overflow-y-auto bg-[#111] xl:flex"
          onMouseEnter={() => setActiveMenu(activeMegaMenu.label)}
        >
          <nav
            aria-label={`${activeMegaMenu.label} categories`}
            className="w-[19%] shrink-0 bg-[#292b2c] px-5 py-8 2xl:px-[2.6vw] 2xl:py-[2.6vw]"
          >
            {activeMegaMenu.categories.map((category) => (
              <button
                key={category.label}
                type="button"
                onMouseEnter={() => setActiveCategory(category.label)}
                onFocus={() => setActiveCategory(category.label)}
                onClick={() => setActiveCategory(category.label)}
                className={`group mb-1 flex min-h-[54px] w-full items-center justify-between gap-3 px-4 text-left text-base font-light transition-colors 2xl:min-h-[54px] 2xl:px-5 2xl:text-[19px] ${
                  activeCategory === category.label
                    ? "bg-[#171819] text-[#86bc25]"
                    : "text-white/80 hover:bg-[#202223] hover:text-white"
                }`}
              >
                <span>{category.label}</span>
                <ChevronRight className="h-4 w-4 shrink-0" strokeWidth={1.7} />
              </button>
            ))}
          </nav>

          <div className="flex min-w-0 flex-1">
            <div className="min-w-0 flex-1 px-8 py-8 2xl:px-[2.6vw] 2xl:py-[2.6vw]">
              <Link
                href={activeMegaMenu.href}
                className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/50 transition hover:text-[#86bc25]"
              >
                Explore {activeMegaMenu.label}
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
              <div className="flex flex-col">
                {activeMegaCategory?.links.map((item) => (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    onClick={() => setActiveMenu(null)}
                    className="py-2.5 text-base font-light text-white/85 transition hover:text-[#86bc25] 2xl:text-[18px]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <aside className="my-8 mr-8 hidden w-[260px] shrink-0 border-l-2 border-[#86bc25] pl-8 md:block 2xl:my-[2.6vw] 2xl:mr-[2.4vw] 2xl:w-[min(22vw,330px)] 2xl:pl-[2.6vw]">
              <h2 className="mb-7 text-lg font-semibold text-white">
                Featured
              </h2>
              <Link
                href={activeMegaMenu.featured.href}
                onClick={() => setActiveMenu(null)}
                className="group block"
              >
                <div className="relative aspect-[1.45] w-full overflow-hidden bg-[#292b2c]">
                  <Image
                    src={activeMegaMenu.featured.image}
                    alt=""
                    fill
                    sizes="(min-width: 1536px) 22vw, 260px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 text-sm text-white/80">
                  {activeMegaMenu.featured.eyebrow}
                </p>
                <p className="mt-2 text-base leading-6 text-white transition group-hover:text-[#86bc25]">
                  {activeMegaMenu.featured.title}
                </p>
              </Link>
            </aside>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="absolute inset-x-0 top-full max-h-[calc(100svh-72px)] overflow-y-auto border-t border-white/15 bg-black px-5 py-7 sm:px-8 xl:max-h-[calc(100svh-58px)]">
          <div className="mx-auto max-w-5xl">
            <label htmlFor="site-search" className="sr-only">
              Search Pinnacle Serve
            </label>
            <div className="flex items-center gap-4 border-b border-white/50 pb-3">
              <Search className="h-6 w-6 shrink-0 text-white/70" aria-hidden="true" />
              <input
                id="site-search"
                type="search"
                autoFocus
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search Pinnacle Serve"
                className="w-full bg-transparent text-xl font-light text-white outline-none placeholder:text-white/45 sm:text-2xl"
              />
            </div>
            {searchQuery.trim() && (
              <div className="mt-5 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSearchItems.map((item) => (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    onClick={() => setSearchOpen(false)}
                    className="border-b border-white/10 py-3 text-base text-white/75 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
                {filteredSearchItems.length === 0 && (
                  <p className="py-3 text-sm text-white/60">No matching pages found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className="absolute inset-x-0 top-full h-[calc(100svh-72px)] overflow-y-auto border-t border-white/10 bg-black xl:hidden"
        >
          <div className="mx-auto flex min-h-full max-w-[1440px] flex-col px-5 pb-8 sm:px-8">
            <nav aria-label="Main menu" className="w-full pt-5 sm:pt-8">
              {!mobileMenu ? (
                <>
                  {megaMenus.map((menu) => (
                    <button
                      key={menu.label}
                      type="button"
                      onClick={() => {
                        setMobileMenu(menu.label);
                        setMobileCategory(null);
                      }}
                      className="group flex w-full items-center justify-between gap-6 border-b border-white/15 py-5 text-left text-[clamp(1.6rem,6vw,2.35rem)] font-light leading-tight text-white/85 transition-colors hover:text-white"
                    >
                      <span>{menu.label}</span>
                      <ChevronRight className="h-6 w-6 shrink-0 text-white" strokeWidth={1.8} />
                    </button>
                  ))}
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenu(null);
                      setMobileCategory(null);
                    }}
                    className="mb-4 flex items-center gap-3 py-2 text-sm text-white/65 transition hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4 rotate-180" />
                    Main Menu
                  </button>
                  <div className="mb-5 border-b border-white/15 pb-5 text-[clamp(1.6rem,6vw,2.35rem)] font-light text-white">
                    {mobileMenu}
                  </div>
                  <Link
                    href={mobileMegaMenu?.href ?? "/"}
                    onClick={closeMobileMenu}
                    className="mb-4 inline-flex items-center gap-2 text-sm text-[#86bc25] transition hover:text-white"
                  >
                    Explore {mobileMenu}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  {mobileMegaMenu?.categories.map((category) => (
                    <div key={category.label} className="border-b border-white/15">
                      <button
                        type="button"
                        aria-expanded={mobileCategory === category.label}
                        onClick={() =>
                          setMobileCategory((current) =>
                            current === category.label ? null : category.label,
                          )
                        }
                        className={`group flex w-full items-center justify-between gap-4 py-4 text-left text-lg font-light transition-colors ${
                          mobileCategory === category.label
                            ? "text-[#86bc25]"
                            : "text-white/85 hover:text-white"
                        }`}
                      >
                        <span>{category.label}</span>
                        <ChevronRight
                          className={`h-5 w-5 shrink-0 transition-transform ${
                            mobileCategory === category.label ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      {mobileCategory === category.label && (
                        <ul className="pb-4">
                          {category.links.map((item) => (
                            <li key={`${item.label}-${item.href}`}>
                              <Link
                                href={item.href}
                                onClick={closeMobileMenu}
                                className="flex items-center justify-between gap-3 border-t border-white/10 py-3 pl-3 text-base font-light text-white/75 transition hover:text-white"
                              >
                                {item.label}
                                <ChevronRight className="h-4 w-4 shrink-0 text-white/50" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                  {mobileMegaMenu && (
                    <Link
                      href={mobileMegaMenu.featured.href}
                      onClick={closeMobileMenu}
                      className="mt-6 flex items-center gap-4 border border-white/15 p-3"
                    >
                      <div className="relative h-[76px] w-28 shrink-0 overflow-hidden">
                        <Image
                          src={mobileMegaMenu.featured.image}
                          alt=""
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      </div>
                      <span>
                        <span className="block text-xs text-white/60">
                          {mobileMegaMenu.featured.eyebrow}
                        </span>
                        <span className="mt-1 block text-sm text-white">
                          {mobileMegaMenu.featured.title}
                        </span>
                      </span>
                    </Link>
                  )}
                </>
              )}
            </nav>

            {!mobileMenu && (
              <div className="mt-auto flex flex-col gap-6 pt-10 text-white/75 sm:flex-row sm:items-center sm:gap-12">
                <div className="flex items-center gap-4">
                  <Globe2 className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                  <span className="text-base tracking-wide">IN - EN</span>
                </div>
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-4 text-base transition hover:text-white"
                >
                  <Mail className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                  <span>Let&apos;s Connect</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
