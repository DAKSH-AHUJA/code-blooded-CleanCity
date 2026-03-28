import { useCallback, useMemo } from 'react';

const useProfileStatus = () => {
  const profileData = useMemo(
    () => ({
      name: '',
      email: '',
      location: '',
      isProfileComplete: true,
    }),
    []
  );

  const refetch = useCallback(() => {}, []);

  return {
    isProfileComplete: true,
    isLoading: false,
    profileData,
    refetch,
  };
};

export default useProfileStatus;
