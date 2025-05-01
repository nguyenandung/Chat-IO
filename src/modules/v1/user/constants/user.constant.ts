export const USER_CONSTANT = {
  parameters: {
    phoneNumber: {
      invalid: 'Invalid phone number of user.',
      alreadyExists: { code: 5001, message: 'Phone number already exists.' },
    },
  },
  validate: {
    notFound: 'User not found.',
  },
};
