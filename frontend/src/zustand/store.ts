import { create } from "zustand"

const useStore = create((set: any) => ({
  isLogged: false,
  signinIn: () => set(()=> ({isLogged: true})),
  signOut: () => set(()=> ({isLogged: false})),
  toggle: () => set((state: {isLogged: boolean}) => ({isLogged: !state.isLogged}))
})) 
