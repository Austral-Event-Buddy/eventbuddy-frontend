export const getUser = () => localStorage.getItem('user')

export const saveUser = (user) => localStorage.setItem('user', user)