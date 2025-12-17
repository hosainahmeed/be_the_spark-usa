import baseApis from "../baseApis";

export interface OrganizerUser {
  _id: string;
  isBlocked: boolean;
}

export interface OrganizerResponse {
  _id: string;
  user: OrganizerUser;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  address: string;
  profile_image: string;
  averageRating: number;
  totalRatings: number;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const organizerRatingApis = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getRating: builder.query({
            query: () => ({
                url: '/organizer/organizer-rating',
                method: 'GET',
            })
        }),
        getOrganizer: builder.query<ApiResponse<OrganizerResponse>, string>({
            query: (id: string) => ({
                url: `/organizer/single-organizer/${id}`,
                method: 'GET',
            })
        }),
    })
})

export const { useGetRatingQuery, useGetOrganizerQuery } = organizerRatingApis