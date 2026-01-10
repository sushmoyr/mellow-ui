'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import {
  VStack,
  HStack,
  Link,
  Badge,
  Divider,
  Spacer,
  IconButton,
  Tooltip,
  useTheme,
} from '@mellow-ui/react';
import styles from './Sidebar.module.css';

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { label: 'Journal', href: '/dashboard/journal', icon: '📝' },
  { label: 'Mood', href: '/dashboard/mood', icon: '😊' },
  { label: 'Habits', href: '/dashboard/habits', icon: '✅', badge: '5' },
  { label: 'Goals', href: '/dashboard/goals', icon: '🎯' },
  { label: 'Sleep', href: '/dashboard/sleep', icon: '😴' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: '📊' },
];

const bottomNavItems: NavItem[] = [
  { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  { label: 'Profile', href: '/dashboard/profile', icon: '👤' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { mode, toggleTheme } = useTheme();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className={styles.sidebar}>
      <VStack gap="md" className={styles.content}>
        {/* Logo */}
        <HStack gap="sm" align="center" className={styles.logo}>
          <span className={styles.logoIcon}>🌿</span>
          <span className={styles.logoText}>Serenity</span>
        </HStack>

        <Divider />

        {/* Main Navigation */}
        <nav className={styles.nav}>
          <VStack gap="xs">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                as={NextLink}
                href={item.href}
                className={`${styles.navItem} ${isActive(item.href) ? styles.active : ''}`}
              >
                <HStack gap="sm" align="center" justify="between" className={styles.navItemContent}>
                  <HStack gap="sm" align="center">
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span>{item.label}</span>
                  </HStack>
                  {item.badge && (
                    <Badge variant="soft" color="primary" size="sm">
                      {item.badge}
                    </Badge>
                  )}
                </HStack>
              </Link>
            ))}
          </VStack>
        </nav>

        <Spacer />

        {/* Bottom Navigation */}
        <VStack gap="xs">
          <Divider />
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              as={NextLink}
              href={item.href}
              className={`${styles.navItem} ${isActive(item.href) ? styles.active : ''}`}
            >
              <HStack gap="sm" align="center">
                <span className={styles.navIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </HStack>
            </Link>
          ))}
        </VStack>

        {/* Theme Toggle */}
        <HStack justify="center" className={styles.themeToggle}>
          <Tooltip content={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton
              variant="ghost"
              size="md"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {mode === 'dark' ? '☀️' : '🌙'}
            </IconButton>
          </Tooltip>
        </HStack>
      </VStack>
    </aside>
  );
}
