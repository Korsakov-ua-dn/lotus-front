import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_PUBLIC_API_URL}`,
});

export const activityApi = {
  getAll() {
    return instance.get<ActivityType[]>(`/api/activity`);
  },
  getOne(id: string) {
    return instance.get<ActivityType>(`/api/activity/${id}`);
  },
};

// types
export type ActivityType = {
  title: string
  startDate: string
  now: string
  expDate: string
  bidders: BiddersType[]
  _id: string
};

export type BiddersType = {
  id: number
  name: string
}