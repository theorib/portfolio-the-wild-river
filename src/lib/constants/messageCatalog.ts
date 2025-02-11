export const messageCatalog = {
  USER_UPDATE_SUCCESSFUL: {
    name: 'USER_UPDATE_SUCCESSFUL',
    message: 'User updated successfully',
  },
  USER_ADD_SUCCESSFUL: {
    name: 'USER_ADD_SUCCESSFUL',
    message: 'User successfully created',
  },
  USER_SELECT_SUCCESSFUL: {
    name: 'USER_SELECT_SUCCESSFUL',
    message: 'User data retrieved successfully from the database',
  },
  REQUEST_SUCCESSFUL: {
    name: 'REQUEST_SUCCESSFUL',
    message: 'Request successful',
    code: 200,
  },
} as const satisfies Record<string, MessageCatalogEntry<string>>
export type MessageCatalogEntry<K extends string> = {
  name: K
  message: string
  code?: number
}
export type MessageCatalog = keyof typeof messageCatalog
export type MessageCatalogName = MessageCatalog
export type MessageCatalogMessage =
  (typeof messageCatalog)[MessageCatalog]['message']
export type MessageCatalogCode = number | string
