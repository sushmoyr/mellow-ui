/**
 * MellowUI Breadcrumb Component
 * 
 * Path-based navigation.
 */

import { forwardRef, ReactNode, Children, isValidElement, cloneElement } from 'react';
import clsx from 'clsx';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbProps {
    /** Separator between items */
    separator?: ReactNode;

    /** Children (BreadcrumbItem) */
    children: ReactNode;

    /** Custom className */
    className?: string;
}

export interface BreadcrumbItemProps {
    /** Link href */
    href?: string;

    /** Is current/active page */
    isCurrent?: boolean;

    /** Children */
    children: ReactNode;

    /** Custom className */
    className?: string;

    /** Click handler */
    onClick?: () => void;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
    ({ separator = '/', children, className }, ref) => {
        const items = Children.toArray(children).filter(isValidElement);

        return (
            <nav ref={ref} aria-label="Breadcrumb" className={clsx(styles.breadcrumb, className)}>
                <ol className={styles.list}>
                    {items.map((child, index) => (
                        <li key={index} className={styles.item}>
                            {index > 0 && <span className={styles.separator}>{separator}</span>}
                            {child}
                        </li>
                    ))}
                </ol>
            </nav>
        );
    }
);

Breadcrumb.displayName = 'Breadcrumb';

export const BreadcrumbItem = forwardRef<HTMLAnchorElement | HTMLSpanElement, BreadcrumbItemProps>(
    ({ href, isCurrent = false, children, className, onClick }, ref) => {
        const commonProps = {
            className: clsx(styles.link, { [styles.current]: isCurrent }, className),
            'aria-current': isCurrent ? 'page' as const : undefined,
        };

        if (isCurrent || !href) {
            return (
                <span ref={ref as React.Ref<HTMLSpanElement>} {...commonProps}>
                    {children}
                </span>
            );
        }

        return (
            <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} onClick={onClick} {...commonProps}>
                {children}
            </a>
        );
    }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';
