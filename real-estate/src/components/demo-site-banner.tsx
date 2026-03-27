"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BACK_URL = "https://k2digitalmedia.ca";
const LOGO_URL = "/Logo.png";

export function DemoSiteBanner() {
  const [sideOpen, setSideOpen] = useState(true);
  const topStripRef = useRef<HTMLDivElement | null>(null);
  const footerStripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    const syncOffsets = () => {
      const topHeight = topStripRef.current?.offsetHeight ?? 0;
      const footerHeight = footerStripRef.current?.offsetHeight ?? 0;

      root.style.setProperty("--k2-demo-top-offset", `${topHeight}px`);
      root.style.setProperty("--k2-demo-bottom-offset", `${footerHeight}px`);
    };

    syncOffsets();

    const observer = new ResizeObserver(syncOffsets);

    if (topStripRef.current) {
      observer.observe(topStripRef.current);
    }

    if (footerStripRef.current) {
      observer.observe(footerStripRef.current);
    }

    window.addEventListener("resize", syncOffsets);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncOffsets);
      root.style.removeProperty("--k2-demo-top-offset");
      root.style.removeProperty("--k2-demo-bottom-offset");
    };
  }, []);

  return (
    <>
      <div
        ref={topStripRef}
        className="fixed inset-x-0 top-0 z-[99999] border-b border-[#2fa8c740] bg-linear-to-r from-[#0b1224] to-[#0d1a30] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/60 sm:px-4 sm:text-[11px]"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2fa8c7] shadow-[0_0_10px_#2fa8c7]" />
          <span className="text-center sm:text-left">
            <span className="hidden min-[420px]:inline">This is a demo site built by</span>
            <span className="min-[420px]:hidden">Demo by</span>
          </span>
          <a
            href={BACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-[#2fa8c766] font-bold text-[#2fa8c7] hover:text-white"
          >
            K2 Digital Media
          </a>
          <span className="hidden text-white/25 sm:inline">|</span>
          <a
            href={BACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#2fa8c759] px-3 py-1 text-[9px] font-semibold text-white/70 hover:border-[#2fa8c7] hover:text-white sm:text-[10px]"
          >
            Go Back
          </a>
        </div>
      </div>

      <div className="pointer-events-none fixed right-0 top-1/2 z-[99998] hidden -translate-y-1/2 items-center lg:flex">
        <button
          type="button"
          onClick={() => setSideOpen((open) => !open)}
          aria-expanded={sideOpen}
          aria-controls="k2-demo-side-panel-desktop"
          className="pointer-events-auto flex cursor-pointer items-center gap-1 rounded-l-lg border border-r-0 border-[#2fa8c74d] bg-[#0d1a30] px-2 py-3 text-[9px] uppercase tracking-[0.18em] text-[#2fa8c7] [writing-mode:vertical-rl] hover:bg-[#12304d]"
        >
          <span
            className={`text-sm transition-transform ${sideOpen ? "rotate-0" : "rotate-180"}`}
            aria-hidden="true"
          >
            &gt;
          </span>
          Demo
        </button>
        <aside
          id="k2-demo-side-panel-desktop"
          className={`pointer-events-auto overflow-hidden border border-r-0 border-[#2fa8c740] bg-linear-to-br from-[#080f1e] to-[#0d1a30] text-white shadow-[-4px_0_24px_rgba(0,0,0,0.4)] transition-[width,padding] duration-300 ${
            sideOpen ? "w-[220px] rounded-l-3xl px-5 py-6" : "w-0 px-0 py-0"
          }`}
        >
          <div
            className={`flex flex-col items-center gap-4 text-center transition-opacity duration-200 ${
              sideOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#2fa8c733] bg-[#2fa8c714]">
              <Image src={LOGO_URL} alt="K2 Digital Media" width={48} height={48} />
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#2fa8c74d] bg-[#2fa8c71a] px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-[#2fa8c7]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2fa8c7] shadow-[0_0_8px_#2fa8c7]" />
              Demo Site
            </div>
            <p className="text-sm leading-6 text-white/70">
              This experience is a demo built by <strong className="text-white">K2 Digital Media</strong>.
            </p>
            <a
              href={BACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-linear-to-br from-[#2fa8c7] to-[#1d7a99] px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_8px_20px_rgba(47,168,199,0.25)] hover:scale-[0.98] hover:opacity-90"
            >
              Back to K2DM
            </a>
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-[calc(var(--k2-demo-bottom-offset,0px)+12px)] z-[99998] px-4 lg:hidden">
        <div className="mx-auto flex max-w-sm justify-end">
          <aside
            className={`overflow-hidden rounded-3xl border border-[#2fa8c740] bg-linear-to-br from-[#080f1e]/95 to-[#0d1a30]/95 text-white shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur transition-all duration-300 ${
              sideOpen
                ? "pointer-events-auto w-full translate-y-0 p-4 opacity-100"
                : "pointer-events-none w-14 translate-y-3 p-0 opacity-0"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#2fa8c733] bg-[#2fa8c714]">
                <Image src={LOGO_URL} alt="K2 Digital Media" width={34} height={34} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#2fa8c7]">Demo Site</p>
                <p className="mt-1 text-sm leading-5 text-white/75">
                  Built by <strong className="text-white">K2 Digital Media</strong>.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSideOpen(false)}
                className="shrink-0 rounded-full border border-white/10 px-2 py-1 text-xs text-white/70"
                aria-label="Close demo panel"
              >
                X
              </button>
            </div>
            <a
              href={BACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-full bg-linear-to-br from-[#2fa8c7] to-[#1d7a99] px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-white"
            >
              Visit Main Site
            </a>
          </aside>
          {!sideOpen && (
            <button
              type="button"
              onClick={() => setSideOpen(true)}
              className="pointer-events-auto rounded-full border border-[#2fa8c759] bg-[#0d1a30]/95 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#2fa8c7] shadow-[0_14px_28px_rgba(0,0,0,0.28)] backdrop-blur"
            >
              Demo
            </button>
          )}
        </div>
      </div>

      <div
        ref={footerStripRef}
        className="fixed inset-x-0 bottom-0 z-[99997] border-t border-[#2fa8c726] bg-[#080f1ef5] px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-white/45 backdrop-blur-xl sm:px-4 sm:text-[10px]"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4">
          <Image
            src={LOGO_URL}
            alt="K2 Digital Media"
            width={18}
            height={18}
            className="opacity-75"
          />
          <span>Demo by</span>
          <a
            href={BACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#2fa8c7] hover:underline"
          >
            K2 Digital Media
          </a>
          <span className="hidden text-white/20 sm:inline">|</span>
          <a
            href={BACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white"
          >
            Visit Main Site
          </a>
        </div>
      </div>
    </>
  );
}
