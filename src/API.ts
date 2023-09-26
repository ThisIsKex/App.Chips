/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCashSessionInput = {
  id?: string | null,
  sessionName: string,
};

export type ModelCashSessionConditionInput = {
  sessionName?: ModelStringInput | null,
  and?: Array< ModelCashSessionConditionInput | null > | null,
  or?: Array< ModelCashSessionConditionInput | null > | null,
  not?: ModelCashSessionConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type CashSession = {
  __typename: "CashSession",
  id: string,
  sessionName: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCashSessionInput = {
  id: string,
  sessionName?: string | null,
};

export type DeleteCashSessionInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  username: string,
  userSessionId: string,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  userSessionId?: ModelIDInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  session: CashSession,
  username: string,
  createdAt: string,
  updatedAt: string,
  userSessionId: string,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  userSessionId?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateExpenseInput = {
  id?: string | null,
  expenseAmount: number,
  expenseSessionId: string,
  expenseUserId: string,
};

export type ModelExpenseConditionInput = {
  expenseAmount?: ModelFloatInput | null,
  and?: Array< ModelExpenseConditionInput | null > | null,
  or?: Array< ModelExpenseConditionInput | null > | null,
  not?: ModelExpenseConditionInput | null,
  expenseSessionId?: ModelIDInput | null,
  expenseUserId?: ModelIDInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Expense = {
  __typename: "Expense",
  id: string,
  session: CashSession,
  user: User,
  expenseAmount: number,
  createdAt: string,
  updatedAt: string,
  expenseSessionId: string,
  expenseUserId: string,
};

export type UpdateExpenseInput = {
  id: string,
  expenseAmount?: number | null,
  expenseSessionId?: string | null,
  expenseUserId?: string | null,
};

export type DeleteExpenseInput = {
  id: string,
};

export type ModelCashSessionFilterInput = {
  id?: ModelIDInput | null,
  sessionName?: ModelStringInput | null,
  and?: Array< ModelCashSessionFilterInput | null > | null,
  or?: Array< ModelCashSessionFilterInput | null > | null,
  not?: ModelCashSessionFilterInput | null,
};

export type ModelCashSessionConnection = {
  __typename: "ModelCashSessionConnection",
  items:  Array<CashSession | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
  userSessionId?: ModelIDInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelExpenseFilterInput = {
  id?: ModelIDInput | null,
  expenseAmount?: ModelFloatInput | null,
  and?: Array< ModelExpenseFilterInput | null > | null,
  or?: Array< ModelExpenseFilterInput | null > | null,
  not?: ModelExpenseFilterInput | null,
  expenseSessionId?: ModelIDInput | null,
  expenseUserId?: ModelIDInput | null,
};

export type ModelExpenseConnection = {
  __typename: "ModelExpenseConnection",
  items:  Array<Expense | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionCashSessionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  sessionName?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCashSessionFilterInput | null > | null,
  or?: Array< ModelSubscriptionCashSessionFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionExpenseFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  expenseAmount?: ModelSubscriptionFloatInput | null,
  and?: Array< ModelSubscriptionExpenseFilterInput | null > | null,
  or?: Array< ModelSubscriptionExpenseFilterInput | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateCashSessionMutationVariables = {
  input: CreateCashSessionInput,
  condition?: ModelCashSessionConditionInput | null,
};

export type CreateCashSessionMutation = {
  createCashSession?:  {
    __typename: "CashSession",
    id: string,
    sessionName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCashSessionMutationVariables = {
  input: UpdateCashSessionInput,
  condition?: ModelCashSessionConditionInput | null,
};

export type UpdateCashSessionMutation = {
  updateCashSession?:  {
    __typename: "CashSession",
    id: string,
    sessionName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCashSessionMutationVariables = {
  input: DeleteCashSessionInput,
  condition?: ModelCashSessionConditionInput | null,
};

export type DeleteCashSessionMutation = {
  deleteCashSession?:  {
    __typename: "CashSession",
    id: string,
    sessionName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    session:  {
      __typename: "CashSession",
      id: string,
      sessionName: string,
      createdAt: string,
      updatedAt: string,
    },
    username: string,
    createdAt: string,
    updatedAt: string,
    userSessionId: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    session:  {
      __typename: "CashSession",
      id: string,
      sessionName: string,
      createdAt: string,
      updatedAt: string,
    },
    username: string,
    createdAt: string,
    updatedAt: string,
    userSessionId: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    session:  {
      __typename: "CashSession",
      id: string,
      sessionName: string,
      createdAt: string,
      updatedAt: string,
    },
    username: string,
    createdAt: string,
    updatedAt: string,
    userSessionId: string,
  } | null,
};

export type CreateExpenseMutationVariables = {
  input: CreateExpenseInput,
  condition?: ModelExpenseConditionInput | null,
};

export type CreateExpenseMutation = {
  createExpense?:  {
    __typename: "Expense",
    id: string,
    session:  {
      __typename: "CashSession",
      id: string,
      sessionName: string,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      username: string,
      createdAt: string,
      updatedAt: string,
      userSessionId: string,
    },
    expenseAmount: number,
    createdAt: string,
    updatedAt: string,
    expenseSessionId: string,
    expenseUserId: string,
  } | null,
};

export type UpdateExpenseMutationVariables = {
  input: UpdateExpenseInput,
  condition?: ModelExpenseConditionInput | null,
};

export type UpdateExpenseMutation = {
  updateExpense?:  {
    __typename: "Expense",
    id: string,
    session:  {
      __typename: "CashSession",
      id: string,
      sessionName: string,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      username: string,
      createdAt: string,
      updatedAt: string,
      userSessionId: string,
    },
    expenseAmount: number,
    createdAt: string,
    updatedAt: string,
    expenseSessionId: string,
    expenseUserId: string,
  } | null,
};

export type DeleteExpenseMutationVariables = {
  input: DeleteExpenseInput,
  condition?: ModelExpenseConditionInput | null,
};

export type DeleteExpenseMutation = {
  deleteExpense?:  {
    __typename: "Expense",
    id: string,
    session:  {
      __typename: "CashSession",
      id: string,
      sessionName: string,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      username: string,
      createdAt: string,
      updatedAt: string,
      userSessionId: string,
    },
    expenseAmount: number,
    createdAt: string,
    updatedAt: string,
    expenseSessionId: string,
    expenseUserId: string,
  } | null,
};

export type GetCashSessionQueryVariables = {
  id: string,
};

export type GetCashSessionQuery = {
  getCashSession?:  {
    __typename: "CashSession",
    id: string,
    sessionName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCashSessionsQueryVariables = {
  filter?: ModelCashSessionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCashSessionsQuery = {
  listCashSessions?:  {
    __typename: "ModelCashSessionConnection",
    items:  Array< {
      __typename: "CashSession",
      id: string,
      sessionName: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    session:  {
      __typename: "CashSession",
      id: string,
      sessionName: string,
      createdAt: string,
      updatedAt: string,
    },
    username: string,
    createdAt: string,
    updatedAt: string,
    userSessionId: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      createdAt: string,
      updatedAt: string,
      userSessionId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetExpenseQueryVariables = {
  id: string,
};

export type GetExpenseQuery = {
  getExpense?:  {
    __typename: "Expense",
    id: string,
    session:  {
      __typename: "CashSession",
      id: string,
      sessionName: string,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      username: string,
      createdAt: string,
      updatedAt: string,
      userSessionId: string,
    },
    expenseAmount: number,
    createdAt: string,
    updatedAt: string,
    expenseSessionId: string,
    expenseUserId: string,
  } | null,
};

export type ListExpensesQueryVariables = {
  filter?: ModelExpenseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListExpensesQuery = {
  listExpenses?:  {
    __typename: "ModelExpenseConnection",
    items:  Array< {
      __typename: "Expense",
      id: string,
      expenseAmount: number,
      createdAt: string,
      updatedAt: string,
      expenseSessionId: string,
      expenseUserId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateCashSessionSubscriptionVariables = {
  filter?: ModelSubscriptionCashSessionFilterInput | null,
};

export type OnCreateCashSessionSubscription = {
  onCreateCashSession?:  {
    __typename: "CashSession",
    id: string,
    sessionName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCashSessionSubscriptionVariables = {
  filter?: ModelSubscriptionCashSessionFilterInput | null,
};

export type OnUpdateCashSessionSubscription = {
  onUpdateCashSession?:  {
    __typename: "CashSession",
    id: string,
    sessionName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCashSessionSubscriptionVariables = {
  filter?: ModelSubscriptionCashSessionFilterInput | null,
};

export type OnDeleteCashSessionSubscription = {
  onDeleteCashSession?:  {
    __typename: "CashSession",
    id: string,
    sessionName: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    session:  {
      __typename: "CashSession",
      id: string,
      sessionName: string,
      createdAt: string,
      updatedAt: string,
    },
    username: string,
    createdAt: string,
    updatedAt: string,
    userSessionId: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    session:  {
      __typename: "CashSession",
      id: string,
      sessionName: string,
      createdAt: string,
      updatedAt: string,
    },
    username: string,
    createdAt: string,
    updatedAt: string,
    userSessionId: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    session:  {
      __typename: "CashSession",
      id: string,
      sessionName: string,
      createdAt: string,
      updatedAt: string,
    },
    username: string,
    createdAt: string,
    updatedAt: string,
    userSessionId: string,
  } | null,
};

export type OnCreateExpenseSubscriptionVariables = {
  filter?: ModelSubscriptionExpenseFilterInput | null,
};

export type OnCreateExpenseSubscription = {
  onCreateExpense?:  {
    __typename: "Expense",
    id: string,
    session:  {
      __typename: "CashSession",
      id: string,
      sessionName: string,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      username: string,
      createdAt: string,
      updatedAt: string,
      userSessionId: string,
    },
    expenseAmount: number,
    createdAt: string,
    updatedAt: string,
    expenseSessionId: string,
    expenseUserId: string,
  } | null,
};

export type OnUpdateExpenseSubscriptionVariables = {
  filter?: ModelSubscriptionExpenseFilterInput | null,
};

export type OnUpdateExpenseSubscription = {
  onUpdateExpense?:  {
    __typename: "Expense",
    id: string,
    session:  {
      __typename: "CashSession",
      id: string,
      sessionName: string,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      username: string,
      createdAt: string,
      updatedAt: string,
      userSessionId: string,
    },
    expenseAmount: number,
    createdAt: string,
    updatedAt: string,
    expenseSessionId: string,
    expenseUserId: string,
  } | null,
};

export type OnDeleteExpenseSubscriptionVariables = {
  filter?: ModelSubscriptionExpenseFilterInput | null,
};

export type OnDeleteExpenseSubscription = {
  onDeleteExpense?:  {
    __typename: "Expense",
    id: string,
    session:  {
      __typename: "CashSession",
      id: string,
      sessionName: string,
      createdAt: string,
      updatedAt: string,
    },
    user:  {
      __typename: "User",
      id: string,
      username: string,
      createdAt: string,
      updatedAt: string,
      userSessionId: string,
    },
    expenseAmount: number,
    createdAt: string,
    updatedAt: string,
    expenseSessionId: string,
    expenseUserId: string,
  } | null,
};
