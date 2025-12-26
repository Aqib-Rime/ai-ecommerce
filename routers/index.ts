import { getById, health, me } from "./users";

export const router = {
  users: {
    me,
    getById,
  },
  health,
};
