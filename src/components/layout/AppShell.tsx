/**
 * AppShell — Spotify-style two-column layout with responsive behaviour (DD-10).
 *
 * Desktop  >1024px : sidebar 220px, user can collapse to 60px
 * Tablet  768–1024px : sidebar auto-collapses to 60px (icon-only)
 * Mobile   <768px  : sidebar hidden, bottom tab bar + category sheet
 *
 * Icons: inline SVG, no library dependency.
 */

import { useState } from 'react'
import { useWindowWidth, BP_TABLET, BP_DESKTOP } from '../../lib/useWindowWidth'
const odplogoUrl = '/assets/ODP-Logo.svg'
const odplogoLightUrl = '/assets/ODP-Logo-Light.svg'


// ─── Icons ────────────────────────────────────────────────────────────────────

function IconHeart({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {filled ? (
        <path d="M8 13.5s-6-3.8-6-7.5C2 4 3.5 2.5 5.5 2.5c1 0 2 .5 2.5 1.3.5-.8 1.5-1.3 2.5-1.3C12.5 2.5 14 4 14 6c0 3.7-6 7.5-6 7.5z" fill="currentColor" />
      ) : (
        <path d="M8 13.5s-6-3.8-6-7.5C2 4 3.5 2.5 5.5 2.5c1 0 2 .5 2.5 1.3.5-.8 1.5-1.3 2.5-1.3C12.5 2.5 14 4 14 6c0 3.7-6 7.5-6 7.5z" stroke="currentColor" strokeWidth="1.5" />
      )}
    </svg>
  )
}

function IconUpload() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2v9M4.5 5.5L8 2l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 11v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function IconGrid({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" opacity="0.8"/>
      <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" opacity="0.8"/>
      <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" opacity="0.8"/>
      <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" opacity="0.8"/>
    </svg>
  )
}

function IconFish() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8c0-2.5 2-4.5 5-4.5S13 5.5 13 8s-2 4.5-5 4.5S3 10.5 3 8z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M13 5l2-2M13 11l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="6" cy="7.5" r="1" fill="currentColor"/>
    </svg>
  )
}

function IconWave() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M1 8c1-2 2-2 3 0s2 2 3 0 2-2 3 0 2 2 3 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function IconCoral() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 14V8M8 8l-3-3M8 8l3-3M5 5l-2-2M11 5l2-2M5 5V3M11 5V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function IconAcoustics() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="2" fill="currentColor"/>
      <path d="M4.5 11.5a5 5 0 000-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M11.5 4.5a5 5 0 010 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function IconShield() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2L3 4v4c0 3 2.5 5 5 6 2.5-1 5-3 5-6V4L8 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

function IconGear() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.3 3.3l1.4 1.4M11.3 11.3l1.4 1.4M12.7 3.3l-1.4 1.4M4.7 11.3l-1.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function IconCompass({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12.5 7.5l-2 5-3-3 5-2z" fill="currentColor"/>
    </svg>
  )
}

function IconSearch({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function IconExternalLink() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M7 1h4v4M11 1L6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconSidebarToggle() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"
      stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="1.5" width="15" height="15" rx="2"/>
      <line x1="6" y1="1.5" x2="6" y2="16.5"/>
    </svg>
  )
}

// ─── Nav item definitions ─────────────────────────────────────────────────────

interface NavItemDef {
  id: string
  label: string
  icon: React.ReactNode
}

const LIBRARY_ITEMS: NavItemDef[] = [
  { id: 'saved',  label: 'Saved', icon: <IconHeart /> },
  { id: 'mydata', label: 'My Data',         icon: <IconUpload /> },
]

const BROWSE_ITEMS: NavItemDef[] = [
  { id: 'all',           label: 'All Collections',         icon: <IconGrid /> },
  { id: 'biodiversity',  label: 'Biodiversity & Species',  icon: <IconFish /> },
  { id: 'ocean-physics', label: 'Ocean Physics',           icon: <IconWave /> },
  { id: 'coral',         label: 'Coral & Reef',            icon: <IconCoral /> },
  { id: 'acoustics',     label: 'Acoustics & Fisheries',   icon: <IconAcoustics /> },
  { id: 'mpa',           label: 'Marine Protected Areas',  icon: <IconShield /> },
  { id: 'industry',      label: 'Industry & Offshore',     icon: <IconGear /> },
]

const EXTERNAL_LINKS = [
  { label: 'Documentation', href: 'https://docs.hubocean.earth' },
  { label: 'Workspaces',    href: 'https://app.hubocean.earth/workspace' },
  { label: 'Support',       href: 'https://app.hubocean.earth/support' },
]

// ─── NavButton ────────────────────────────────────────────────────────────────

interface NavButtonProps {
  item: NavItemDef
  active: boolean
  collapsed: boolean
  onClick: () => void
}

