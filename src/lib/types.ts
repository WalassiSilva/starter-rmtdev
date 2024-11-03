export type TJobItem = {
  id: number;
  title: string;
  company: string;
  daysAgo: number;
  badgeLetters: string;
  relevanceScore: number;
};

export type TJobItemDetails = TJobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  salary: string;
  location: string;
  coverImgURL: string;
  companyURL: string;
};
