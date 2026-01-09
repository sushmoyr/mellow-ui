/**
 * MellowUI Avatar Component
 * 
 * User image with fallback initials.
 */

import { forwardRef, useState, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Avatar.module.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
    /** Image source */
    src?: string;

    /** Alt text */
    alt?: string;

    /** User name for fallback initials */
    name?: string;

    /** Size */
    size?: AvatarSize;

    /** Custom fallback icon */
    fallback?: ReactNode;

    /** Custom className */
    className?: string;

    /** Background color for initials */
    color?: 'primary' | 'secondary' | 'accent' | 'gray';
}

function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * MellowUI Avatar
 * 
 * Displays a user avatar with fallback to initials.
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
    (
        {
            src,
            alt = '',
            name,
            size = 'md',
            fallback,
            color = 'primary',
            className,
        },
        ref
    ) => {
        const [imgError, setImgError] = useState(false);
        const showImage = src && !imgError;
        const initials = name ? getInitials(name) : '';

        return (
            <div
                ref={ref}
                className={clsx(
                    styles.avatar,
                    styles[`size-${size}`],
                    styles[`color-${color}`],
                    className
                )}
            >
                {showImage ? (
                    <img
                        src={src}
                        alt={alt || name || 'Avatar'}
                        className={styles.image}
                        onError={() => setImgError(true)}
                    />
                ) : fallback ? (
                    <span className={styles.fallback}>{fallback}</span>
                ) : (
                    <span className={styles.initials}>{initials || '?'}</span>
                )}
            </div>
        );
    }
);

Avatar.displayName = 'Avatar';

// ========== Avatar Group ==========

export interface AvatarGroupProps {
    /** Avatar children */
    children: ReactNode;

    /** Maximum avatars to show */
    max?: number;

    /** Size for all avatars */
    size?: AvatarSize;

    /** Custom className */
    className?: string;
}

export function AvatarGroup({
    children,
    max,
    size = 'md',
    className,
}: AvatarGroupProps) {
    const avatars = Array.isArray(children) ? children : [children];
    const visibleAvatars = max ? avatars.slice(0, max) : avatars;
    const remainingCount = max && avatars.length > max ? avatars.length - max : 0;

    return (
        <div className={clsx(styles.group, styles[`size-${size}`], className)}>
            {visibleAvatars}
            {remainingCount > 0 && (
                <div className={clsx(styles.avatar, styles[`size-${size}`], styles.overflow)}>
                    <span className={styles.initials}>+{remainingCount}</span>
                </div>
            )}
        </div>
    );
}

AvatarGroup.displayName = 'AvatarGroup';
