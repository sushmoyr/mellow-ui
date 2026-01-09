/**
 * MellowUI Pagination Component
 * 
 * Page navigation controls.
 */

import { forwardRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './Pagination.module.css';

export type PaginationSize = 'sm' | 'md' | 'lg';

export interface PaginationProps {
    /** Current page (1-indexed) */
    page: number;

    /** Total number of pages */
    totalPages: number;

    /** Called when page changes */
    onPageChange: (page: number) => void;

    /** Number of siblings on each side of current page */
    siblingCount?: number;

    /** Size */
    size?: PaginationSize;

    /** Show first/last buttons */
    showEdges?: boolean;

    /** Custom className */
    className?: string;
}

function range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
    (
        {
            page,
            totalPages,
            onPageChange,
            siblingCount = 1,
            size = 'md',
            showEdges = true,
            className,
        },
        ref
    ) => {
        const pages = useMemo(() => {
            const totalNumbers = siblingCount * 2 + 3; // siblings + current + 2 edges minimum
            const totalBlocks = totalNumbers + 2; // + 2 for ellipses

            if (totalPages <= totalBlocks) {
                return range(1, totalPages);
            }

            const leftSiblingIndex = Math.max(page - siblingCount, 1);
            const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

            const showLeftDots = leftSiblingIndex > 2;
            const showRightDots = rightSiblingIndex < totalPages - 1;

            if (!showLeftDots && showRightDots) {
                const leftRange = range(1, 3 + 2 * siblingCount);
                return [...leftRange, 'dots', totalPages];
            }

            if (showLeftDots && !showRightDots) {
                const rightRange = range(totalPages - (2 + 2 * siblingCount), totalPages);
                return [1, 'dots', ...rightRange];
            }

            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [1, 'dots', ...middleRange, 'dots', totalPages];
        }, [page, totalPages, siblingCount]);

        const handlePrev = useCallback(() => {
            if (page > 1) onPageChange(page - 1);
        }, [page, onPageChange]);

        const handleNext = useCallback(() => {
            if (page < totalPages) onPageChange(page + 1);
        }, [page, totalPages, onPageChange]);

        return (
            <nav ref={ref} aria-label="Pagination" className={clsx(styles.pagination, styles[`size-${size}`], className)}>
                {/* Previous */}
                <button
                    className={clsx(styles.button, styles.arrow)}
                    onClick={handlePrev}
                    disabled={page === 1}
                    aria-label="Previous page"
                >
                    ‹
                </button>

                {/* Pages */}
                {pages.map((p, index) => {
                    if (p === 'dots') {
                        return (
                            <span key={`dots-${index}`} className={styles.dots}>
                                …
                            </span>
                        );
                    }

                    const pageNum = p as number;
                    const isActive = pageNum === page;

                    return (
                        <button
                            key={pageNum}
                            className={clsx(styles.button, { [styles.active]: isActive })}
                            onClick={() => onPageChange(pageNum)}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {pageNum}
                            {isActive && (
                                <motion.div
                                    className={styles.activeIndicator}
                                    layoutId="pagination-active"
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            )}
                        </button>
                    );
                })}

                {/* Next */}
                <button
                    className={clsx(styles.button, styles.arrow)}
                    onClick={handleNext}
                    disabled={page === totalPages}
                    aria-label="Next page"
                >
                    ›
                </button>
            </nav>
        );
    }
);

Pagination.displayName = 'Pagination';
