'use client'

import { TanStackDevtools } from '@tanstack/react-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { FormDevtoolsPanel } from '@tanstack/react-form-devtools'
// import { ReactTableDevtoolsPanel } from '@tanstack/react-table-devtools'

export function DevtoolsProvider() {
  return (
    <TanStackDevtools
      plugins={[
        {
          name: 'TanStack Query',
          render: <ReactQueryDevtoolsPanel />,
        },
        {
          name: 'TanStack Form',
          render: <FormDevtoolsPanel />,
        },
        // {
        //   name: 'TanStack Table',
        //   render: <ReactTableDevtoolsPanel table={} />,
        // },
      ]}
    />
  )
}
