import { create } from "zustand"

const useStore = create((set: any) => ({
  isLogged: false,
  username: '',
  signinIn: ()=> set({isLogged: true}),
  signOut: ()=> set({isLogged: false}),
  toggle: () => set((state: {isLogged: boolean}) => ({isLogged: !state.isLogged})),
  setUsername: (username: string) => set({username})
})) 

export default useStore;
