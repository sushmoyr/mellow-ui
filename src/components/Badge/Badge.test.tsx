/**
 * Badge Component Tests
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from '../Badge';

describe('Badge', () => {
    it('renders with children', () => {
        render(<Badge>New</Badge>);
        expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders different variants', () => {
        const { rerender } = render(<Badge variant="solid">Solid</Badge>);
        expect(screen.getByText('Solid')).toBeInTheDocument();

        rerender(<Badge variant="outline">Outline</Badge>);
        expect(screen.getByText('Outline')).toBeInTheDocument();

        rerender(<Badge variant="subtle">Subtle</Badge>);
        expect(screen.getByText('Subtle')).toBeInTheDocument();
    });

    it('renders different colors', () => {
        const { rerender } = render(<Badge color="primary">Primary</Badge>);
        expect(screen.getByText('Primary')).toBeInTheDocument();

        rerender(<Badge color="success">Success</Badge>);
        expect(screen.getByText('Success')).toBeInTheDocument();

        rerender(<Badge color="error">Error</Badge>);
        expect(screen.getByText('Error')).toBeInTheDocument();
    });

    it('renders different sizes', () => {
        const { rerender } = render(<Badge size="sm">Small</Badge>);
        expect(screen.getByText('Small')).toBeInTheDocument();

        rerender(<Badge size="lg">Large</Badge>);
        expect(screen.getByText('Large')).toBeInTheDocument();
    });
});
