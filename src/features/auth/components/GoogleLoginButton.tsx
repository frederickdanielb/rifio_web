import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { toast } from 'sonner';
import { useAppDispatch } from '../../../app/hooks';
import { googleLoginRequest } from '../store/authSlice';

export function GoogleLoginButton() {
  const dispatch = useAppDispatch();

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      dispatch(googleLoginRequest(credentialResponse.credential));
    }
  };

  const handleError = () => {
    toast.error('Error al iniciar sesión con Google');
  };

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        theme="filled_black"
        size="large"
        text="continue_with"
        shape="pill"
        width="320"
      />
    </div>
  );
}
