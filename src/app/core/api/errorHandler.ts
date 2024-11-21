import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ErrorProps {
  message: any;
  title?: string;
  errorMessage?: string;
  dismissable?: boolean;
}

const ErrorHandler = {
  handleError: (props: ErrorProps) => {
    const router = useRouter();
    const message =
      props.errorMessage ?? props.message?.response?.data?.message ?? 'Error';
    showToast('Error', message, 'error', props.dismissable, router);
  }
};

const showToast = (
  title: string,
  message: string,
  type: 'error' | 'info' | 'success' | 'warning',
  dismissable?: boolean,
  router?: ReturnType<typeof useRouter>
) => {
  toast(message, {
    type: type,
    position: 'top-right',
    autoClose: dismissable ? false : 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onClose: () => {
      if (router) {
        router.push('/');
      }
    }
  });
};

export default ErrorHandler;
