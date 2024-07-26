import { vi } from 'vitest';
const mockServerOnly = () => {
  vi.mock('server-only', () => ({}));
};

export default mockServerOnly;
