import { useQuery, useMutation, useQueryClient, } from "@tanstack/react-query";
import { AuthApi } from "../api/auth.api";


const AUTH_KEY = ["auth" , "me"];

export function UseSession () {

    return useQuery({
        queryKey: AUTH_KEY,
        queryFn: AuthApi.me,
        retry: false,
        staleTime: 60.000
        });
}


export function useLogin () {     

const queryClient = useQueryClient();

    return useMutation({
    mutationFn: ({ login, password }) =>
      AuthApi.login(login, password),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: AUTH_KEY,
      });
    },
  });
}

export function useLogout () {

const queryClient = useQueryClient();

return useMutation({
    mutationFn: AuthApi.logout,

    onSuccess: () => {
        queryClient.setQueryData(AUTH_KEY , null);

        queryClient.removeQueries({
            predicate: (query) => 

            query.queryKey !== "auth",
        });
    },
});
}