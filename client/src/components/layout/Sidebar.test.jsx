
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './Sidebar';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock useAuthStore
const mockLogout = vi.fn();
vi.mock('@/store/useAuthStore', () => ({
  useAuthStore: () => ({
    user: { name: 'Test User', email: 'test@example.com', role: 'student' },
    logout: mockLogout,
  }),
}));

// Mock lucide-react
vi.mock('lucide-react', () => ({
  Layout: () => <div data-testid="icon-layout" />,
  BookOpen: () => <div data-testid="icon-book" />,
  Medal: () => <div data-testid="icon-medal" />,
  FileText: () => <div data-testid="icon-file" />,
  LogOut: () => <div data-testid="icon-logout" />,
  Menu: () => <div data-testid="icon-menu" />,
  X: () => <div data-testid="icon-x" />,
}));

describe('Sidebar Component', () => {
  it('renders student navigation items', () => {
    render(<Sidebar />);
    expect(screen.getByText('Dashboard')).toBeDefined();
    expect(screen.getByText('Explore Courses')).toBeDefined();
    expect(screen.getByText('Leaderboard')).toBeDefined();
    expect(screen.getByText('CV Builder')).toBeDefined();
  });

  it('renders user info correctly', () => {
    render(<Sidebar />);
    expect(screen.getByText('Test User')).toBeDefined();
    expect(screen.getByText('test@example.com')).toBeDefined();
  });

  it('calls logout and redirects on sign out click', () => {
    render(<Sidebar />);
    const signOutButton = screen.getByText('Sign Out');
    fireEvent.click(signOutButton);
    expect(mockLogout).toHaveBeenCalled();
  });
});