function NavButton({ item, active, collapsed, onClick }: NavButtonProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      type="button"
      title={collapsed ? item.label : undefined}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-current={active ? 'page' : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: collapsed ? 0 : 10,
        justifyContent: collapsed ? 'center' : 'flex-start',
        width: '100%',
        padding: collapsed ? '10px 0' : '8px 16px',
        fontSize: 14,
        fontFamily: 'var(--font-sans)',
        fontWeight: active ? 500 : 400,
        color: active
          ? 'var(--color-sidebar-text-active)'
          : hovered
            ? 'var(--color-sidebar-text-active)'
            : 'var(--color-sidebar-text)',
        background: active
          ? 'var(--color-sidebar-item-active)'
          : hovered
            ? 'var(--color-sidebar-item-hover)'
            : 'none',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'color 0.15s, background 0.15s',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {!collapsed && (
        <span
          style={{
            width: 4, height: 4, borderRadius: '50%', flexShrink: 0,
            backgroundColor: active ? 'var(--color-sidebar-accent)' : 'transparent',
            transition: 'background-color 0.15s',
          }}
          aria-hidden="true"
        />
      )}
      <span style={{ flexShrink: 0, display: 'flex' }}>{item.icon}</span>
      {!collapsed && (
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
      )}
    </button>
  )
}

function SectionLabel({ label, collapsed }: { label: string; collapsed: boolean }) {
  if (collapsed) return <div style={{ height: 8 }} />
  return (
    <div style={{
      padding: '16px 16px 8px',
      fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-sans)',
      color: 'var(--color-sidebar-section-label)',
      textTransform: 'uppercase', letterSpacing: '0.08em',
    }}>
      {label}
    </div>
  )
}

// ─── CategoryBottomSheet ──────────────────────────────────────────────────────

interface CategoryBottomSheetProps {
  open: boolean
  activeCategory: string
  onSelect: (id: string) => void
  onClose: () => void
}

function CategoryBottomSheet({ open, activeCategory, onSelect, onClose }: CategoryBottomSheetProps) {
  if (!open) return null

  const ALL_ITEMS = [...LIBRARY_ITEMS, ...BROWSE_ITEMS]

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 98,
        }}
        aria-hidden="true"
      />
      {/* Sheet */}
      <div
        role="dialog"
        aria-label="Browse categories"
        style={{
          position: 'fixed',
          bottom: 60,
          left: 0, right: 0,
          backgroundColor: 'var(--color-sidebar-bg)',
          borderRadius: '16px 16px 0 0',
          padding: '20px 0',
          zIndex: 99,
          maxHeight: '70vh',
          overflowY: 'auto',
        }}
      >
        <div style={{
          width: 36, height: 4, borderRadius: 2,
          backgroundColor: 'rgba(255,255,255,0.2)',
          margin: '0 auto 16px',
        }} />
        {ALL_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => { onSelect(item.id); onClose() }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              width: '100%', padding: '14px 20px',
              fontSize: 16, fontFamily: 'var(--font-sans)',
              fontWeight: activeCategory === item.id ? 500 : 400,
              color: activeCategory === item.id
                ? 'var(--color-sidebar-accent)'
                : 'var(--color-sidebar-text-active)',
              background: 'none', border: 'none', cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </>
  )
}

// ─── BottomTabBar ─────────────────────────────────────────────────────────────

interface BottomTabBarProps {
  activeCategory: string
  onCategoryChange: (id: string) => void
  onBrowseOpen: () => void
}

function BottomTabBar({ activeCategory, onCategoryChange, onBrowseOpen }: BottomTabBarProps) {
  const isHome   = activeCategory === 'all'
  const isSaved  = activeCategory === 'saved'
  const isBrowse = !isHome && !isSaved

  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: 4, padding: '8px 0',
    cursor: 'pointer', background: 'none', border: 'none',
    color: active ? 'var(--color-sidebar-text-active)' : 'var(--color-sidebar-text)',
    fontSize: 10, fontFamily: 'var(--font-sans)',
    transition: 'color 0.15s',
  })

  return (
    <nav
      aria-label="Bottom navigation"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        height: 60,
        backgroundColor: 'var(--color-sidebar-bg)',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        zIndex: 97,
      }}
    >
      <button type="button" style={tabStyle(isHome)} onClick={() => onCategoryChange('all')} aria-label="Home">
        <IconGrid size={20} />
        <span>Home</span>
      </button>
      <button type="button" style={tabStyle(isSaved)} onClick={() => onCategoryChange('saved')} aria-label="Saved">
        <IconHeart filled={isSaved} />
        <span>Saved</span>
      </button>
      <button
        type="button"
        style={tabStyle(false)}
        onClick={() => document.getElementById('catalog-search')?.focus()}
        aria-label="Search"
      >
        <IconSearch size={20} />
        <span>Search</span>
      </button>
      <button type="button" style={tabStyle(isBrowse)} onClick={onBrowseOpen} aria-label="Browse categories">
        <IconCompass size={20} />
        <span>Browse</span>
      </button>
    </nav>
  )
}

// ─── AppShell ─────────────────────────────────────────────────────────────────

export interface AppShellProps {
  children: React.ReactNode
  activeCategory?: string
  onCategoryChange?: (id: string) => void
  theme?: 'light' | 'dark'
}

