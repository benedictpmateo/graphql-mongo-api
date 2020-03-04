const lists = [
  { id: 1, name: 'Benedict Mateo' },
  { id: 2, name: 'John Doe' },
  { id: 3, name: 'Jane Doe' },
]

export const Query = {
  users: (user, args) => {
    return lists
  },
  user: (user, args) => {
    return lists.find((list) => list.id === args.id)
  }
}

export const Mutation = {
  addUser: (user, args) => {
    lists.push(args)
    return args
  },
  removeUser: (user, args) => {
    return {
      type: "success",
      message: "Successfully removed"
    }
  }
}

export default {
  Query,
  Mutation
}