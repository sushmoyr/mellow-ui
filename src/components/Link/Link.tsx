/**
 * MellowUI Link Component
 * 
 * Styled anchor with hover effects.
 */

import { forwardRef, AnchorHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Link.module.css';

export type LinkVariant = 'default' | 'subtle' | 'accent';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Visual variant */
    variant?: LinkVariant;

    /** Show underline only on hover */
    underlineOnHover?: boolean;

    /** External link (opens in new tab) */
    external?: boolean;

    /** Children */
    children: ReactNode;
}

/**
 * MellowUI Link
 * 
 * Styled anchor with hover animations.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
    (
        {
            variant = 'default',
            underlineOnHover = false,
            external = false,
            children,
            className,
            ...props
        },
        ref
    ) => {
        const externalProps = external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {};

        return (
            <a
                ref={ref}
                className={clsx(
                    styles.link,
                    styles[`variant-${variant}`],
                    { [styles.underlineOnHover]: underlineOnHover },
                    className
                )}
                {...externalProps}
                {...props}
            >
                {children}
                {external && <span className={styles.externalIcon}>↗</span>}
            </a>
        );
    }
);

Link.displayName = 'Link';