export function AppShell({
  children,
  activeCategory = 'all',
  onCategoryChange,
}: AppShellProps) {
  const width = useWindowWidth()
  const isMobile = width < BP_TABLET
  const isTablet = width >= BP_TABLET && width < BP_DESKTOP
  const layout = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'

  // Collapse state: user toggle on desktop; auto-collapsed on tablet
  const [userCollapsed, setUserCollapsed] = useState(false)
  const [browseSheetOpen, setBrowseSheetOpen] = useState(false)
  const [prevLayout, setPrevLayout] = useState(layout)

  // When layout changes, normalize desktop/tablet collapse (replaces effect + setState)
  if (layout !== prevLayout) {
    setPrevLayout(layout)
    if (layout === 'tablet') {
      setUserCollapsed(true)
    } else if (layout === 'desktop') {
      setUserCollapsed(false)
    }
  }

  const collapsed = isTablet || userCollapsed

  const handleCategoryChange = (id: string) => {
    onCategoryChange?.(id)
  }

  const mainPadding = isMobile ? '0 16px' : '0 32px'
  const mainPaddingBottom = isMobile ? '76px' : '24px'  // extra space for tab bar

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: 'var(--color-bg)' }}>

      {/* ── Sidebar (hidden on mobile) ──────────────────────────── */}
      {!isMobile && (
        <nav
          aria-label="Site navigation"
          style={{
            width: collapsed ? 60 : 220,
            flexShrink: 0,
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            backgroundColor: 'var(--color-sidebar-bg)',
            padding: '0 0 16px',
            display: 'flex',
            flexDirection: 'column',
            transition: 'width 0.2s ease',
          }}
        >
          {/* Header — theme-aware via CSS class */}
          <div
            className="sidebar-header"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              justifyContent: collapsed ? 'center' : 'flex-start',
              padding: collapsed ? '20px 0' : '20px 8px 20px 16px',
              marginBottom: 8,
            }}
          >
            {!collapsed && (
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Dark mode logo (white) */}
                <img
                  className="sidebar-logo-dark"
                  src={odplogoUrl}
                  alt="ODP — Ocean Data Platform"
                  height={24}
                />
                {/* Light mode logo (deep purple) */}
                <img
                  className="sidebar-logo-light"
                  src={odplogoLightUrl}
                  alt="ODP — Ocean Data Platform"
                  height={24}
                />
              </div>
            )}
            {/* Collapse toggle — only on desktop */}
            {!isTablet && (
              <button
                type="button"
                className="sidebar-toggle-btn"
                title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                onClick={() => setUserCollapsed((v) => !v)}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 28, height: 28, borderRadius: 6,
                  border: 'none', background: 'none',
                  cursor: 'pointer', flexShrink: 0,
                  transition: 'color 0.15s',
                }}
              >
                <IconSidebarToggle />
              </button>
            )}
          </div>

          {/* LIBRARY */}
          <SectionLabel label="Library" collapsed={collapsed} />
          <div role="list">
            {LIBRARY_ITEMS.map((item) => (
              <div key={item.id} role="listitem">
                <NavButton item={item} active={activeCategory === item.id} collapsed={collapsed} onClick={() => handleCategoryChange(item.id)} />
              </div>
            ))}
          </div>

          {/* BROWSE */}
          <SectionLabel label="Browse" collapsed={collapsed} />
          <div role="list">
            {BROWSE_ITEMS.map((item) => (
              <div key={item.id} role="listitem">
                <NavButton item={item} active={activeCategory === item.id} collapsed={collapsed} onClick={() => handleCategoryChange(item.id)} />
              </div>
            ))}
          </div>

          {/* Footer links */}
          {!collapsed && (
            <div style={{
              marginTop: 'auto', padding: '16px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              {EXTERNAL_LINKS.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontSize: 12, fontFamily: 'var(--font-sans)',
                    color: 'var(--color-sidebar-text)', textDecoration: 'none',
                    padding: '4px 0', transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-sidebar-text-active)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-sidebar-text)' }}
                >
                  {label}<IconExternalLink />
                </a>
              ))}
              <div style={{ marginTop: 8, fontSize: 10, color: 'var(--color-sidebar-section-label)', lineHeight: 1.4 }}>
                Portfolio concept — not an official Hub Ocean product.
              </div>
            </div>
          )}
        </nav>
      )}

      {/* ── Main content ───────────────────────────────────────── */}
      <main
        id="main-content"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: mainPadding,
          paddingBottom: mainPaddingBottom,
        }}
      >
        {children}
      </main>

      {/* ── Mobile bottom tab bar ──────────────────────────────── */}
      {isMobile && (
        <BottomTabBar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          onBrowseOpen={() => setBrowseSheetOpen(true)}
        />
      )}

      {/* ── Category bottom sheet (mobile) ────────────────────── */}
      {isMobile && (
        <CategoryBottomSheet
          open={browseSheetOpen}
          activeCategory={activeCategory}
          onSelect={handleCategoryChange}
          onClose={() => setBrowseSheetOpen(false)}
        />
      )}
    </div>
  )
}
