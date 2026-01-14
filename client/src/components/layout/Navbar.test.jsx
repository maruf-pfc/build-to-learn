
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock useAuthStore
vi.mock('@/store/useAuthStore', () => ({
  useAuthStore: () => ({
    user: null,
  }),
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
  BookOpen: () => <div data-testid="icon-book" />,
  Layout: () => <div data-testid="icon-layout" />,
  Menu: () => <div data-testid="icon-menu" />,
  X: () => <div data-testid="icon-x" />,
  LogIn: () => <div data-testid="icon-login" />,
  UserPlus: () => <div data-testid="icon-user-plus" />,
}));

// Mock ModeToggle
vi.mock('@/components/mode-toggle', () => ({
  ModeToggle: () => <div data-testid="mode-toggle" />,
}));

describe('Navbar Component', () => {
  it('renders logo and navigation items', () => {
    render(<Navbar />);
    // Use getAllByText because "Build" appears in Logo and "CV Builder"
    expect(screen.getAllByText(/Build/i).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/2/i)).toBeDefined();
    expect(screen.getByText(/Learn/i)).toBeDefined();
    
    expect(screen.getByText('Courses')).toBeDefined();
    expect(screen.getByText('Blog')).toBeDefined();
    expect(screen.getByText('CV Builder')).toBeDefined();
  });

  it('shows login and register buttons when guest', () => {
    render(<Navbar />);
    expect(screen.getByText('Log in')).toBeDefined();
    expect(screen.getByText('Get Started')).toBeDefined();
  });
});
