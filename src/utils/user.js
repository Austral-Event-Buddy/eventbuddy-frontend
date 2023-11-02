export const getUser = () => parseInt(localStorage.getItem('user'))

export const saveUser = (user) => localStorage.setItem('user', user)