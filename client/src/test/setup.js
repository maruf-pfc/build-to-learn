
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Clean up after each test (unmounts components, etc.)
afterEach(() => {
  cleanup()
})
