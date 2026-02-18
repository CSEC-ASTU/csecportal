/*   */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCookie, deleteCookie } from "cookies-next";
// import type { RootState } from "./store";
import { RootState } from "../store";
import { IMemberData } from "@/types/member.type";
import { IDivision } from "@/types/divisions.types";
import { Testimonial } from "@/types/testimonial.type";
import { Faq } from "@/types/faq.types";
import { IResource } from "@/types/resource.type";

const SERVER_URI =
  process.env.NEXT_PUBLIC_SERVER_URI || "http://localhost:5500/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URI,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      // Get token from Redux state if available
      const token = (getState() as RootState).auth.token;

      // Fallback to cookie if not in Redux state
      if (!token) {
        const cookieToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("auth_token="))
          ?.split("=")[1];

        if (cookieToken) {
          headers.set("Authorization", `Bearer ${cookieToken}`);
        }
      } else {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: [
    "Auth",
    "User",
    "Attendance",
    "Sessions",
    "Testimonial",
    "Faq",
    "Articles",
    "Resources",
    "Members",
    "Member",
    "Group",
    "GroupMembers",
  ],
  endpoints: (builder) => ({
    login: builder.mutation<
      {
        token: string;
        user: any;
      },
      {
        email: string;
        password: string;
      }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: { data: any }) => {
        setCookie("auth_token", response.data.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });

        setCookie("auth_user", JSON.stringify(response.data.user), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });

        return response.data;
      },
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      transformResponse: () => {
        // Clear cookies on logout
        deleteCookie("auth_token");
        deleteCookie("jwt");
      },
      invalidatesTags: ["Auth", "User"],
    }),

    verifyOtp: builder.mutation<void, { email: string; otp: string }>({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
      transformResponse: () => {},
      invalidatesTags: ["Auth", "User"],
    }),

    resendOtp: builder.mutation<void, { email: string }>({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
      transformResponse: () => {},
      invalidatesTags: ["Auth", "User"],
    }),

    requestPasswordReset: builder.mutation<void, { email: string }>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
      transformResponse: () => {},
      invalidatesTags: ["Auth", "User"],
    }),

    resetPassword: builder.mutation<void, { token: string; password: string }>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
      transformResponse: () => {},
      invalidatesTags: ["Auth", "User"],
    }),

    // TODO: FOR SESSIONS
    createSession: builder.mutation<void, Partial<void>>({
      query: (newSession) => ({
        url: "sessions/new",
        method: "POST",
        body: newSession,
      }),
    }),

    getAllSession: builder.query({
      query: ({ ...params }) => {
        const searchParams = new URLSearchParams(
          params as Record<string, string>
        ).toString();
        return `/sessions/?${searchParams}`;
      },
    }),

    getSessionById: builder.query<{ session: any }, string>({
      query: (id) => `/sessions/${id}`,
    }),

    getAllSessionByDivision: builder.query({
      query: (id: string) => {
        return `/sessions/${id}`;
      },
    }),

    deleteSession: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/session/delete/${id}`, // Assuming your Express route expects this like /session/delete/:id
        method: "DELETE",
        credentials: "include",
      }),
    }),

    updateSession: builder.mutation<void, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/session/update/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    getDivisionSession: builder.query({
      query: ({ ...params }) => {
        const searchParams = new URLSearchParams(
          params as Record<string, string>
        ).toString();
        return `/sessions/divisionss/?${searchParams}`;
      },
    }),

    // TODO: FOR MEMBERS
    addMember: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Members"],
    }),

    // Get all members
    getAllMembers: builder.query<IMemberData[], void>({
      query: () => "/",
      providesTags: ["Members"],
    }),

    // Get verified members
    getVerifiedMembers: builder.query<
      {
        data: {
          user: IMemberData[];
          meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
          };
        };
      },
      { page?: number; limit?: number; search?: string } // Accepts query params
    >({
      query: ({ page = 1, limit = 20, search = "" } = {}) => {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          search,
        });

        return `/members/verified?${params.toString()}`;
      },
      providesTags: ["Members"],
    }),

    // Get all users with filtering, pagination etc.
    getAllUsers: builder.query<any, void>({
      query: () => "/users",
    }),

    // Get all division heads
    getDivisionHeads: builder.query<IMemberData[], void>({
      query: () => "/division-heads",
    }),

    // Invite a member
    inviteMember: builder.mutation({
      query: (body) => ({
        url: "/members/invite",
        method: "POST",
        body,
      }),
    }),

    // Generate a random password
    generatePassword: builder.query<{ password: string }, void>({
      query: () => "/generate-password",
    }),

    // Get member by ID
    getMemberById: builder.query<IMemberData, string>({
      query: (memberId) => `members/${memberId}`,
      providesTags: (result, error, id) => [{ type: "Member", id }],
    }),

    // Update member by ID
    updateMember: builder.mutation({
      query: ({ memberId, body }) => ({
        url: `/${memberId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { memberId }) => [
        { type: "Member", id: memberId },
        "Members",
      ],
    }),

    // Delete member
    deleteMember: builder.mutation({
      query: (memberId) => ({
        url: `/${memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Members"],
    }),

    // Assign division head
    assignDivisionHead: builder.mutation({
      query: ({ divId, data }) => ({
        url: `/divisions/${divId}/head`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Members"],
    }),

    // Remove division head
    removeDivisionHead: builder.mutation({
      query: (body) => ({
        url: "/remove-head",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Members"],
    }),

    // Update own profile with image
    updateOwnProfile: builder.mutation({
      query: (formData: FormData) => ({
        url: "/profile",
        method: "PATCH",
        body: formData,
      }),
    }),

    // Update profile picture (with auth)
    updateProfilePicture: builder.mutation({
      query: ({
        memberId,
        formData,
      }: {
        memberId: string;
        formData: FormData;
      }) => ({
        url: `/update-profile-picture/${memberId}`,
        method: "POST",
        body: formData,
      }),
    }),

    // Simple profile picture update (no auth, Cloudinary)
    simpleProfilePictureUpdate: builder.mutation({
      query: ({
        memberId,
        formData,
      }: {
        memberId: string;
        formData: FormData;
      }) => ({
        url: `/simple-profile-picture/${memberId}`,
        method: "POST",
        body: formData,
      }),
    }),

    // Admin bulk remove (except president)
    removeAllMembersExceptPresident: builder.mutation({
      query: () => ({
        url: "/admin/bulk-operations/remove-all-except-president",
        method: "POST",
      }),
      invalidatesTags: ["Members"],
    }),

    // TODO: THIS IS FOR EVENTS
    createEvent: builder.mutation<void, void>({
      query: (body) => ({
        url: "events/",
        method: "POST",
        body,
      }),
    }),

    // Get all events

    getAllEvents: builder.query({
      query: ({ ...params }) => {
        const searchParams = new URLSearchParams(
          params as Record<string, string>
        ).toString();
        return `/events/?${searchParams}`;
      },
    }),
    getPublicEvents: builder.query({
      query: ({ ...params }) => {
        const searchParams = new URLSearchParams(
          params as Record<string, string>
        ).toString();
        return `/events/publics?${searchParams}`;
      },
    }),
    // Get event by ID
    getEventById: builder.query({
      query: (id) => `/${id}`,
    }),

    // Update event by ID
    updateEvent: builder.mutation({
      query: ({ id, body }) => ({
        url: `/events/${id}`,
        method: "PUT",
        body,
      }),
    }),

    // Delete event by ID
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
    }),

    // TODO: FOR ATTENDANCE
    markAttendance: builder.mutation({
      query: (body) => ({
        url: "/attendance/new",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),

    // 2. Get attendance for a session
    getSessionAttendance: builder.query({
      query: (sessionId: string) => `/attendance/${sessionId}`,
      providesTags: ["Attendance"],
    }),

    // 3. Get sessions for a head
    getHeadSessions: builder.query<void, void>({
      query: () => "/attendance/head-sessions",
      providesTags: ["Sessions"],
    }),

    getPersonAttendance: builder.query<any, string>({
      query: (memberId) => ({
        url: `/attendance/member/${memberId}`,
        method: "GET",
      }),
    }),

    // TODO: FOR DIVISIONS
    getAllDivisions: builder.query<IDivision[], void>({
      query: () => "/divisions",
      transformResponse: (response: { success: boolean; data: IDivision[] }) =>
        response.data,
    }),

    getDivisionMembers: builder.query<{ data: IMemberData[] }, string>({
      query: (id: string) => `/divisions/${id}/members`,
    }),

    getDivisionById: builder.query<any, string>({
      query: (divisionId) => ({
        url: `/divisions/${divisionId}`,
        method: "GET",
      }),
    }),

    createDivision: builder.mutation<
      any,
      { name: string; description: string }
    >({
      query: (body) => ({
        url: "/divisions",
        method: "POST",
        body,
      }),
    }),

    updateDivision: builder.mutation<
      any,
      { divisionId: string; data: { name?: string; description?: string } }
    >({
      query: ({ divisionId, data }) => ({
        url: `/divisions/${divisionId}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteDivision: builder.mutation<any, string>({
      query: (divisionId) => ({
        url: `/divisions/${divisionId}`,
        method: "DELETE",
      }),
    }),

    addMemberToDivision: builder.mutation<
      any,
      { divisionId: string; memberId: string }
    >({
      query: ({ divisionId, memberId }) => ({
        url: `/divisions/${divisionId}/members`,
        method: "POST",
        body: { memberId },
      }),
    }),

    removeMemberFromDivision: builder.mutation<
      any,
      { divisionId: string; memberId: string }
    >({
      query: ({ divisionId, memberId }) => ({
        url: `/divisions/${divisionId}/members/${memberId}`,
        method: "DELETE",
      }),
    }),

    // TODO: FOR GROUPS
    getGroups: builder.query<any[], void>({
      query: () => `/groups/`,
      providesTags: ["Group"],
    }),
    getGroupsByDivision: builder.query<{ data: any[] }, string>({
      query: (divisionId) => `/groups/division/${divisionId}`,
      providesTags: ["Group"],
    }),
    getGroup: builder.query<any, string>({
      query: (id) => `/groups/${id}`,
      providesTags: (result, error, id) => [{ type: "Group", id }],
    }),
    createGroup: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: `/groups/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Group"],
    }),
    updateGroup: builder.mutation<any, { id: string; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/groups/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Group", id }],
    }),
    deleteGroup: builder.mutation<any, string>({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Group", id }],
    }),

    // Group member routes
    getGroupMembers: builder.query<any[], string>({
      query: (groupId) => `/groups/${groupId}/members`,
      providesTags: ["GroupMembers"],
    }),
    getRemovedGroupMembers: builder.query<any[], string>({
      query: (groupId) => `/groups/${groupId}/members/removed`,
      providesTags: ["GroupMembers"],
    }),
    addMemberToGroup: builder.mutation<any, any>({
      query: (data) => ({
        url: `/groups/members/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["GroupMembers"],
    }),
    removeMemberFromGroup: builder.mutation<
      any,
      { groupId: string; memberId: string }
    >({
      query: ({ groupId, memberId }) => ({
        url: `/groups/${groupId}/members/${memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GroupMembers"],
    }),
    updateRemovalReason: builder.mutation<
      any,
      { membershipId: string; data: any }
    >({
      query: ({ membershipId, data }) => ({
        url: `/groups/members/${membershipId}/removal-reason`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["GroupMembers"],
    }),

    // TODO: FOR TESTIMONIALS
    listTestimonials: builder.query<Testimonial[], void>({
      query: () => "/testimonials",
      providesTags: ["Testimonial"],
    }),
    createTestimonial: builder.mutation<Testimonial, Partial<Testimonial>>({
      query: (testimonial) => ({
        url: "/testimonials",
        method: "POST",
        body: testimonial,
      }),
      invalidatesTags: ["Testimonial"],
    }),
    deleteTestimonial: builder.mutation<void, string>({
      query: (id) => ({
        url: `testimonials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Testimonial"],
    }),

    // TODO: FOR FAQS
    getFaqs: builder.query<Faq[], void>({
      query: () => ({
        url: "/faqs",
        method: "GET",
      }),
      providesTags: ["Faq"],
    }),
    createFaq: builder.mutation<Faq, Partial<Faq>>({
      query: (data) => ({
        url: "/faqs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),
    deleteFaq: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/faqs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faq"],
    }),

    getAllArticles: builder.query({
      query: () => `/`,
      providesTags: ["Articles"],
    }),
    getPublicArticles: builder.query({
      query: () => `/public`,
      providesTags: ["Articles"],
    }),
    getPrivateArticles: builder.query({
      query: () => `/private`,
      providesTags: ["Articles"],
    }),
    getBestArticles: builder.query({
      query: () => `/best`,
      providesTags: ["Articles"],
    }),
    getPendingApprovalArticles: builder.query({
      query: () => `/pending-approval`,
      providesTags: ["Articles"],
    }),
    getArticleById: builder.query({
      query: (articleId: string) => `/${articleId}`,
      providesTags: (_result, _err, id) => [{ type: "Articles", id }],
    }),
    createArticle: builder.mutation({
      query: (formData: FormData) => ({
        url: `/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Articles"],
    }),
    updateArticle: builder.mutation({
      query: ({
        articleId,
        formData,
      }: {
        articleId: string;
        formData: FormData;
      }) => ({
        url: `/${articleId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Articles"],
    }),
    approveArticle: builder.mutation({
      query: ({
        articleId,
        isApproved,
      }: {
        articleId: string;
        isApproved: boolean;
      }) => ({
        url: `/${articleId}/approve`,
        method: "PATCH",
        body: { approved: isApproved },
      }),
      invalidatesTags: ["Articles"],
    }),
    deleteArticle: builder.mutation({
      query: (articleId: string) => ({
        url: `/${articleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Articles"],
    }),

    // TODO: THIS IS FOR RESOURCES

    getAllResources: builder.query<
      { data: IResource[]; meta: { total: number } },
      void
    >({
      query: () => "/resources",
      providesTags: ["Resources"],
    }),
    getResourcesByDivision: builder.query<
      { data: IResource[]; meta: { total: number } },
      string
    >({
      query: (divisionId) => `/resources/${divisionId}`,
      providesTags: ["Resources"],
    }),
    createResource: builder.mutation<IResource, Partial<IResource>>({
      query: (newResource) => ({
        url: "/resources/new",
        method: "POST",
        body: newResource,
      }),
      invalidatesTags: ["Resources"],
    }),
    updateResource: builder.mutation<
      IResource,
      { id: string; data: Partial<IResource> }
    >({
      query: ({ id, data }) => ({
        url: `/resources/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Resources"],
    }),
    deleteResource: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/resources/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Resources"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRequestPasswordResetMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useResetPasswordMutation,

  // TODO: THIS IS FOR ATTENDANCE
  useMarkAttendanceMutation,
  useGetSessionAttendanceQuery,
  useGetHeadSessionsQuery,
  useGetPersonAttendanceQuery,

  // TODO: THIS IS FOR MEMBERS
  useAddMemberMutation,
  useGetAllMembersQuery,
  useGetVerifiedMembersQuery,
  useGetAllUsersQuery,
  useGetDivisionHeadsQuery,
  useInviteMemberMutation,
  useGeneratePasswordQuery,
  useGetMemberByIdQuery,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
  useAssignDivisionHeadMutation,
  useRemoveDivisionHeadMutation,
  useUpdateOwnProfileMutation,
  useUpdateProfilePictureMutation,
  useSimpleProfilePictureUpdateMutation,
  useRemoveAllMembersExceptPresidentMutation,

  // TODO: FOR SESSIONS
  useCreateSessionMutation,
  useGetAllSessionQuery,
  useGetSessionByIdQuery,
  useGetAllSessionByDivisionQuery,
  useDeleteSessionMutation,
  useUpdateSessionMutation,
  useGetDivisionSessionQuery,

  // TODO: FOR EVENTS
  useCreateEventMutation,
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetPublicEventsQuery,

  // TODO: FOR DIVISIONS
  useGetAllDivisionsQuery,
  useGetDivisionMembersQuery,
  useGetDivisionByIdQuery,
  useCreateDivisionMutation,
  useUpdateDivisionMutation,
  useDeleteDivisionMutation,
  useAddMemberToDivisionMutation,
  useRemoveMemberFromDivisionMutation,

  // TODO: FOR GROUPS
  useGetGroupsQuery,
  useGetGroupsByDivisionQuery,
  useGetGroupQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useGetGroupMembersQuery,
  useGetRemovedGroupMembersQuery,
  useAddMemberToGroupMutation,
  useRemoveMemberFromGroupMutation,
  useUpdateRemovalReasonMutation,

  // TODO: FOR TESTIMONIALS
  useListTestimonialsQuery,
  useCreateTestimonialMutation,
  useDeleteTestimonialMutation,

  // TODO: FOR FAQS
  useGetFaqsQuery,
  useCreateFaqMutation,
  useDeleteFaqMutation,

  //TODO: THIS IS FOR ARTICLES
  useGetAllArticlesQuery,
  useGetPublicArticlesQuery,
  useGetPrivateArticlesQuery,
  useGetBestArticlesQuery,
  useGetPendingApprovalArticlesQuery,
  useGetArticleByIdQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useApproveArticleMutation,
  useDeleteArticleMutation,

  // TODO: THIS IS FOR RESOURCES
  useGetAllResourcesQuery,
  useGetResourcesByDivisionQuery,
  useCreateResourceMutation,
  useUpdateResourceMutation,
  useDeleteResourceMutation,
} = apiSlice;
