/**
 * MellowUI List Component
 * 
 * Styled list items.
 */

import { forwardRef, ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './List.module.css';

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
    /** Variant */
    variant?: 'plain' | 'divided' | 'bordered';

    /** Spacing between items */
    spacing?: 'none' | 'sm' | 'md' | 'lg';

    /** Children */
    children: ReactNode;
}

export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
    /** Leading element (icon, avatar) */
    leading?: ReactNode;

    /** Trailing element (badge, icon) */
    trailing?: ReactNode;

    /** Primary text */
    children: ReactNode;

    /** Secondary text */
    secondary?: ReactNode;

    /** Clickable */
    clickable?: boolean;

    /** Selected */
    selected?: boolean;
}

export const List = forwardRef<HTMLUListElement, ListProps>(
    ({ variant = 'plain', spacing = 'none', children, className, ...props }, ref) => {
        return (
            <ul
                ref={ref}
                className={clsx(
                    styles.list,
                    styles[`variant-${variant}`],
                    styles[`spacing-${spacing}`],
                    className
                )}
                {...props}
            >
                {children}
            </ul>
        );
    }
);

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
    ({ leading, trailing, children, secondary, clickable = false, selected = false, className, onClick, ...props }, ref) => {
        return (
            <li
                ref={ref}
                className={clsx(
                    styles.item,
                    {
                        [styles.clickable]: clickable || onClick,
                        [styles.selected]: selected,
                    },
                    className
                )}
                onClick={onClick}
                {...props}
            >
                {leading && <span className={styles.leading}>{leading}</span>}
                <div className={styles.content}>
                    <span className={styles.primary}>{children}</span>
                    {secondary && <span className={styles.secondary}>{secondary}</span>}
                </div>
                {trailing && <span className={styles.trailing}>{trailing}</span>}
            </li>
        );
    }
);

List.displayName = 'List';
ListItem.displayName = 'ListItem';
