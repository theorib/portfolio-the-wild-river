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
} as const;

export type MessageCatalog = keyof typeof messageCatalog;
export type MessageCatalogMessage =
  (typeof messageCatalog)[MessageCatalog]['message'];
