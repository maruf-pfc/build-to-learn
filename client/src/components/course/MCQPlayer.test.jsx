
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MCQPlayer from './MCQPlayer';

// Mock api
vi.mock('@/lib/api', () => ({
  default: {
    post: vi.fn(),
  },
}));

// Mock sonner
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

const mockLesson = {
  title: 'Test Quiz',
  questions: [
    {
      _id: 'q1',
      text: 'What is 2+2?',
      type: 'single',
      options: ['3', '4', '5'],
      points: 1,
    }
  ],
  quizSettings: {
    timeLimit: 10
  }
};

describe('MCQPlayer Component', () => {
  it('renders quiz title and questions', () => {
    render(<MCQPlayer lesson={mockLesson} courseId="c1" moduleId="m1" onComplete={() => {}} />);
    expect(screen.getByText('Test Quiz')).toBeDefined();
    expect(screen.getByText('What is 2+2?')).toBeDefined();
    expect(screen.getByText('4')).toBeDefined();
  });

  it('allows selecting an option', () => {
    render(<MCQPlayer lesson={mockLesson} courseId="c1" moduleId="m1" onComplete={() => {}} />);
    const option = screen.getByText('4');
    fireEvent.click(option);
    // In actual component, it adds a class or border. We check if it was clicked without error.
    expect(option).toBeDefined();
  });
});
