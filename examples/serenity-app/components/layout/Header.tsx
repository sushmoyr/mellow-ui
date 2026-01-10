'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import {
  HStack,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  IconButton,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  VStack,
  Link,
  Badge,
  Tooltip,
} from '@mellow-ui/react';
import { mockUser } from '@/lib/mock-data';
import styles from './Header.module.css';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/journal': 'Journal',
  '/dashboard/mood': 'Mood Tracking',
  '/dashboard/habits': 'Habit Tracker',
  '/dashboard/goals': 'Goals',
  '/dashboard/sleep': 'Sleep',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/settings': 'Settings',
  '/dashboard/profile': 'Profile',
};

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { label: 'Journal', href: '/dashboard/journal', icon: '📝' },
  { label: 'Mood', href: '/dashboard/mood', icon: '😊' },
  { label: 'Habits', href: '/dashboard/habits', icon: '✅' },
  { label: 'Goals', href: '/dashboard/goals', icon: '🎯' },
  { label: 'Sleep', href: '/dashboard/sleep', icon: '😴' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: '📊' },
  { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
  { label: 'Profile', href: '/dashboard/profile', icon: '👤' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', href: '/dashboard' }];

    if (paths.length > 1) {
      const currentPath = `/${paths.join('/')}`;
      const title = pageTitles[currentPath];
      if (title) {
        breadcrumbs.push({ label: title, href: currentPath });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  const pageTitle = pageTitles[pathname] || 'Dashboard';

  return (
    <>
      <header className={styles.header}>
        <HStack justify="between" align="center" className={styles.content}>
          {/* Left side - Mobile menu + Breadcrumb */}
          <HStack gap="md" align="center">
            {/* Mobile menu button */}
            <div className={styles.mobileMenuBtn}>
              <IconButton
                variant="ghost"
                size="md"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                ☰
              </IconButton>
            </div>

            {/* Breadcrumb */}
            <Breadcrumb className={styles.breadcrumb}>
              {breadcrumbs.map((crumb, index) => (
                <BreadcrumbItem key={crumb.href} isCurrentPage={index === breadcrumbs.length - 1}>
                  <BreadcrumbLink as={NextLink} href={crumb.href}>
                    {crumb.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
          </HStack>

          {/* Right side - User menu */}
          <HStack gap="md" align="center">
            <Tooltip content="Notifications">
              <IconButton variant="ghost" size="md" aria-label="Notifications">
                🔔
              </IconButton>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={styles.userButton}>
                  <Avatar
                    src={mockUser.avatar}
                    name={mockUser.name}
                    size="sm"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className={styles.userInfo}>
                  <Avatar
                    src={mockUser.avatar}
                    name={mockUser.name}
                    size="md"
                  />
                  <div>
                    <div className={styles.userName}>{mockUser.name}</div>
                    <div className={styles.userEmail}>{mockUser.email}</div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link as={NextLink} href="/dashboard/profile">
                    👤 Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link as={NextLink} href="/dashboard/settings">
                    ⚙️ Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link as={NextLink} href="/">
                    🚪 Sign out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </HStack>
        </HStack>
      </header>

      {/* Mobile Navigation Drawer */}
      <Drawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} placement="left">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              <HStack gap="sm" align="center">
                <span>🌿</span>
                <span>Serenity</span>
              </HStack>
            </DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <VStack gap="xs">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  as={NextLink}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${styles.mobileNavItem} ${pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href)) ? styles.active : ''}`}
                >
                  <HStack gap="sm" align="center">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </HStack>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
