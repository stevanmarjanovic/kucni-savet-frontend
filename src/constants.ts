import type {User} from "@/api/models";

export const colors = [
  "#54CE89", // Emerald Green
  "#5AE846", // Radio Active
  "#AAFE54", // Green Yellow
  "#CBEA47", // Lemon Lime
  "#FFBC11", // Amber Flame
  "#F6D215", // Pumpkin Spice
  "#FF4622", // Blazing Flame
  "#EF3059", // Hot Fuchsia
  "#D436D8", // Vivid Orchid
  "#893DF4", // Blue Violet
  "#585BE8", // Marjorelle Blue
  "#2296F2", // Dogger Blue
  "#2296F2", // Sand Dune
]

export const imageSrc = (user: User) => `${import.meta.env.VITE_BACKEND_URL}/api/user/${ user.id }/image`
