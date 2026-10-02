import React from "react";
import Link from "next/link";
import { ArrowUpRight, FileText, MessageSquare } from "lucide-react";

export default function Footer() {
    return (
        <>

            {/* Floating Bottom-Right "Talk To Us" Orange Pill Button */}
            <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 pointer-events-auto">
                <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2.5 bg-[#e36a1e] hover:bg-[#cc5c15] active:scale-[0.98] text-white font-semibold text-sm sm:text-base px-6 py-3 rounded-full shadow-xl shadow-orange-950/50 hover:shadow-orange-500/30 transition-all duration-200 cursor-pointer"
                >
                    <MessageSquare className="w-5 h-5 fill-white/10" strokeWidth={2.2} />
                    <span>Talk To Us</span>
                </Link>
            </div>

            <footer aria-label="Footer" className="relative w-full bg-[#030914] text-white overflow-hidden border-t border-slate-900">
                {/* Background glow and subtle tech grid */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-600/10 via-orange-500/5 to-transparent blur-[120px] pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                <div className="relative mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-12">
                    {/* Top CTA Banner */}
                    <div className="flex flex-col items-center text-center pb-20 border-b border-slate-800/80">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#f06425] text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-[#f06425] animate-pulse" />
                            <span>Let&apos;s Build Together</span>
                        </div>

                        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.12]">
                            Ready to illuminate your <br />
                            <span className="bg-gradient-to-r from-[#f06425] via-amber-400 to-[#38bdf8] bg-clip-text text-transparent">
                                digital future?
                            </span>
                        </h2>

                        <p className="mt-6 text-slate-400 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
                            Join hundreds of enterprises that have accelerated their digital transformation with LOGO.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2 bg-[#e36a1e] hover:bg-[#cc5c15] text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-orange-950/50 hover:shadow-orange-500/30 transition-all duration-200"
                            >
                                <span>Schedule a Consultation</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Footer Navigation Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16 border-b border-slate-800/80">
                        {/* Brand info */}
                        <div className="lg:col-span-2 flex flex-col items-start pr-4">
                            <Link href="/" className="flex items-center gap-3 select-none mb-5">
                                <div className="relative w-9 h-9 flex-shrink-0">
                                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white">
                                        <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.9">
                                            {Array.from({ length: 16 }).map((_, i) => (
                                                <path
                                                    key={i}
                                                    d="M 50 20 Q 70 35 75 60"
                                                    strokeDasharray="2 3"
                                                    transform={`rotate(${i * 22.5} 50 50)`}
                                                />
                                            ))}
                                        </g>
                                        <circle cx="50" cy="50" r="3.5" fill="#f06425" />
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold tracking-tight text-white font-sans">
                                        LOGO <span className="font-light text-slate-300">LOGO</span>
                                    </span>
                                    <span className="text-[8px] tracking-[0.25em] font-medium text-slate-400 uppercase">
                                        LOGO
                                    </span>
                                </div>
                            </Link>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
                                Illuminating the path to digital excellence through AI, cloud, and modern engineering.
                            </p>
                        </div>

                        {/* Company */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1">Company</h4>
                            <Link href="/about" className="text-slate-400 hover:text-white text-sm transition">About Us</Link>
                            <Link href="/career" className="text-slate-400 hover:text-white text-sm transition">Careers</Link>
                            <Link href="/contact" className="text-slate-400 hover:text-white text-sm transition">Contact</Link>
                            <Link href="/customer-delight" className="text-slate-400 hover:text-white text-sm transition">Customer Delight</Link>
                        </div>

                        {/* Services */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1">Services</h4>
                            <Link href="/what-we-offer/ai-services" className="text-slate-400 hover:text-white text-sm transition">AI & Machine Learning</Link>
                            <Link href="/what-we-offer/cloud-engineering" className="text-slate-400 hover:text-white text-sm transition">Cloud Solutions</Link>
                            <Link href="/what-we-offer/digital-product-engineering" className="text-slate-400 hover:text-white text-sm transition">Digital Product Engineering</Link>
                            <Link href="/what-we-offer/data-services" className="text-slate-400 hover:text-white text-sm transition">Data Services</Link>
                            <Link href="/what-we-offer/managed-services" className="text-slate-400 hover:text-white text-sm transition">Managed Services</Link>
                        </div>

                        {/* Connect */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1">Connect</h4>
                            <div className="flex items-center gap-3 mb-2">
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition"
                                    aria-label="LinkedIn"
                                >
                                    <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0-.01-3.06 1.53 1.53 0 0 0 .01 3.06m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition"
                                    aria-label="X (Twitter)"
                                >
                                    <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition"
                                    aria-label="GitHub"
                                >
                                    <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                                    </svg>
                                </a>
                            </div>
                            <a
                                href="mailto:contact@logo.com"
                                className="text-slate-300 hover:text-orange-400 text-xs sm:text-sm transition font-mono"
                            >
                                contact@logo.com
                            </a>
                        </div>
                    </div>

                    {/* Bottom copyright & legal */}
                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light">
                        <p>© 2026 LOGO. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <Link href="/terms-and-conditions" className="hover:text-slate-300 transition">Terms &amp; Conditions</Link>
                            <Link href="/privacy-policy" className="hover:text-slate-300 transition">Privacy Policy</Link>
                            <button className="hover:text-slate-300 transition cursor-pointer">Cookie Settings</button>
                        </div>
                    </div>
                </div>
            </footer>
        </>

    );
}