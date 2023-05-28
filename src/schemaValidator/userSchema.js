export const userSchema = {
  type: 'object',
  required: ['name', 'email', 'password'],
  properties: {
    name: {
      type: 'string',
      minLength: 2,
      maxLength: 255
    },
    email: {
      type: 'string',
      minLength: 5
    },
    password: {
      type: 'string',
      minLength: 4,
      maxLength: 64

    }
  }
}
